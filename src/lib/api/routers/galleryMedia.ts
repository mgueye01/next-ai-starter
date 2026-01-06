import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/db";
import { deleteGalleryMedia } from "@/lib/storage";

export const galleryMediaRouter = createTRPCRouter({
  // ==================== ADMIN ROUTES ====================

  // Add media to gallery
  add: protectedProcedure
    .input(
      z.object({
        galleryId: z.string(),
        files: z.array(
          z.object({
            filename: z.string(),
            originalUrl: z.string(),
            thumbnailUrl: z.string().optional(),
            mediumUrl: z.string().optional(),
            type: z.enum(["PHOTO", "VIDEO"]).default("PHOTO"),
            width: z.number().optional(),
            height: z.number().optional(),
            size: z.number().optional(),
            duration: z.number().optional(),
            metadata: z.any().optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify gallery ownership
      const gallery = await prisma.gallery.findFirst({
        where: { id: input.galleryId, createdById: ctx.session.user.id },
      });

      if (!gallery) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      // Get current max sort order
      const maxSort = await prisma.galleryMedia.aggregate({
        where: { galleryId: input.galleryId },
        _max: { sortOrder: true },
      });

      let sortOrder = (maxSort._max.sortOrder || 0) + 1;

      // Create media entries
      const media = await prisma.galleryMedia.createMany({
        data: input.files.map((file) => ({
          galleryId: input.galleryId,
          filename: file.filename,
          originalUrl: file.originalUrl,
          thumbnailUrl: file.thumbnailUrl,
          mediumUrl: file.mediumUrl,
          type: file.type,
          width: file.width,
          height: file.height,
          size: file.size,
          duration: file.duration,
          metadata: file.metadata,
          sortOrder: sortOrder++,
        })),
      });

      // Update gallery cover image if not set
      if (!gallery.coverImage && input.files.length > 0) {
        const firstImage = input.files.find((f) => f.type === "PHOTO");
        if (firstImage) {
          await prisma.gallery.update({
            where: { id: input.galleryId },
            data: { coverImage: firstImage.thumbnailUrl || firstImage.originalUrl },
          });
        }
      }

      return { count: media.count };
    }),

  // Reorder media
  reorder: protectedProcedure
    .input(
      z.object({
        galleryId: z.string(),
        mediaIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify gallery ownership
      const gallery = await prisma.gallery.findFirst({
        where: { id: input.galleryId, createdById: ctx.session.user.id },
      });

      if (!gallery) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      // Update sort orders
      await Promise.all(
        input.mediaIds.map((id, index) =>
          prisma.galleryMedia.update({
            where: { id },
            data: { sortOrder: index },
          })
        )
      );

      return { success: true };
    }),

  // Delete media
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const media = await prisma.galleryMedia.findUnique({
        where: { id: input.id },
        include: {
          gallery: {
            select: { createdById: true },
          },
        },
      });

      if (!media || media.gallery.createdById !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media not found",
        });
      }

      // Delete from S3
      await deleteGalleryMedia(media.galleryId, media.filename);

      // Delete from database
      await prisma.galleryMedia.delete({ where: { id: input.id } });

      return { success: true };
    }),

  // Delete multiple media
  deleteMany: protectedProcedure
    .input(
      z.object({
        galleryId: z.string(),
        mediaIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify gallery ownership
      const gallery = await prisma.gallery.findFirst({
        where: { id: input.galleryId, createdById: ctx.session.user.id },
      });

      if (!gallery) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gallery not found",
        });
      }

      // Get media to delete
      const mediaToDelete = await prisma.galleryMedia.findMany({
        where: {
          id: { in: input.mediaIds },
          galleryId: input.galleryId,
        },
      });

      // Delete from S3
      await Promise.all(
        mediaToDelete.map((m) => deleteGalleryMedia(m.galleryId, m.filename))
      );

      // Delete from database
      await prisma.galleryMedia.deleteMany({
        where: {
          id: { in: input.mediaIds },
          galleryId: input.galleryId,
        },
      });

      return { count: mediaToDelete.length };
    }),

  // Set as cover image
  setCover: protectedProcedure
    .input(z.object({ mediaId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const media = await prisma.galleryMedia.findUnique({
        where: { id: input.mediaId },
        include: {
          gallery: {
            select: { id: true, createdById: true },
          },
        },
      });

      if (!media || media.gallery.createdById !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media not found",
        });
      }

      await prisma.gallery.update({
        where: { id: media.gallery.id },
        data: { coverImage: media.thumbnailUrl || media.originalUrl },
      });

      return { success: true };
    }),

  // ==================== PUBLIC ROUTES ====================

  // List media for gallery (requires valid session)
  list: publicProcedure
    .input(
      z.object({
        galleryId: z.string(),
        filter: z.enum(["all", "favorites"]).optional(),
        sessionId: z.string().optional(),
        clientId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const media = await prisma.galleryMedia.findMany({
        where: { galleryId: input.galleryId },
        orderBy: { sortOrder: "asc" },
        include: {
          favorites:
            input.filter === "favorites"
              ? {
                  where: input.sessionId
                    ? { guestSessionId: input.sessionId }
                    : input.clientId
                    ? { clientId: input.clientId }
                    : undefined,
                }
              : false,
          _count: {
            select: {
              favorites: true,
              comments: true,
            },
          },
        },
      });

      if (input.filter === "favorites") {
        return media.filter(
          (m) => Array.isArray(m.favorites) && m.favorites.length > 0
        );
      }

      return media.map((m) => ({
        ...m,
        favoriteCount: m._count.favorites,
        commentCount: m._count.comments,
        favorites: undefined,
        _count: undefined,
      }));
    }),

  // Get single media with details
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const media = await prisma.galleryMedia.findUnique({
        where: { id: input.id },
        include: {
          gallery: {
            select: {
              title: true,
              slug: true,
              allowDownload: true,
              allowComments: true,
            },
          },
          comments: {
            include: {
              client: {
                select: { name: true, avatar: true },
              },
              guestSession: {
                select: { name: true },
              },
            },
            orderBy: { createdAt: "desc" },
          },
          _count: {
            select: { favorites: true },
          },
        },
      });

      if (!media) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media not found",
        });
      }

      return media;
    }),
});
