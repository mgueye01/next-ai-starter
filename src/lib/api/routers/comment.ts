import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/db";
import { verifyClientToken, verifyGuestSession } from "@/lib/auth/client-auth";

export const commentRouter = createTRPCRouter({
  // Add comment to media
  add: publicProcedure
    .input(
      z.object({
        mediaId: z.string(),
        content: z.string().min(1).max(500),
        clientToken: z.string().optional(),
        guestSessionId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Verify authentication
      let clientId: string | null = null;
      let sessionId: string | null = null;
      let authorName: string | null = null;

      if (input.clientToken) {
        const client = await verifyClientToken(input.clientToken);
        if (!client) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid client token",
          });
        }
        clientId = client.id;
        authorName = client.name;
      } else if (input.guestSessionId) {
        const session = await verifyGuestSession(input.guestSessionId);
        if (!session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid or expired session",
          });
        }
        sessionId = session.id;
        authorName = session.name || "Guest";
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Authentication required",
        });
      }

      // Check if media exists and gallery allows comments
      const media = await prisma.galleryMedia.findUnique({
        where: { id: input.mediaId },
        include: {
          gallery: {
            select: { allowComments: true },
          },
        },
      });

      if (!media) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media not found",
        });
      }

      if (!media.gallery.allowComments) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Comments are not allowed for this gallery",
        });
      }

      // Create comment
      const comment = await prisma.comment.create({
        data: {
          mediaId: input.mediaId,
          content: input.content,
          ...(clientId ? { clientId } : { guestSessionId: sessionId }),
        },
      });

      return {
        ...comment,
        authorName,
      };
    }),

  // List comments for media
  list: publicProcedure
    .input(
      z.object({
        mediaId: z.string(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const comments = await prisma.comment.findMany({
        where: { mediaId: input.mediaId },
        take: input.limit + 1,
        ...(input.cursor && {
          cursor: { id: input.cursor },
          skip: 1,
        }),
        orderBy: { createdAt: "desc" },
        include: {
          client: {
            select: { name: true, avatar: true },
          },
          guestSession: {
            select: { name: true },
          },
        },
      });

      let nextCursor: string | undefined;
      if (comments.length > input.limit) {
        const nextItem = comments.pop();
        nextCursor = nextItem?.id;
      }

      return {
        comments: comments.map((c) => ({
          id: c.id,
          content: c.content,
          createdAt: c.createdAt,
          authorName: c.client?.name || c.guestSession?.name || "Guest",
          authorAvatar: c.client?.avatar,
          isClient: !!c.clientId,
        })),
        nextCursor,
      };
    }),

  // Delete comment
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
        clientToken: z.string().optional(),
        guestSessionId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Verify authentication
      let clientId: string | null = null;
      let sessionId: string | null = null;

      if (input.clientToken) {
        const client = await verifyClientToken(input.clientToken);
        if (!client) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid client token",
          });
        }
        clientId = client.id;
      } else if (input.guestSessionId) {
        const session = await verifyGuestSession(input.guestSessionId);
        if (!session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid or expired session",
          });
        }
        sessionId = session.id;
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Authentication required",
        });
      }

      // Get comment
      const comment = await prisma.comment.findUnique({
        where: { id: input.id },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      // Check ownership
      if (clientId && comment.clientId !== clientId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete your own comments",
        });
      }

      if (sessionId && comment.guestSessionId !== sessionId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete your own comments",
        });
      }

      await prisma.comment.delete({ where: { id: input.id } });

      return { success: true };
    }),

  // Get comment count for media
  count: publicProcedure
    .input(z.object({ mediaId: z.string() }))
    .query(async ({ input }) => {
      const count = await prisma.comment.count({
        where: { mediaId: input.mediaId },
      });
      return { count };
    }),
});
