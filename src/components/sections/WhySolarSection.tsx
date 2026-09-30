import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingDown,
  Sun,
  Home,
  Leaf,
  Clock,
  CircleDollarSign,
  Cpu,
  ShieldCheck,
  Zap,
  Sliders,
} from 'lucide-react';

export const WhySolarSection: React.FC = () => {
  const { t } = useApp();
  const [monthlyUnits, setMonthlyUnits] = useState<number>(400);

  // Dynamic illustrative calculation (approx. average slab tariff in Maharashtra MSEDCL)
  // Slab estimation: ~₹8.5/unit average for 300-500 range including duty & fuel adjustment
  const estimatedGridRate = 8.8;
  const beforeBill = Math.round(monthlyUnits * estimatedGridRate);

  // A typical 3.5 kW to 4.1 kW system produces ~380 units/month under normal sunlight
  const typicalGen = Math.min(Math.round(monthlyUnits * 0.85), 450);
  const netUnits = Math.max(0, monthlyUnits - typicalGen);
  const afterBill = Math.round(netUnits * estimatedGridRate + 120); // minimum fixed charges
  const estimatedMonthlyReduction = Math.max(0, beforeBill - afterBill);

  const icons = [
    <TrendingDown className="w-5 h-5 text-amber-600" />,
    <Sun className="w-5 h-5 text-amber-500" />,
    <Home className="w-5 h-5 text-sky-600" />,
    <Leaf className="w-5 h-5 text-emerald-600" />,
    <Clock className="w-5 h-5 text-indigo-600" />,
    <CircleDollarSign className="w-5 h-5 text-amber-600" />,
    <Cpu className="w-5 h-5 text-cyan-600" />,
    <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  ];

  return (
    <section id="why-solar" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.whySolar.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.whySolar.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.whySolar.subtitle}
          </p>
        </div>

        {/* 8 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.whySolar.cards.map((card, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between reveal-init delay-${(i % 4) * 75}`}
            >
              <div>
                <div className="p-3 bg-slate-100 rounded-xl inline-flex mb-4">
                  {icons[i % icons.length]}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Balaji Solar Advantage</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Electricity Bill Visualizer (Before & After) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 max-w-4xl mx-auto reveal-init">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                <Sliders className="w-4 h-4" />
                <span>{t.whySolar.billComparisonTitle}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Simulate Your Potential Bill Reduction
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.whySolar.billComparisonSubtitle}
              </p>
            </div>

            {/* Slider Control */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 min-w-[240px]">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>Monthly Units:</span>
                <span className="text-amber-700 text-sm font-black">{monthlyUnits} kWh</span>
              </div>
              <input
                type="range"
                min="150"
                max="1000"
                step="25"
                value={monthlyUnits}
                onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
                aria-label="Monthly units consumed"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>150 units</span>
                <span>500 units</span>
                <span>1000 units</span>
              </div>
            </div>
          </div>

          {/* Comparison Cards: Before vs After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Before Solar */}
            <div className="rounded-xl p-5 bg-rose-50/60 border border-rose-200/80 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  {t.whySolar.beforeTitle}
                </span>
                <div className="text-3xl font-black text-rose-950 mt-2 mb-1">
                  ₹{beforeBill.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-rose-700"> / month</span>
                </div>
                <p className="text-xs text-rose-900/80 mb-4">
                  100% of your power is purchased from the MSEDCL grid at regular tiered slab tariffs.
                </p>
              </div>

              <div className="space-y-2 text-xs border-t border-rose-200/60 pt-3 text-rose-950">
                <div className="flex justify-between">
                  <span>{t.whySolar.billLabelUnits}</span>
                  <span className="font-bold">{monthlyUnits} units</span>
                </div>
                <div className="flex justify-between">
                  <span>Effective Tariff + Duty:</span>
                  <span className="font-bold">~₹{estimatedGridRate} / unit</span>
                </div>
                <div className="flex justify-between text-rose-800">
                  <span>Self-Generation:</span>
                  <span className="font-bold">0 units</span>
                </div>
              </div>
            </div>

            {/* After Rooftop Solar */}
            <div className="rounded-xl p-5 bg-emerald-50/80 border border-emerald-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    {t.whySolar.afterTitle}
                  </span>
                  <span className="text-[11px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
                    Net Metered
                  </span>
                </div>
                
                <div className="text-3xl font-black text-emerald-950 mt-2 mb-1">
                  ₹{afterBill.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-emerald-700"> / month</span>
                </div>
                
                <p className="text-xs text-emerald-900/80 mb-4">
                  Solar produces power on your roof during daylight hours, offsetting daytime consumption.
                </p>
              </div>

              <div className="space-y-2 text-xs border-t border-emerald-200 pt-3 text-emerald-950">
                <div className="flex justify-between">
                  <span>{t.whySolar.billLabelSolarGen}</span>
                  <span className="font-bold text-emerald-700">~{typicalGen} units / mo</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.whySolar.billLabelNetGrid}</span>
                  <span className="font-bold text-slate-800">{netUnits} units</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-900 pt-1 border-t border-emerald-200/60">
                  <span>Indicative Monthly Offset:</span>
                  <span className="text-emerald-700">~₹{estimatedMonthlyReduction.toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Mandatory Non-Guarantee Disclaimer */}
          <div className="mt-5 text-[11px] text-slate-600 leading-normal">
            {t.whySolar.billDisclaimer}
          </div>
        </div>

      </div>
    </section>
  );
};
