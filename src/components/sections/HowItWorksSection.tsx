import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Shield, Zap, Home, Gauge, Network, ChevronRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { t } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1); // default on Solar Panels

  const steps = [
    {
      id: 0,
      title: "1. Sunlight",
      short: "Solar Irradiance",
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      detail: "Clean solar photons strike the photovoltaic panel array throughout daylight hours in Bhusawal.",
      flow: "Photons → PV Cells",
    },
    {
      id: 1,
      title: "2. Solar Panels",
      short: "TATA MONO Bifacial",
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      detail: "Converts sunlight into DC electricity safely on your rooftop using high-efficiency monocrystalline cells.",
      flow: "Direct Current (DC)",
    },
    {
      id: 2,
      title: "3. DC Protection Box",
      short: "DC DB + Type-II SPD",
      icon: <Shield className="w-5 h-5 text-red-600" />,
      detail: "Protects against incoming DC overvoltages, lightning surges, and backfeed currents using gPV fuses.",
      flow: "Filtered DC Current",
    },
    {
      id: 3,
      title: "4. Solar Inverter",
      short: "TATA SOLAROOF Approved",
      icon: <Zap className="w-5 h-5 text-cyan-600" />,
      detail: "Converts DC electricity into usable AC electricity (230V/415V) synchronized with grid frequency.",
      flow: "Alternating Current (AC)",
    },
    {
      id: 4,
      title: "5. AC Distribution Box",
      short: "AC DB with MCB",
      icon: <Shield className="w-5 h-5 text-emerald-600" />,
      detail: "Isolates the inverter output and protects household appliances with precision circuit breakers.",
      flow: "Clean Household AC",
    },
    {
      id: 5,
      title: "6. Home / Appliances",
      short: "Daytime Consumption",
      icon: <Home className="w-5 h-5 text-indigo-600" />,
      detail: "Your fans, lights, refrigerator, air conditioners, and motors consume solar power first.",
      flow: "Immediate Use",
    },
    {
      id: 6,
      title: "7. Net Meter",
      short: "Bi-directional Meter",
      icon: <Gauge className="w-5 h-5 text-amber-600" />,
      detail: "Measures electricity flow between the solar system and grid where applicable, tracking units imported & exported.",
      flow: "Bi-directional Units",
    },
    {
      id: 7,
      title: "8. Electricity Grid",
      short: "MSEDCL Grid",
      icon: <Network className="w-5 h-5 text-sky-600" />,
      detail: "Supplies electricity when required and receives eligible excess generation subject to applicable regulations and approvals.",
      flow: "Grid Settlement",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.howItWorks.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Interactive Electrical Flow Diagram */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden mb-12 reveal-init">
          
          {/* Subtle circuit background lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Sequential Energy Path */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
            {steps.map((step) => {
              const isSelected = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  onMouseEnter={() => setActiveStep(step.id)}
                  className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 relative group cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-2 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-slate-800/80 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-700/80 text-slate-200 group-hover:text-amber-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">
                    {step.title.split('. ')[1]}
                  </span>
                  <span className="text-[10px] text-amber-400/90 mt-1 font-mono">
                    {step.short}
                  </span>

                  {/* Flow Arrow */}
                  {step.id < steps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 z-20" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Active Step Technical Inspector */}
          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl shrink-0 shadow-lg">
                {steps[activeStep].icon}
              </div>
              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                  Active Component Inspector
                </div>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  {steps[activeStep].title} — <span className="text-slate-300 font-semibold">{steps[activeStep].short}</span>
                </h3>
                <p className="text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
                  {steps[activeStep].detail}
                </p>
              </div>
            </div>

            <div className="shrink-0 bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Electricity State
              </span>
              <span className="text-sm font-bold font-mono text-emerald-400">
                {steps[activeStep].flow}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
