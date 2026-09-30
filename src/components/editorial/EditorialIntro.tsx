import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserCheck, MapPin } from 'lucide-react';

export const EditorialIntro: React.FC = () => {
  const { businessSettings, activeDisplayAddress } = useApp();

  return (
    <section id="intro" className="py-20 lg:py-28 bg-[#FFFDFC] border-b border-[#E8B7BE]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 02: Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg border border-[#E8B7BE]">
              <img
                src="/src/assets/images/solar_engineer_1790791657194.jpg"
                alt="Solar engineer assessing rooftop photovoltaic installation in Maharashtra"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4B202A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FFFDFC]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B7BE] block mb-1">
                  On-Site Inspection & Verification
                </span>
                <p className="text-sm font-light">
                  Direct personal oversight on every residential and commercial terrace across Bhusawal.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start lg:pl-6">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#C98F9B] mb-3">
              02 · Editorial Introduction & Story
            </span>

            <h2 className="font-editorial-didone text-4xl sm:text-5xl font-normal text-[#191719] leading-[1.08] tracking-tight mb-6">
              Engineering Energy as an Architectural Extension
            </h2>

            <p className="text-base text-[#4B202A] font-light leading-relaxed mb-6">
              Founded and directed by Vivek Patil in Bhusawal, Maharashtra, Balaji Solar Systems approaches renewable rooftop power not merely as equipment mounting, but as a long-term architectural integration.
            </p>

            <p className="text-sm text-[#9A8587] leading-relaxed mb-8">
              From our approved premises at {activeDisplayAddress}, we oversee every stage: customized shadow analysis, CAD system drafting, certified Tata Power Solar module procurement, Class-B/C surge isolation, and direct liaison with MSEDCL for net metering.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-6 border-t border-[#E8B7BE]/50 text-xs">
              <div className="p-3 bg-[#F7F1EC] rounded-xl">
                <span className="text-[10px] font-mono uppercase text-[#C98F9B] block">Proprietor</span>
                <strong className="text-[#191719] text-sm block mt-0.5">{businessSettings.owner_name}</strong>
              </div>
              <div className="p-3 bg-[#F7F1EC] rounded-xl">
                <span className="text-[10px] font-mono uppercase text-[#C98F9B] block">Experience Claim*</span>
                <strong className="text-[#191719] text-sm block mt-0.5">{businessSettings.experience_years} Years</strong>
              </div>
              <div className="p-3 bg-[#F7F1EC] rounded-xl">
                <span className="text-[10px] font-mono uppercase text-[#C98F9B] block">Local Presence</span>
                <strong className="text-[#191719] text-sm block mt-0.5">Bhusawal, MH</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Section 03: High-Impact Didone Statement Pull Quote */}
        <div className="py-16 px-6 sm:px-12 rounded-3xl bg-[#F7F1EC] border border-[#E8B7BE] text-center max-w-5xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C98F9B] mb-4 block">
            Brand Statement & Purpose
          </span>
          <blockquote className="font-editorial-didone text-3xl sm:text-4xl md:text-5xl font-normal text-[#191719] leading-[1.18] tracking-tight max-w-4xl mx-auto">
            “An unharnessed rooftop is an unfinished architecture. Sunlight, captured with precision, becomes your permanent independence.”
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#4B202A]">
            <span>Vivek Patil</span>
            <span className="text-[#C98F9B]">·</span>
            <span>Balaji Solar Systems</span>
          </div>
        </div>

      </div>
    </section>
  );
};
