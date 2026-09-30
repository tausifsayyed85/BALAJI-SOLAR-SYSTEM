import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Zap, AlertTriangle, Layers, Activity } from 'lucide-react';

export const SafetySection: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="safety" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.safety.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.safety.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.safety.subtitle}
          </p>
        </div>

        {/* Protection Hierarchy Diagram */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-12 shadow-xl border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
              Engineering Defense Chain
            </span>
            <h3 className="text-lg font-black text-white mt-1">
              Multi-Layered Surge & Fault Isolation
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] text-amber-400 font-bold block mb-1">01. Array</span>
              <div className="text-xs font-black text-white">Solar Panels</div>
              <span className="text-[10px] text-slate-400 block mt-1">Bifacial PV</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] text-red-400 font-bold block mb-1">02. Isolation</span>
              <div className="text-xs font-black text-white">DC DB + SPD</div>
              <span className="text-[10px] text-slate-400 block mt-1">1000V DC Fuses</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] text-sky-400 font-bold block mb-1">03. Inversion</span>
              <div className="text-xs font-black text-white">Grid Inverter</div>
              <span className="text-[10px] text-slate-400 block mt-1">MPPT & Islanding</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] text-emerald-400 font-bold block mb-1">04. Protection</span>
              <div className="text-xs font-black text-white">AC DB + MCB</div>
              <span className="text-[10px] text-slate-400 block mt-1">Secondary SPD</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] text-amber-400 font-bold block mb-1">05. Grounding</span>
              <div className="text-xs font-black text-white">Dual Earthing</div>
              <span className="text-[10px] text-slate-400 block mt-1">Chemical Copper</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] text-cyan-400 font-bold block mb-1">06. Utility</span>
              <div className="text-xs font-black text-white">MSEDCL Grid</div>
              <span className="text-[10px] text-slate-400 block mt-1">Net Meter</span>
            </div>
          </div>
        </div>

        {/* 6 Safety Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.safety.points.map((pt, idx) => (
            <div
              key={idx}
              className={`bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between reveal-init delay-${(idx % 3) * 100}`}
            >
              <div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl inline-flex mb-4 text-amber-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pt.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Standard Quoted Protection</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
