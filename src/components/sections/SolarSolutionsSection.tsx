import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Building, Sun, Wrench, MessageSquare, ArrowRight } from 'lucide-react';

export const SolarSolutionsSection: React.FC = () => {
  const { t, setQuoteModalOpen } = useApp();

  const solutions = [
    {
      icon: <Home className="w-5 h-5 text-amber-600" />,
      title: t.solutions.residential.title,
      desc: t.solutions.residential.desc,
      btn: t.solutions.residential.btn,
      capacityHint: "2 kW to 10 kW · 1-Phase / 3-Phase",
      accent: "border-amber-200/90 hover:border-amber-400 bg-white",
      image: "/images/hero_solar_rooftop_1790791627190.jpg",
    },
    {
      icon: <Building className="w-5 h-5 text-sky-600" />,
      title: t.solutions.commercial.title,
      desc: t.solutions.commercial.desc,
      btn: t.solutions.commercial.btn,
      capacityHint: "10 kW to 100 kW+ · 3-Phase Commercial",
      accent: "border-sky-200/90 hover:border-sky-400 bg-white",
      image: "/images/commercial_solar_1790796073113.jpg",
    },
    {
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      title: t.solutions.rooftop.title,
      desc: t.solutions.rooftop.desc,
      btn: t.solutions.rooftop.btn,
      capacityHint: "RCC Slab · Tin Shed · Elevated Canopy",
      accent: "border-amber-200/90 hover:border-amber-400 bg-white",
      image: "/images/mounting_structure_1790796111337.jpg",
    },
    {
      icon: <Wrench className="w-5 h-5 text-emerald-600" />,
      title: t.solutions.maintenance.title,
      desc: t.solutions.maintenance.desc,
      btn: t.solutions.maintenance.btn,
      capacityHint: "5-Year AMC · Health Audits · Panel Care",
      accent: "border-emerald-200/90 hover:border-emerald-400 bg-white",
      image: "/images/maintenance_service_1790796166103.jpg",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-indigo-600" />,
      title: t.solutions.consultation.title,
      desc: t.solutions.consultation.desc,
      btn: t.solutions.consultation.btn,
      capacityHint: "Free Rooftop Assessment · Bhusawal & Jalgaon",
      accent: "border-indigo-200/90 hover:border-indigo-400 bg-white",
      image: "/images/consultation_scene_1790796181636.jpg",
    },
  ];

  return (
    <section id="solutions" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.solutions.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.solutions.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Engineered specifically for the electrical tariffs, rooftop architecture, and sunlight intensity of Maharashtra.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group reveal-init delay-${(index % 3) * 100} ${item.accent}`}
            >
              {/* Solution Preview Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                  {item.icon}
                  <span>{item.capacityHint}</span>
                </div>
              </div>

              {/* Solution Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-amber-600 text-white transition-colors cursor-pointer"
                >
                  <span>{item.btn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
