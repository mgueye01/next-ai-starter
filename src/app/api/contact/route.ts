import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createElement } from 'react';
import { ContactEmail } from '@/lib/email/templates/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY || '');

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

// Validation schema with Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Format d\'email invalide'),
  phone: z.string().optional(),
  projectType: z.enum(['portrait', 'mariage', 'evenement', 'fashion', 'corporate', 'autre']),
  subject: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(5000),
  // Honeypot field - should be empty
  website: z.string().max(0, 'Spam detected').optional(),
});

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Trop de demandes. Veuillez réessayer dans une heure.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          }
        }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      // Check if it's a honeypot catch (spam)
      const isSpam = errors.some(e => e.field === 'website');
      if (isSpam) {
        // Silently accept but don't send (fool the spam bot)
        return NextResponse.json({ success: true });
      }

      return NextResponse.json(
        { error: 'Validation échouée', details: errors },
        { status: 400 }
      );
    }

    const { name, email, phone, projectType, subject, message } = validationResult.data;

    // Send email via Resend
    const { error: sendError } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'contact@elgato-photo.fr',
      to: process.env.CONTACT_EMAIL || 'contact@elgato-photo.fr',
      replyTo: email,
      subject: `[elGato Photo] ${subject || `Nouvelle demande - ${projectType}`}`,
      react: createElement(ContactEmail, {
        name,
        email,
        phone,
        projectType,
        subject,
        message,
      }),
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'contact@elgato-photo.fr',
      to: email,
      subject: 'Votre demande a bien été reçue - elGato Photo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #BBDCE5 0%, #CFAB8D 100%); padding: 30px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px; font-weight: 300;">Merci pour votre message !</h1>
          </div>
          <div style="padding: 30px; background-color: #FAFAFA;">
            <p style="color: #6B5B47; font-size: 16px; line-height: 1.6;">
              Bonjour ${name},
            </p>
            <p style="color: #8B7355; font-size: 16px; line-height: 1.6;">
              Votre demande concernant un projet de type <strong>${projectType}</strong> a bien été reçue.
            </p>
            <p style="color: #8B7355; font-size: 16px; line-height: 1.6;">
              Je vous répondrai dans les plus brefs délais, généralement sous 24 heures.
            </p>
            <p style="color: #6B5B47; font-size: 16px; line-height: 1.6; margin-top: 24px;">
              À très bientôt,<br/>
              <strong>elGato Photo</strong>
            </p>
          </div>
          <div style="background-color: #6B5B47; padding: 20px; text-align: center;">
            <p style="color: #D9C4B0; margin: 0; font-size: 14px;">
              elGato Photo Paris - Photographe Professionnel
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      {
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
        }
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
