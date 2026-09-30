import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Check, FileText, Zap } from 'lucide-react';
import { SolarPackage } from '../../types';

export const StackingCards: React.FC = () => {
  const { packages, openQuoteWithPackage, setPackageDetailModal } = useApp();

  const cardsData = [
    {
      number: '01',
      eyebrow: 'Residential Entry',
      title: '3.5 kW Bifacial Rooftop Suite',
      specs: '6 Modules × 590W (3540 Wp) · TATA SOLAROOF 3 kW Inverter',
      price: '₹2,20,000',
      subsidy: '₹78,000*',
      netCost: '~₹1,42,000*',
      description: 'Ideal for 2 to 3 BHK homes in Bhusawal consuming 250–350 monthly units. Features TATA MONO half-cut bifacial cells with superior temperature coefficient and 5-year AMC coverage.',
      bg: 'bg-[#FFFDFC]',
      borderColor: 'border-[#E8B7BE]',
      accentColor: 'text-[#4B202A]',
      image: '/src/assets/images/hero_solar_rooftop_1790791627190.jpg',
      packageId: 'pkg-3-5kw',
    },
    {
      number: '02',
      eyebrow: 'Most Popular Selection',
      title: '4.1 kW Precision Energy Array',
      specs: '7 Modules × 590W (4130 Wp) · TATA SOLAROOF 3.3 kW Inverter',
      price: '₹2,70,000',
      subsidy: '₹78,000*',
      netCost: '~₹1,92,000*',
      description: 'Engineered for homes with 1–2 air conditioners and appliances. Provides complete AC/DC DB surge protection, dual chemical copper earthing, and seamless MSEDCL net metering.',
      bg: 'bg-[#F4DDE0]/50',
      borderColor: 'border-[#C98F9B]',
      accentColor: 'text-[#4B202A]',
      image: '/src/assets/images/didone_card_architecture_1790794818318.jpg',
      packageId: 'pkg-4-1kw',
    },
    {
      number: '03',
      eyebrow: 'High-Demand Bungalows',
      title: '5.3 kW High-Yield Architecture',
      specs: '9 Modules × 590W (5310 Wp) · TATA SOLAROOF 5 kW Inverter',
      price: '₹3,30,000',
      subsidy: '₹78,000*',
      netCost: '~₹2,52,000*',
      description: 'Maximum energy harvest for multi-story residences, independent villas, or clinics. Heavy-duty galvanized structure built for wind endurance and 25-year DC performance.',
      bg: 'bg-[#F7F1EC]',
      borderColor: 'border-[#DDA6AE]',
      accentColor: 'text-[#4B202A]',
      image: '/src/assets/images/didone_card_materials_1790794832163.jpg',
      packageId: 'pkg-5-3kw',
    },
    {
      number: '04',
      eyebrow: 'Custom & Commercial',
      title: 'Commercial & Canopy Solutions',
      specs: '10 kW to 100 kW+ · 3-Phase Commercial Grid-Tied Integration',
      price: 'Custom Quoted',
      subsidy: 'Commercial Tax Benefits',
      netCost: 'Accelerated Depreciation',
      description: 'Turnkey engineering for shops, hospitals, educational institutions, and industrial rooftops. Customized CAD structural design, optical net-metering, and priority technical support.',
      bg: 'bg-[#4B202A]',
      borderColor: 'border-[#4B202A]',
      accentColor: 'text-[#FFFDFC]',
      image: '/src/assets/images/solar_3d_cutaway_1790791669801.jpg',
      packageId: 'custom',
    },
  ];

  return (
    <section id="stacking-cards" className="py-20 lg:py-28 bg-[#F7F1EC] relative border-b border-[#E8B7BE]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#C98F9B] block mb-2">
            Curated Quoted Systems · 01 to 04
          </span>
          <h2 className="font-editorial-didone text-4xl sm:text-5xl font-normal text-[#191719] tracking-tight mb-4">
            The Stacking Collection
          </h2>
          <p className="text-sm sm:text-base text-[#9A8587] leading-relaxed">
            Scroll through our verified system capacities. Each card layers physical engineering, certified components, and transparent commercial quotation terms.
          </p>
        </div>

        {/* Sticky Deck Container */}
        <div className="space-y-12 relative pb-16">
          {cardsData.map((card, index) => {
            const isDark = card.bg.includes('4B202A');
            const correspondingPkg = packages.find(p => p.id === card.packageId);

            return (
              <div
                key={card.number}
                className={`stacking-card rounded-3xl p-6 sm:p-10 border shadow-lg ${card.bg} ${card.borderColor}`}
                style={{
                  top: `${80 + index * 24}px`,
                  zIndex: index + 1,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Image with editorial framing */}
                  <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8B7BE]/20">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#FFFDFC]/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-mono text-[#191719] font-bold">
                      SYSTEM {card.number}
                    </div>
                  </div>

                  {/* Right Column: Card Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Eyebrow & Number */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#E8B7BE]/40 mb-4">
                        <span className={`text-[11px] font-mono uppercase tracking-widest ${isDark ? 'text-[#E8B7BE]' : 'text-[#C98F9B]'}`}>
                          {card.eyebrow}
                        </span>
                        <span className={`font-editorial-didone text-2xl font-normal ${isDark ? 'text-[#E8B7BE]' : 'text-[#4B202A]'}`}>
                          {card.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={`font-editorial-didone text-2xl sm:text-3xl font-normal mb-2 leading-tight ${isDark ? 'text-[#FFFDFC]' : 'text-[#191719]'}`}>
                        {card.title}
                      </h3>

                      <p className={`text-xs font-mono mb-4 ${isDark ? 'text-[#E8B7BE]' : 'text-[#4B202A]'}`}>
                        {card.specs}
                      </p>

                      <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-[#F4DDE0]' : 'text-[#9A8587]'}`}>
                        {card.description}
                      </p>

                      {/* Pricing Grid */}
                      <div className={`grid grid-cols-3 gap-3 p-4 rounded-2xl mb-6 text-xs ${isDark ? 'bg-black/20 border border-white/10' : 'bg-[#FFFDFC] border border-[#E8B7BE]/60'}`}>
                        <div>
                          <span className={`block text-[10px] font-mono uppercase ${isDark ? 'text-[#E8B7BE]' : 'text-[#9A8587]'}`}>Quoted</span>
                          <strong className={`text-sm font-bold ${isDark ? 'text-[#FFFDFC]' : 'text-[#191719]'}`}>{card.price}</strong>
                        </div>
                        <div>
                          <span className={`block text-[10px] font-mono uppercase ${isDark ? 'text-[#E8B7BE]' : 'text-[#9A8587]'}`}>Subsidy Ref*</span>
                          <strong className="text-sm font-bold text-emerald-600">{card.subsidy}</strong>
                        </div>
                        <div>
                          <span className={`block text-[10px] font-mono uppercase ${isDark ? 'text-[#E8B7BE]' : 'text-[#9A8587]'}`}>Net Outlay*</span>
                          <strong className={`text-sm font-bold ${isDark ? 'text-[#E8B7BE]' : 'text-[#4B202A]'}`}>{card.netCost}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          if (correspondingPkg) {
                            openQuoteWithPackage(correspondingPkg);
                          } else if (packages[0]) {
                            openQuoteWithPackage(packages[0]);
                          }
                        }}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          isDark
                            ? 'bg-[#E8B7BE] text-[#4B202A] hover:bg-white'
                            : 'bg-[#4B202A] text-white hover:bg-[#191719]'
                        }`}
                      >
                        <span>Request This System</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {correspondingPkg && (
                        <button
                          onClick={() => setPackageDetailModal(correspondingPkg)}
                          className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                            isDark
                              ? 'text-[#F4DDE0] hover:text-white'
                              : 'text-[#4B202A] hover:text-[#191719]'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Official Specs</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-[11px] text-[#9A8587] mt-8">
          *Note: All quotations valid for 7 days. Subsidy eligibility as per PM Surya Ghar Muft Bijli Yojana & MSEDCL guidelines.
        </div>

      </div>
    </section>
  );
};
