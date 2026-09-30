import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { t, businessSettings, language, setQuoteModalOpen } = useApp();

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
    <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-950 text-white">
      {/* Background Image with Dark & Amber Overlay */}
      <img
        src="/src/assets/images/sunset_solar_rooftop_1790791641721.jpg"
        alt="Sunset over modern rooftop solar installation in Maharashtra"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center reveal-init">
        
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 block">
          Clean Energy · Lasting Economics
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          {t.finalCta.title}
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {t.finalCta.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all active:scale-98"
          >
            <span>{t.finalCta.btnQuote}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={openWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t.finalCta.btnWhatsApp}</span>
          </button>

          <a
            href={`tel:${businessSettings.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>{t.finalCta.btnCall}</span>
          </a>
        </div>

        <div className="mt-8 text-xs text-slate-400">
          Direct local engineering service in Bhusawal, Jalgaon, and across the Khandesh region.
        </div>
      </div>
    </section>
  );
};
