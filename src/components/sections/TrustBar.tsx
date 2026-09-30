import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Building2, Wrench, ShieldCheck, MapPin } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const { t, businessSettings } = useApp();

  const trustItems = [
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      metric: businessSettings.experience_years,
      label: t.trust.experienceLabel,
      sub: t.trust.experienceSub,
    },
    {
      icon: <Building2 className="w-6 h-6 text-sky-600" />,
      metric: "Complete",
      label: t.trust.solutionsTitle,
      sub: t.trust.solutionsSub,
    },
    {
      icon: <Wrench className="w-6 h-6 text-emerald-600" />,
      metric: "5 Year",
      label: t.trust.amcTitle,
      sub: t.trust.amcSub,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      metric: "25 Year",
      label: t.trust.warrantyTitle,
      sub: t.trust.warrantySub,
    },
    {
      icon: <MapPin className="w-6 h-6 text-rose-600" />,
      metric: "Local",
      label: t.trust.localTitle,
      sub: t.trust.localSub,
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-8 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-start p-2 reveal-init delay-${(idx + 1) * 75}`}
            >
              <div className="p-2.5 bg-slate-800/80 rounded-xl mb-3 border border-slate-700/60 group-hover:border-amber-500/50 transition-colors">
                {item.icon}
              </div>
              <div className="text-2xl font-black tracking-tight text-white mb-0.5">
                {item.metric}
              </div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-400 text-center">
          *Note: Experience reference reflects business-provided history in electrical and solar contracting. 25-year performance warranty refers to PV module manufacturer specifications as quoted.
        </div>
      </div>
    </section>
  );
};
