import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, ShieldCheck, UserCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, setCmsModalOpen } = useApp();

  return (
    <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.testimonials.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Ethical Verified Policy Notice Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-4">
            <UserCheck className="w-7 h-7" />
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Verified Customer Stories Policy
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto mb-6">
            {t.testimonials.comingSoon}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero Fake Reviews · 100% Authentic Business Standard</span>
          </div>
        </div>

      </div>
    </section>
  );
};
