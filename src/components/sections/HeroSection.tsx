import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, MessageCircle, Phone, Sparkles, Layers, ShieldCheck, Zap, SunMedium } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, businessSettings, language, setQuoteModalOpen } = useApp();
  const [viewMode, setViewMode] = useState<'photo' | 'cutaway'>('photo');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Very gentle normalized offset (-15px to +15px) for subtle parallax without layout shift
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-amber-50/25">
      {/* Sunlight Flare & Atmospheric Aura */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/25 via-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`,
        }}
      />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Solar Energy Light Specks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-amber-400/60 shadow-[0_0_8px_#f59e0b] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-48 right-1/3 w-1.5 h-1.5 rounded-full bg-orange-400/50 shadow-[0_0_6px_#ea580c] animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-28 right-1/4 w-2.5 h-2.5 rounded-full bg-amber-300/50 blur-[1px] animate-bounce" style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & Call-To-Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Unboxed Metadata / Kicker (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-3.5 animate-fade-in">
              <SunMedium className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '12s' }} />
              <span>{t.hero.badgeCleanEnergy}</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span>{t.hero.badgeSmartInvestment}</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span>{t.hero.badgeRooftopSolar}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5">
              {t.hero.headline}
            </h1>

            {/* Secondary Headline */}
            <h2 className="text-lg sm:text-xl font-bold text-amber-600 mb-4 tracking-tight">
              {t.hero.subheadline}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8 font-normal">
              {t.hero.description}
            </p>

            {/* CTA Action Cluster */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-98 cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow hover:-translate-y-0.5 transition-all active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.hero.ctaWhatsApp}</span>
              </button>

              <a
                href="#solutions"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Quick Contact & Verified Information micro-bar */}
            <div className="pt-4 border-t border-slate-200/80 w-full flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-slate-800">GST: {businessSettings.gst}</span>
                <span aria-hidden="true">·</span>
                <span>Bhusawal, MH</span>
              </div>
              <a
                href={`tel:${businessSettings.phone}`}
                className="inline-flex items-center gap-1.5 font-bold text-slate-900 hover:text-amber-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call: +91 {businessSettings.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual with Switcher */}
          <div className="lg:col-span-5 relative">
            
            {/* Subtle Interactive Perspective Wrapper */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950 group transition-transform duration-700 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.15}deg) rotateX(${-mousePos.y * 0.15}deg)`,
              }}
            >
              
              {/* Image Frame with Light Sweep Overlay */}
              <div className="relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden">
                <img
                  src={
                    viewMode === 'photo'
                      ? "/src/assets/images/hero_solar_rooftop_1790791627190.jpg"
                      : "/src/assets/images/solar_3d_cutaway_1790791669801.jpg"
                  }
                  alt={
                    viewMode === 'photo'
                      ? "Modern Indian rooftop solar photovoltaic installation in Maharashtra"
                      : "3D architectural technical cutaway of rooftop solar electrical flow"
                  }
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                />

                {/* Light Sweep Reflection Line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs pointer-events-none">
                  <div className="flex items-center gap-1.5 font-medium bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px]">
                      {viewMode === 'photo'
                        ? 'High-Efficiency Bifacial Rooftop Installation'
                        : 'Technical Grid Synchronized Architecture'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium">Illustrative Visual</span>
                </div>
              </div>

              {/* View Switcher Tabs (Functional filter controls allowed per skill guidelines) */}
              <div className="p-2 bg-slate-900/95 backdrop-blur border-t border-slate-800 flex items-center justify-between gap-1.5">
                <button
                  onClick={() => setViewMode('photo')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'photo'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Residential Rooftop</span>
                </button>
                <button
                  onClick={() => setViewMode('cutaway')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'cutaway'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>3D Technical Flow</span>
                </button>
              </div>
            </div>

            {/* Decorative engineering spec card floating below */}
            <div className="mt-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-3.5 shadow-sm flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-900">TATA Power Solar</span>
                <span className="text-slate-400">·</span>
                <span>590W Half-Cut Bifacial</span>
              </div>
              <span className="text-amber-600 font-bold">1-Phase & 3-Phase Quoted</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
