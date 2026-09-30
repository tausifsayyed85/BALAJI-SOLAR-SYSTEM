import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { BalajiLogo } from '../brand/BalajiLogo';

export const EditorialHero: React.FC = () => {
  const { t, businessSettings, language, setQuoteModalOpen } = useApp();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waMessages = {
    en: "Hello Balaji Solar Systems, I would like to get a free solar consultation for my rooftop.",
    hi: "नमस्ते Balaji Solar Systems, मुझे मेरी छत के लिए मुफ्त सोलर परामर्श चाहिए।",
    mr: "नमस्कार Balaji Solar Systems, मला माझ्या घराच्या छतासाठी मोफत सोलर सल्ला हवा आहे.",
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(waMessages[language]);
    window.open(`https://wa.me/91${businessSettings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92svh] lg:min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#F7F1EC] text-[#191719] pt-24 pb-12"
    >
      {/* Background Editorial Image with subtle parallax */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        style={{
          transform: `translateY(${scrollY * 0.18}px)`,
        }}
      >
        <img
          src="/src/assets/images/didone_hero_blush_1790794787369.jpg"
          alt="Architectural solar and light campaign in blush and warm cream tones"
          loading="eager"
          className="w-full h-full object-cover object-right-top lg:object-center opacity-85 scale-102 transition-transform duration-1000"
        />
        {/* Soft Editorial Blush and Cream Gradient Overlay for headline readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F1EC] via-[#F7F1EC]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F1EC] via-transparent to-transparent opacity-90" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-8 max-w-3xl">
            
            {/* Editorial Eyebrow */}
            <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.22em] uppercase text-[#4B202A] mb-5">
              <span>Bhusawal, Maharashtra</span>
              <span className="w-8 h-[1px] bg-[#C98F9B]" />
              <span>Solar Engineering & EPC</span>
            </div>

            {/* High-Contrast Didone Headline */}
            <h1 className="font-editorial-didone text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-normal leading-[1.04] text-[#191719] tracking-tight mb-6">
              {t.hero.headline}
            </h1>

            {/* Subheadline & Manifesto */}
            <p className="text-base sm:text-xl text-[#4B202A] font-light leading-relaxed max-w-2xl mb-8">
              {t.hero.description}
            </p>

            {/* Editorial CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#4B202A] text-[#FFFDFC] hover:bg-[#191719] transition-all shadow-sm active:scale-98 cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FFFDFC] border border-[#C98F9B] text-[#4B202A] hover:bg-[#F4DDE0] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C98F9B]" />
                <span>{t.hero.ctaWhatsApp}</span>
              </button>

              <a
                href="#stacking-cards"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B202A] hover:text-[#191719] underline underline-offset-4 tracking-wide px-2 py-3"
              >
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </div>

            {/* Micro Details & Credentials */}
            <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-[#E8B7BE]/60 text-xs text-[#9A8587]">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C98F9B]">Proprietor</span>
                <strong className="text-[#191719]">{businessSettings.owner_name}</strong>
              </div>
              <div className="h-4 w-[1px] bg-[#E8B7BE]" />
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C98F9B]">Registration</span>
                <strong className="text-[#191719] font-mono">{businessSettings.gst}</strong>
              </div>
              <div className="h-4 w-[1px] bg-[#E8B7BE]" />
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C98F9B]">TATA Ecosystem</span>
                <strong className="text-[#191719]">590W Bifacial PV</strong>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Card Feature */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="p-6 bg-[#FFFDFC]/90 backdrop-blur-md rounded-2xl border border-[#E8B7BE]/70 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F4DDE0]">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C98F9B]">
                  Curated Quoted Systems
                </span>
                <span className="text-[11px] font-serif italic text-[#4B202A]">01 — 03</span>
              </div>

              <div className="font-editorial-didone text-2xl text-[#191719]">
                TATA MONO Half-Cut Bifacial Architecture
              </div>

              <p className="text-xs text-[#9A8587] leading-relaxed">
                Quoted packages from 3.5 kW to 5.3 kW engineered for peak low-light yield and monsoon durability across Khandesh.
              </p>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-mono text-[#4B202A] font-bold">From ₹2,20,000</span>
                <span className="text-[11px] text-[#C98F9B] font-medium">Govt Subsidy: ₹78,000*</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Editorial Vertical Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 flex items-center justify-between text-xs text-[#9A8587]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4B202A] animate-ping" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#4B202A]">
            Scroll to Experience
          </span>
        </div>

        <div className="h-[1px] flex-1 mx-6 bg-[#E8B7BE]/40 hidden sm:block" />

        <div className="text-[11px] font-serif italic text-[#4B202A]">
          "Sunlight transformed into enduring domestic power."
        </div>
      </div>
    </section>
  );
};
