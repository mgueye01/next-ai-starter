import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/lib/api/trpc";
import { prisma } from "@/lib/db";

export const analyticsRouter = createTRPCRouter({
  // Get gallery analytics summary
  getGallerySummary: protectedProcedure
    .input(z.object({ galleryId: z.string() }))
    .query(async ({ input }) => {
      const { galleryId } = input;

      // Get gallery with counts
      const gallery = await prisma.gallery.findUnique({
        where: { id: galleryId },
        include: {
          _count: {
            select: {
              media: true,
              clientAccess: true,
              guestSessions: true,
            },
          },
        },
      });

      if (!gallery) {
        throw new Error("Gallery not found");
      }

      // Get download stats
      const downloads = await prisma.download.groupBy({
        by: ["type"],
        where: {
          OR: [
            { galleryId },
            { media: { galleryId } },
          ],
        },
        _count: true,
      });

      // Get favorite count
      const favoriteCount = await prisma.favorite.count({
        where: {
          media: { galleryId },
        },
      });

      // Get comment count
      const commentCount = await prisma.comment.count({
        where: {
          media: { galleryId },
        },
      });

      // Get view events
      const viewCount = await prisma.galleryAnalytics.count({
        where: {
          galleryId,
          event: "view",
        },
      });

      // Get recent activity
      const recentActivity = await prisma.galleryAnalytics.findMany({
        where: { galleryId },
        orderBy: { createdAt: "desc" },
        take: 20,
      });

      // Calculate download totals
      const downloadStats = {
        single: downloads.find((d) => d.type === "SINGLE")?._count ?? 0,
        selection: downloads.find((d) => d.type === "SELECTION")?._count ?? 0,
        all: downloads.find((d) => d.type === "ALL")?._count ?? 0,
        total: downloads.reduce((acc, d) => acc + d._count, 0),
      };

      return {
        gallery: {
          id: gallery.id,
          title: gallery.title,
          status: gallery.status,
          createdAt: gallery.createdAt,
        },
        stats: {
          mediaCount: gallery._count.media,
          clientCount: gallery._count.clientAccess,
          guestSessionCount: gallery._count.guestSessions,
          viewCount,
          favoriteCount,
          commentCount,
          downloads: downloadStats,
        },
        recentActivity,
      };
    }),

  // Track gallery view event
  trackView: protectedProcedure
    .input(
      z.object({
        galleryId: z.string(),
        metadata: z.record(z.unknown()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.galleryAnalytics.create({
        data: {
          galleryId: input.galleryId,
          event: "view",
          metadata: input.metadata ? JSON.parse(JSON.stringify(input.metadata)) : undefined,
        },
      });
      return { success: true };
    }),

  // Track custom event
  trackEvent: protectedProcedure
    .input(
      z.object({
        galleryId: z.string(),
        event: z.string(),
        metadata: z.record(z.unknown()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.galleryAnalytics.create({
        data: {
          galleryId: input.galleryId,
          event: input.event,
          metadata: input.metadata ? JSON.parse(JSON.stringify(input.metadata)) : undefined,
        },
      });
      return { success: true };
    }),

  // Get views over time (last 30 days)
  getViewsOverTime: protectedProcedure
    .input(z.object({ galleryId: z.string() }))
    .query(async ({ input }) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const views = await prisma.galleryAnalytics.findMany({
        where: {
          galleryId: input.galleryId,
          event: "view",
          createdAt: { gte: thirtyDaysAgo },
        },
        select: { createdAt: true },
        orderBy: { createdAt: "asc" },
      });

      // Group by day
      const viewsByDay: Record<string, number> = {};
      views.forEach((view) => {
        const day = view.createdAt.toISOString().split("T")[0];
        viewsByDay[day] = (viewsByDay[day] || 0) + 1;
      });

      // Fill in missing days
      const result: { date: string; views: number }[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayStr = date.toISOString().split("T")[0];
        result.push({
          date: dayStr,
          views: viewsByDay[dayStr] || 0,
        });
      }

      return result;
    }),

  // Get top performing media
  getTopMedia: protectedProcedure
    .input(z.object({ galleryId: z.string() }))
    .query(async ({ input }) => {
      // Get media with favorite and download counts
      const media = await prisma.galleryMedia.findMany({
        where: { galleryId: input.galleryId },
        include: {
          _count: {
            select: {
              favorites: true,
              comments: true,
              downloads: true,
            },
          },
        },
      });

      // Sort by engagement (favorites + downloads)
      const sorted = media
        .map((m) => ({
          id: m.id,
          filename: m.filename,
          thumbnailUrl: m.thumbnailUrl,
          favorites: m._count.favorites,
          comments: m._count.comments,
          downloads: m._count.downloads,
          engagement: m._count.favorites + m._count.downloads,
        }))
        .sort((a, b) => b.engagement - a.engagement)
        .slice(0, 10);

      return sorted;
    }),

  // Get all galleries analytics overview
  getAllGalleriesOverview: protectedProcedure.query(async ({ ctx }) => {
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

    // Get aggregate stats
    const totalMedia = galleries.reduce((acc, g) => acc + g._count.media, 0);
    const totalClients = galleries.reduce(
      (acc, g) => acc + g._count.clientAccess,
      0
    );
    const totalSessions = galleries.reduce(
      (acc, g) => acc + g._count.guestSessions,
      0
    );

    const publishedCount = galleries.filter(
      (g) => g.status === "PUBLISHED"
    ).length;
    const draftCount = galleries.filter((g) => g.status === "DRAFT").length;

    return {
      galleries: galleries.map((g) => ({
        id: g.id,
        title: g.title,
        slug: g.slug,
        status: g.status,
        createdAt: g.createdAt,
        mediaCount: g._count.media,
        clientCount: g._count.clientAccess,
        sessionCount: g._count.guestSessions,
      })),
      totals: {
        galleries: galleries.length,
        published: publishedCount,
        drafts: draftCount,
        media: totalMedia,
        clients: totalClients,
        sessions: totalSessions,
      },
    };
  }),
});
