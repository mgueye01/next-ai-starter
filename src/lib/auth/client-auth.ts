import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const JWT_SECRET = process.env.CLIENT_JWT_SECRET || process.env.NEXTAUTH_SECRET!;
const GUEST_SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const CLIENT_TOKEN_DURATION = "7d";

// ==================== CLIENT AUTHENTICATION ====================

export interface ClientTokenPayload {
  clientId: string;
  type: "client";
}

export interface GuestSessionPayload {
  sessionId: string;
  galleryId: string;
  type: "guest";
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function authenticateClient(email: string, password: string) {
  const client = await prisma.client.findUnique({ where: { email } });

  if (!client) {
    throw new Error("Invalid credentials");
  }

  const valid = await verifyPassword(password, client.hashedPassword);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  // Update last login
  await prisma.client.update({
    where: { id: client.id },
    data: { lastLoginAt: new Date() },
  });

  const token = sign(
    { clientId: client.id, type: "client" } as ClientTokenPayload,
    JWT_SECRET,
    { expiresIn: CLIENT_TOKEN_DURATION }
  );

  return {
    token,
    client: {
      id: client.id,
      name: client.name,
      email: client.email,
      avatar: client.avatar,
    },
  };
}

export async function registerClient(data: {
  email: string;
  name: string;
  password: string;
  phone?: string;
}) {
  const existingClient = await prisma.client.findUnique({
    where: { email: data.email },
  });

  if (existingClient) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(data.password);

  const client = await prisma.client.create({
    data: {
      email: data.email,
      name: data.name,
      phone: data.phone,
      hashedPassword,
    },
  });

  const token = sign(
    { clientId: client.id, type: "client" } as ClientTokenPayload,
    JWT_SECRET,
    { expiresIn: CLIENT_TOKEN_DURATION }
  );

  return {
    token,
    client: {
      id: client.id,
      name: client.name,
      email: client.email,
    },
  };
}

export async function verifyClientToken(token: string) {
  try {
    const decoded = verify(token, JWT_SECRET) as ClientTokenPayload;

    if (decoded.type !== "client") {
      return null;
    }

    return prisma.client.findUnique({
      where: { id: decoded.clientId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });
  } catch {
    return null;
  }
}

// ==================== GUEST SESSION ====================

export function generateAccessCode(): string {
  // Generate a 6-digit numeric code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createGuestSession(
  galleryId: string,
  accessCode: string,
  guestInfo?: { name?: string; email?: string },
  metadata?: { ipAddress?: string; userAgent?: string }
) {
  // Find gallery and verify access code
  const gallery = await prisma.gallery.findFirst({
    where: {
      id: galleryId,
      accessCode,
      status: "PUBLISHED",
    },
  });

  if (!gallery) {
    throw new Error("Invalid access code");
  }

  // Check if gallery has expired
  if (gallery.expiresAt && gallery.expiresAt < new Date()) {
    throw new Error("Gallery has expired");
  }

  // Create guest session
  const session = await prisma.guestSession.create({
    data: {
      galleryId,
      name: guestInfo?.name,
      email: guestInfo?.email,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      expiresAt: new Date(Date.now() + GUEST_SESSION_DURATION),
    },
  });

  // Track analytics
  await prisma.galleryAnalytics.create({
    data: {
      galleryId,
      event: "guest_access",
      metadata: {
        sessionId: session.id,
        guestName: guestInfo?.name,
        guestEmail: guestInfo?.email,
      },
    },
  });

  return session.id;
}

export async function verifyGuestSession(sessionId: string) {
  const session = await prisma.guestSession.findUnique({
    where: { id: sessionId },
    include: {
      gallery: {
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          expiresAt: true,
          allowDownload: true,
          allowFavorites: true,
          allowComments: true,
          allowSharing: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  // Check if session has expired
  if (session.expiresAt < new Date()) {
    return null;
  }

  // Check if gallery is still published
  if (session.gallery.status !== "PUBLISHED") {
    return null;
  }

  // Check if gallery has expired
  if (session.gallery.expiresAt && session.gallery.expiresAt < new Date()) {
    return null;
  }

  return session;
}

export async function verifyAccessCode(slug: string, accessCode: string) {
  const gallery = await prisma.gallery.findFirst({
    where: {
      slug,
      accessCode,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      expiresAt: true,
    },
  });

  if (!gallery) {
    return null;
  }

  // Check if gallery has expired
  if (gallery.expiresAt && gallery.expiresAt < new Date()) {
    return null;
  }

  return gallery;
}

// ==================== CLIENT GALLERY ACCESS ====================

export async function getClientGalleries(clientId: string) {
  const access = await prisma.clientGalleryAccess.findMany({
    where: { clientId },
    include: {
      gallery: {
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          coverImage: true,
          eventDate: true,
          status: true,
          createdAt: true,
          _count: {
            select: { media: true },
          },
        },
      },
    },
    orderBy: {
      grantedAt: "desc",
    },
  });

  return access
    .filter((a) => a.gallery.status === "PUBLISHED")
    .map((a) => ({
      ...a.gallery,
      role: a.role,
      mediaCount: a.gallery._count.media,
    }));
}

export async function checkClientGalleryAccess(
  clientId: string,
  galleryId: string
) {
  const access = await prisma.clientGalleryAccess.findUnique({
    where: {
      clientId_galleryId: {
        clientId,
        galleryId,
      },
    },
    include: {
      gallery: {
        select: {
          status: true,
          expiresAt: true,
        },
      },
    },
  });

  if (!access) {
    return null;
  }

  // Check if gallery is accessible
  if (access.gallery.status !== "PUBLISHED") {
    return null;
  }

  if (access.gallery.expiresAt && access.gallery.expiresAt < new Date()) {
    return null;
  }

  return access;
}
