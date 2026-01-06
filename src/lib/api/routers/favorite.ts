import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/db";
import { verifyClientToken, verifyGuestSession } from "@/lib/auth/client-auth";

export const favoriteRouter = createTRPCRouter({
  // Toggle favorite on media
  toggle: publicProcedure
    .input(
      z.object({
        mediaId: z.string(),
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

      // Check if media exists and gallery allows favorites
      const media = await prisma.galleryMedia.findUnique({
        where: { id: input.mediaId },
        include: {
          gallery: {
            select: { allowFavorites: true },
          },
        },
      });

      if (!media) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media not found",
        });
      }

      if (!media.gallery.allowFavorites) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Favorites are not allowed for this gallery",
        });
      }

      // Check if favorite already exists
      const existingFavorite = await prisma.favorite.findFirst({
        where: {
          mediaId: input.mediaId,
          ...(clientId ? { clientId } : { guestSessionId: sessionId }),
        },
      });

      if (existingFavorite) {
        // Remove favorite
        await prisma.favorite.delete({ where: { id: existingFavorite.id } });
        return { favorited: false };
      }

      // Add favorite
      await prisma.favorite.create({
        data: {
          mediaId: input.mediaId,
          ...(clientId ? { clientId } : { guestSessionId: sessionId }),
        },
      });

      return { favorited: true };
    }),

  // Get favorites for a gallery
  list: publicProcedure
    .input(
      z.object({
        galleryId: z.string(),
        clientToken: z.string().optional(),
        guestSessionId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      // Verify authentication
      let clientId: string | null = null;
      let sessionId: string | null = null;

      if (input.clientToken) {
        const client = await verifyClientToken(input.clientToken);
        if (client) clientId = client.id;
      } else if (input.guestSessionId) {
        const session = await verifyGuestSession(input.guestSessionId);
        if (session) sessionId = session.id;
      }

      if (!clientId && !sessionId) {
        return [];
      }

      const favorites = await prisma.favorite.findMany({
        where: {
          media: { galleryId: input.galleryId },
          ...(clientId ? { clientId } : { guestSessionId: sessionId }),
        },
        include: {
          media: {
            select: {
              id: true,
              filename: true,
              thumbnailUrl: true,
              mediumUrl: true,
              originalUrl: true,
              type: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return favorites.map((f) => ({
        id: f.id,
        mediaId: f.mediaId,
        createdAt: f.createdAt,
        media: f.media,
      }));
    }),

  // Check if media is favorited
  check: publicProcedure
    .input(
      z.object({
        mediaIds: z.array(z.string()),
        clientToken: z.string().optional(),
        guestSessionId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      // Verify authentication
      let clientId: string | null = null;
      let sessionId: string | null = null;

      if (input.clientToken) {
        const client = await verifyClientToken(input.clientToken);
        if (client) clientId = client.id;
      } else if (input.guestSessionId) {
        const session = await verifyGuestSession(input.guestSessionId);
        if (session) sessionId = session.id;
      }

      if (!clientId && !sessionId) {
        return {};
      }

      const favorites = await prisma.favorite.findMany({
        where: {
          mediaId: { in: input.mediaIds },
          ...(clientId ? { clientId } : { guestSessionId: sessionId }),
        },
        select: { mediaId: true },
      });

      const favoriteMap: Record<string, boolean> = {};
      for (const f of favorites) {
        favoriteMap[f.mediaId] = true;
      }

      return favoriteMap;
    }),

  // Get favorite count for media
  count: publicProcedure
    .input(z.object({ mediaId: z.string() }))
    .query(async ({ input }) => {
      const count = await prisma.favorite.count({
        where: { mediaId: input.mediaId },
      });
      return { count };
    }),
});
