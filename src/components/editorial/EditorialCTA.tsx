import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';

export const EditorialCTA: React.FC = () => {
  const { businessSettings, language, setQuoteModalOpen } = useApp();

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
    <section className="relative py-28 lg:py-36 overflow-hidden bg-[#191719] text-[#FFFDFC]">
      {/* Background Cinematic Dusk Rooftop Image */}
      <img
        src="/src/assets/images/didone_cta_dusk_1790794847629.jpg"
        alt="Balaji Solar Systems dusk rooftop aesthetic"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-35 scale-102 transition-transform duration-1000"
      />
      
      {/* Soft Dusty Rose & Deep Burgundy Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#191719] via-[#4B202A]/60 to-[#191719]/90 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#E8B7BE] mb-4 block">
          Final Statement · Renewable Permanence
        </span>

        <h2 className="font-editorial-didone text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.06] text-[#FFFDFC] tracking-tight mb-6">
          Ready To Make Your Rooftop Work For You?
        </h2>

        <p className="text-base sm:text-lg text-[#F4DDE0] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Talk to Balaji Solar Systems about your residential or commercial rooftop. Clean generation, lowered tariff slabs, and dependable local engineering.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8B7BE] hover:bg-white text-[#4B202A] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            <span>Request Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 px-7 py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </button>

          <a
            href={`tel:${businessSettings.phone}`}
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#FFFDFC]/10 hover:bg-[#FFFDFC]/20 text-white border border-[#E8B7BE]/40 font-bold text-xs uppercase tracking-wider rounded-full transition-colors"
          >
            <Phone className="w-4 h-4 text-[#E8B7BE]" />
            <span>Call {businessSettings.phone}</span>
          </a>
        </div>

        <div className="mt-12 text-xs font-mono text-[#C98F9B]">
          Direct Service: Bhusawal · Jalgaon · Khandesh Region · Maharashtra
        </div>

      </div>
    </section>
  );
};
