import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/db";
import {
  authenticateClient,
  registerClient,
  verifyClientToken,
  getClientGalleries,
  hashPassword,
} from "@/lib/auth/client-auth";

export const clientRouter = createTRPCRouter({
  // ==================== ADMIN ROUTES ====================

  // Create client (admin)
  create: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
        phone: z.string().optional(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      const existingClient = await prisma.client.findUnique({
        where: { email: input.email },
      });

      if (existingClient) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already registered",
        });
      }

      const hashedPassword = await hashPassword(input.password);

      const client = await prisma.client.create({
        data: {
          email: input.email,
          name: input.name,
          phone: input.phone,
          hashedPassword,
        },
      });

      return {
        id: client.id,
        email: client.email,
        name: client.name,
      };
    }),

  // List all clients (admin)
  list: protectedProcedure.query(async () => {
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        createdAt: true,
        lastLoginAt: true,
        _count: {
          select: { galleries: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return clients.map((c) => ({
      ...c,
      galleryCount: c._count.galleries,
    }));
  }),

  // Get client by ID (admin)
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const client = await prisma.client.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatar: true,
          createdAt: true,
          lastLoginAt: true,
          galleries: {
            include: {
              gallery: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  coverImage: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Client not found",
        });
      }

      return client;
    }),

  // Update client (admin)
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        phone: z.string().optional(),
        password: z.string().min(8).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, password, ...data } = input;

      const updateData: Record<string, unknown> = { ...data };

      if (password) {
        updateData.hashedPassword = await hashPassword(password);
      }

      const client = await prisma.client.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return client;
    }),

  // Delete client (admin)
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.client.delete({ where: { id: input.id } });
      return { success: true };
    }),

  // Grant gallery access to client (admin)
  grantAccess: protectedProcedure
    .input(
      z.object({
        clientId: z.string(),
        galleryId: z.string(),
        role: z.enum(["VIEWER", "COLLABORATOR", "OWNER"]).default("VIEWER"),
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

      // Check if access already exists
      const existingAccess = await prisma.clientGalleryAccess.findUnique({
        where: {
          clientId_galleryId: {
            clientId: input.clientId,
            galleryId: input.galleryId,
          },
        },
      });

      if (existingAccess) {
        // Update role
        return prisma.clientGalleryAccess.update({
          where: { id: existingAccess.id },
          data: { role: input.role },
        });
      }

      // Create new access
      return prisma.clientGalleryAccess.create({
        data: {
          clientId: input.clientId,
          galleryId: input.galleryId,
          role: input.role,
        },
      });
    }),

  // Revoke gallery access (admin)
  revokeAccess: protectedProcedure
    .input(
      z.object({
        clientId: z.string(),
        galleryId: z.string(),
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

      await prisma.clientGalleryAccess.delete({
        where: {
          clientId_galleryId: {
            clientId: input.clientId,
            galleryId: input.galleryId,
          },
        },
      });

      return { success: true };
    }),

  // ==================== CLIENT ROUTES (PUBLIC) ====================

  // Client login
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await authenticateClient(input.email, input.password);
      } catch {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }
    }),

  // Client registration
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
        password: z.string().min(8),
        phone: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await registerClient(input);
      } catch (error) {
        if (error instanceof Error && error.message === "Email already registered") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Email already registered",
          });
        }
        throw error;
      }
    }),

  // Get current client profile
  me: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const client = await verifyClientToken(input.token);

      if (!client) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid or expired token",
        });
      }

      return client;
    }),

  // Get client's accessible galleries
  myGalleries: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const client = await verifyClientToken(input.token);

      if (!client) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid or expired token",
        });
      }

      return getClientGalleries(client.id);
    }),

  // Update client profile
  updateProfile: publicProcedure
    .input(
      z.object({
        token: z.string(),
        name: z.string().min(1).optional(),
        phone: z.string().optional(),
        currentPassword: z.string().optional(),
        newPassword: z.string().min(8).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const client = await verifyClientToken(input.token);

      if (!client) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid or expired token",
        });
      }

      const updateData: Record<string, unknown> = {};

      if (input.name) updateData.name = input.name;
      if (input.phone !== undefined) updateData.phone = input.phone;

      if (input.newPassword) {
        if (!input.currentPassword) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Current password is required",
          });
        }

        const fullClient = await prisma.client.findUnique({
          where: { id: client.id },
        });

        if (!fullClient) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Client not found",
          });
        }

        const { verifyPassword } = await import("@/lib/auth/client-auth");
        const valid = await verifyPassword(
          input.currentPassword,
          fullClient.hashedPassword
        );

        if (!valid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Current password is incorrect",
          });
        }

        updateData.hashedPassword = await hashPassword(input.newPassword);
      }

      const updated = await prisma.client.update({
        where: { id: client.id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      });

      return updated;
    }),
});
