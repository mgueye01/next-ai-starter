import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/db";
import {
  generateAccessCode,
  verifyAccessCode,
  createGuestSession,
} from "@/lib/auth/client-auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
}

export const galleryRouter = createTRPCRouter({
  // ==================== ADMIN ROUTES ====================

  // Create gallery
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().optional(),
        eventDate: z.date().optional(),
        expiresAt: z.date().optional(),
        allowDownload: z.boolean().default(true),
        allowFavorites: z.boolean().default(true),
        allowComments: z.boolean().default(true),
        allowSharing: z.boolean().default(true),
        watermark: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Generate unique slug
      let slug = generateSlug(input.title);
      let suffix = 0;
      while (await prisma.gallery.findUnique({ where: { slug } })) {
        suffix++;
        slug = `${generateSlug(input.title)}-${suffix}`;
      }

      // Generate access code
      const accessCode = generateAccessCode();

      const gallery = await prisma.gallery.create({
        data: {
          ...input,
          slug,
          accessCode,
          createdById: userId,
        },
      });

      return gallery;
    }),

  // List all galleries (admin)
  list: protectedProcedure.query(async ({ ctx }) => {
    const galleries = await prisma.gallery.findMany({
      where: { createdById: ctx.session.user.id },
      include: {
        _count: {
          select: {
            media: true,
            clientAccess: true,
            guestSessions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return galleries.map((g) => ({
      ...g,
      mediaCount: g._count.media,
      clientCount: g._count.clientAccess,
      sessionCount: g._count.guestSessions,
    }));
  }),

  // Get gallery by ID (admin)
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const gallery = await prisma.gallery.findFirst({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
        include: {
          media: {
            orderBy: { sortOrder: "asc" },
          },
          clientAccess: {
            include: {
              client: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
          _count: {
            select: {
              guestSessions: true,
            },
          },
        },
      });

      if (!gallery) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      return gallery;
    }),

  // Update gallery
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(200).optional(),
        description: z.string().optional(),
        coverImage: z.string().optional(),
        eventDate: z.date().optional().nullable(),
        expiresAt: z.date().optional().nullable(),
        allowDownload: z.boolean().optional(),
        allowFavorites: z.boolean().optional(),
        allowComments: z.boolean().optional(),
        allowSharing: z.boolean().optional(),
        watermark: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const gallery = await prisma.gallery.findFirst({
        where: { id, createdById: ctx.session.user.id },
      });

      if (!gallery) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      return prisma.gallery.update({
        where: { id },
        data,
      });
    }),

  // Delete gallery
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const gallery = await prisma.gallery.findFirst({
        where: { id: input.id, createdById: ctx.session.user.id },
      });

      if (!gallery) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      await prisma.gallery.delete({ where: { id: input.id } });
      return { success: true };
    }),

  // Publish/unpublish gallery
  setStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const gallery = await prisma.gallery.findFirst({
        where: { id: input.id, createdById: ctx.session.user.id },
      });

      if (!gallery) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      return prisma.gallery.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  // Regenerate access code
  regenerateAccessCode: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const gallery = await prisma.gallery.findFirst({
        where: { id: input.id, createdById: ctx.session.user.id },
      });

      if (!gallery) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      const newCode = generateAccessCode();

      await prisma.gallery.update({
        where: { id: input.id },
        data: { accessCode: newCode },
      });

      return { accessCode: newCode };
    }),

  // ==================== PUBLIC ROUTES ====================

  // Verify access code and create guest session
  verifyAccessCode: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        accessCode: z.string(),
        guestName: z.string().optional(),
        guestEmail: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const gallery = await verifyAccessCode(input.slug, input.accessCode);

      if (!gallery) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid access code",
        });
      }

      const sessionId = await createGuestSession(
        gallery.id,
        input.accessCode,
        { name: input.guestName, email: input.guestEmail }
      );

      return {
        sessionId,
        gallery: {
          id: gallery.id,
          title: gallery.title,
          slug: gallery.slug,
        },
      };
    }),

  // Get gallery by slug (for guest/client view)
  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        sessionId: z.string().optional(), // Guest session
        clientToken: z.string().optional(), // Client JWT
      })
    )
    .query(async ({ input }) => {
      const gallery = await prisma.gallery.findUnique({
        where: { slug: input.slug },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          coverImage: true,
          eventDate: true,
          status: true,
          expiresAt: true,
          allowDownload: true,
          allowFavorites: true,
          allowComments: true,
          allowSharing: true,
          media: {
            orderBy: { sortOrder: "asc" },
            select: {
              id: true,
              type: true,
              filename: true,
              originalUrl: true,
              thumbnailUrl: true,
              mediumUrl: true,
              width: true,
              height: true,
              metadata: true,
            },
          },
        },
      });

      if (!gallery || gallery.status !== "PUBLISHED") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      if (gallery.expiresAt && gallery.expiresAt < new Date()) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Gallery has expired",
        });
      }

      return gallery;
    }),

  // Check if gallery requires access code
  checkAccess: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const gallery = await prisma.gallery.findUnique({
        where: { slug: input.slug },
        select: {
          id: true,
          title: true,
          coverImage: true,
          status: true,
          accessCode: true,
          expiresAt: true,
        },
      });

      if (!gallery || gallery.status !== "PUBLISHED") {
        return { exists: false, requiresCode: false };
      }

      if (gallery.expiresAt && gallery.expiresAt < new Date()) {
        return { exists: true, expired: true, requiresCode: false };
      }

      return {
        exists: true,
        expired: false,
        requiresCode: !!gallery.accessCode,
        title: gallery.title,
        coverImage: gallery.coverImage,
      };
    }),

  // Get gallery analytics (admin)
  getAnalytics: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const gallery = await prisma.gallery.findFirst({
        where: { id: input.id, createdById: ctx.session.user.id },
      });

      if (!gallery) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      const [analytics, downloads, guestSessions] = await Promise.all([
        prisma.galleryAnalytics.findMany({
          where: { galleryId: input.id },
          orderBy: { createdAt: "desc" },
          take: 100,
        }),
        prisma.download.count({
          where: {
            media: { galleryId: input.id },
          },
        }),
        prisma.guestSession.count({
          where: { galleryId: input.id },
        }),
      ]);

      const viewCount = analytics.filter((a) => a.event === "view").length;
      const shareCount = analytics.filter((a) => a.event === "share").length;

      return {
        views: viewCount,
        shares: shareCount,
        downloads,
        guestSessions,
        recentActivity: analytics.slice(0, 20),
      };
    }),
});
