import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ArrowRight, Zap, Sun } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const { t, setQuoteModalOpen } = useApp();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="installation" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      
      {/* Background Solar Particle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
            <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{t.process.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.process.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* 12-Step Grid with Animated Energy Pathway */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-14">
          {t.process.steps.map((step, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`bg-white rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between relative group ${
                  isHovered
                    ? 'border-amber-500 shadow-xl -translate-y-1.5 bg-gradient-to-br from-white to-amber-50/40'
                    : 'border-slate-200/90 shadow-xs hover:border-amber-300 hover:shadow-md'
                }`}
              >
                {/* Step Header */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-md transition-colors ${
                        isHovered
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      Phase {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>
                  <CheckCircle2
                    className={`w-4 h-4 transition-colors ${
                      isHovered ? 'text-amber-600 scale-110' : 'text-emerald-600'
                    }`}
                  />
                </div>

                {/* Step Title */}
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {step}
                </h3>

                {/* Micro Energy Flow Indicator at Card Base */}
                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Step {idx + 1} of 12</span>
                  <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${((idx + 1) / 12) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            <span>Start Step 1: Request Free Site Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
