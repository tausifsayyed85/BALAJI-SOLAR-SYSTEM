import React from 'react';
import { useApp } from '../../context/AppContext';

export const WhyBalajiSection: React.FC = () => {
  const { t } = useApp();

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 block">
            {t.whyUs.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.whyUs.title}
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* 6 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.whyUs.reasons.map((item, idx) => (
            <div
              key={idx}
              className={`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-amber-500/60 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between reveal-init delay-${(idx % 3) * 100}`}
            >
              <div>
                <span className="text-2xl font-black font-mono text-amber-500/80 block mb-3">
                  {item.num}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/60 text-[11px] text-amber-400 font-semibold">
                Balaji Solar Standard
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
