import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const MultiplyProductFeature: React.FC = () => {
  const { setQuoteModalOpen } = useApp();

  return (
    <section id="featured-product" className="py-20 lg:py-28 bg-[#F4DDE0]/40 border-b border-[#E8B7BE]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Multiply-Blended Image Plinth */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-tr from-[#E8B7BE]/50 via-[#F7F1EC] to-[#F4DDE0] border border-[#E8B7BE] shadow-md flex items-center justify-center overflow-hidden group">
              
              {/* Multiply Blended Product Image */}
              <img
                src="/src/assets/images/didone_featured_product_1790794802590.jpg"
                alt="Precision solar cell engineering and high-efficiency photovoltaic module"
                loading="lazy"
                className="w-full max-w-md h-auto object-contain img-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-103 transition-all duration-700"
              />

              {/* Decorative Subtle Corner Stamp */}
              <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest uppercase text-[#4B202A] opacity-70">
                TATA MONO BIFACIAL · 590WP
              </div>

              <div className="absolute bottom-4 right-4 bg-[#FFFDFC]/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-mono text-[#4B202A]">
                Multiply-Blended Study
              </div>
            </div>

            {/* Spec Sheet Micro-Badge */}
            <div className="mt-4 p-4 rounded-2xl bg-[#FFFDFC] border border-[#E8B7BE]/60 flex items-center justify-between text-xs text-[#4B202A]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C98F9B]" />
                <span className="font-semibold">25-Year DC Performance Warranty Reference*</span>
              </div>
              <span className="font-mono font-bold text-[#191719]">&lt; 0.55% Degradation</span>
            </div>
          </div>

          {/* Right Column: Editorial Typographic Narrative */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#C98F9B] mb-3">
              03 · Materiality & Performance
            </span>

            <h2 className="font-editorial-didone text-4xl sm:text-5xl font-normal text-[#191719] leading-[1.08] tracking-tight mb-6">
              Tactile Precision in Every Photovoltaic Cell
            </h2>

            <p className="text-sm sm:text-base text-[#4B202A] font-light leading-relaxed mb-6">
              The systems quoted by Balaji Solar Systems feature Tier-1 TATA MONO half-cut bifacial modules engineered with multi-busbar technology. Both front and rear surfaces actively capture ambient irradiance, delivering up to 25% higher yields under Maharashtra’s high solar insolation.
            </p>

            {/* Architectural Points Checklist */}
            <div className="w-full space-y-3 mb-8">
              {[
                "590W peak rating with up to 21.8% module conversion efficiency",
                "Half-cut cell design minimizes internal electrical resistance and shading losses",
                "Robust anodized aluminium frame rated for 150 km/h wind gusts",
                "Flame-retardant UV-resistant solar DC cabling with IP65 protected junction boxes",
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-[#191719] font-medium">
                  <div className="w-4 h-4 rounded-full bg-[#E8B7BE]/60 text-[#4B202A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setQuoteModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#4B202A] text-white hover:bg-[#191719] transition-all cursor-pointer"
            >
              <span>Inquire About Quoted Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
