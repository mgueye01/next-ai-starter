import React from "react";
import ClientProvider from "@/components/ClientProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero-working";
import ServicesPreview from "@/components/blocks/services-preview";
import TestimonialsCTA from "@/components/blocks/testimonials-cta";

export const dynamic = "force-dynamic";

async function getSession() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

const HeroContent = () => {
  return (
    <div className='max-w-6xl mx-auto text-center space-y-12'>
      {/* Main Hero Content */}
      <div className='space-y-8'>
        <div className='space-y-4'>
          <div className='w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto'></div>
        </div>
        
        <p className='text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-[#8B7355] max-w-4xl mx-auto'>
          Photographe d'art & Créateur de contenu à Paris
        </p>
        
        <p className='text-base md:text-lg lg:text-xl hero-leading-relaxed text-[#6B5B47] max-w-3xl mx-auto px-4'>
          Spécialisé dans la <span className='font-medium text-[#CFAB8D]'>photographie artistique</span>, 
          la <span className='font-medium text-[#CFAB8D]'>vidéographie créative</span> et 
          la <span className='font-medium text-[#CFAB8D]'>création de contenu visuel</span>.
          <br className='hidden md:block' />
          Portraits intimes, mariages d'exception, événements corporatifs et campagnes digitales.
          <br className='hidden md:block' />
          Chaque création raconte une histoire unique, capturée avec passion et expertise technique.
        </p>
      </div>

      {/* Portfolio Highlights */}
      <div className='hero-stats-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto'>
        {[
          { title: "Créations", count: "800+", desc: "Photos & Vidéos" },
          { title: "Mariages", count: "150+", desc: "Unions célébrées" },
          { title: "Marques", count: "50+", desc: "Partenariats" },
          { title: "Clients", count: "98%", desc: "Satisfaits" }
        ].map((stat, index) => (
          <div key={index} className='hero-stats-card text-center p-3 md:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300'>
            <div className='text-xl md:text-2xl lg:text-3xl font-light text-[#BBDCE5] mb-1 leading-none'>{stat.count}</div>
            <div className='text-xs md:text-sm font-medium text-[#6B5B47] mb-1 leading-tight'>{stat.title}</div>
            <div className='text-xs text-[#8B7355] leading-tight'>{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* Call-to-Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
        <Link
          href="/portfolio"
          className="hero-btn-primary hero-cta-mobile group relative overflow-hidden flex items-center justify-center gap-3 bg-[#BBDCE5] text-[#6B5B47] hover:bg-[#A5C9D4] rounded-xl px-6 md:px-10 py-4 md:py-5 text-base md:text-lg font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 min-w-[180px] md:min-w-[200px]"
        >
          <span className='relative z-10'>Découvrir mon Travail</span>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          <div className='absolute inset-0 bg-gradient-to-r from-[#A5C9D4] to-[#BBDCE5] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </Link>
        <Link
          href="/contact"
          className="hero-cta-mobile group relative overflow-hidden flex items-center justify-center gap-3 border-2 border-[#CFAB8D] text-[#CFAB8D] hover:bg-[#CFAB8D] hover:text-white rounded-xl px-6 md:px-10 py-4 md:py-5 text-base md:text-lg font-medium transition-all duration-300 hover:shadow-lg min-w-[180px] md:min-w-[200px]"
        >
          <span className='relative z-10'>Réserver une Séance</span>
          <div className='w-2 h-2 rounded-full bg-current opacity-60 group-hover:opacity-100 transition-opacity relative z-10'></div>
        </Link>
      </div>

      {/* Social Proof */}
      <div className='pt-8 border-t border-white/20'>
        <div className='flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-[#8B7355]'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-[#BBDCE5]'></div>
            <span>Photographe certifié</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-[#CFAB8D]'></div>
            <span>Vidéaste professionnel</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-[#BBDCE5]'></div>
            <span>Basé à Paris</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-[#CFAB8D]'></div>
            <span>Déplacements France & Europe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const session = await getSession();

  return (
    <div className="min-h-screen">
      <ClientProvider>
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="/elgato-photo-1.webp"
          bgImageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop"
          title="elGato Photo Paris"
          date={session ? `Bonjour, ${session.user?.name}` : "Photographe Professionnel"}
          scrollToExpand="Défiler pour découvrir"
          textBlend={false}
        >
          <HeroContent />
        </ScrollExpandMedia>
        <ServicesPreview />
        <TestimonialsCTA />
      </ClientProvider>
    </div>
  );
}
