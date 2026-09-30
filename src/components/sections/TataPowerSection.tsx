import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, ShieldCheck, Zap, Info, ArrowRight } from 'lucide-react';

export const TataPowerSection: React.FC = () => {
  const { t, setQuoteModalOpen } = useApp();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white relative overflow-hidden">
      {/* Subtle blue / amber background radial gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Context & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start reveal-init">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-400 mb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{t.tataSection.kicker}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              {t.tataSection.title}
            </h2>

            <p className="text-base text-slate-300 leading-relaxed mb-6">
              {t.tataSection.subtitle}
            </p>

            {/* Checklist of Quoted Tata Specifications */}
            <div className="w-full space-y-3 mb-8">
              {t.tataSection.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/70">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Explicit Non-Overpromising Disclaimer (Mandatory per section 26) */}
            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-3 mb-6">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {t.tataSection.disclaimer}
              </p>
            </div>

            <button
              onClick={() => setQuoteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
            >
              <span>Request Tata Solar Component Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Visual Component Blueprint */}
          <div className="lg:col-span-5 reveal-init delay-150">
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                <div>
                  <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider">
                    Component Reference
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Quotation Bill of Materials
                  </h3>
                </div>
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">PV Modules</div>
                    <div className="text-slate-400">TATA MONO Half-Cut Bifacial</div>
                  </div>
                  <span className="font-mono text-amber-400 font-bold">590 Wp Each</span>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Grid Inverter</div>
                    <div className="text-slate-400">TATA Power SOLAROOF Approved</div>
                  </div>
                  <span className="font-mono text-sky-400 font-bold">3kW / 3.3kW / 5kW</span>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Solar DC Cables</div>
                    <div className="text-slate-400">TATA Power Approved Solar DC</div>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">UV / Flame Safe</span>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Warranty Reference*</div>
                    <div className="text-slate-400">DC Power Degradation Schedule</div>
                  </div>
                  <span className="font-mono text-amber-400 font-bold">25 Years</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/70 text-[11px] text-slate-400">
                *Warranty terms apply as per original manufacturer warranty certificates issued with formal delivery.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
