import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { initialProjects } from '../../data/initialData';
import { MapPin, Zap, ArrowRight, Layers } from 'lucide-react';

export const ProjectGallerySection: React.FC = () => {
  const { t, language, setQuoteModalOpen } = useApp();
  const [filter, setFilter] = useState<string>('All');

  const filtered = filter === 'All'
    ? initialProjects
    : initialProjects.filter(p => p.category === filter);

  const getTitle = (p: any) => {
    if (language === 'hi') return p.title_hi;
    if (language === 'mr') return p.title_mr;
    return p.title_en;
  };

  return (
    <section id="projects" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>{t.gallery.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.gallery.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
          {['All', 'Residential', 'Commercial', 'Installation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-slate-900 text-white shadow-sm scale-105'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? t.gallery.filterAll : cat}
            </button>
          ))}
        </div>

        {/* Stacking Cards Container for Portfolio / Projects */}
        <div className="relative space-y-8 pb-16">
          {filtered.map((proj, idx) => {
            // Incremental sticky offset for deck stacking
            const topOffsetDesktop = `calc(6.5rem + ${idx * 1.5}rem)`;

            return (
              <div
                key={proj.id}
                style={{
                  top: topOffsetDesktop,
                  zIndex: 10 + idx,
                }}
                className="sticky bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                  
                  {/* Left: Project Image with Badges */}
                  <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-950">
                    <img
                      src={proj.image_url}
                      alt={getTitle(proj)}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    
                    {/* Visual Label (Compliant illustrative vs real badge) */}
                    <div className="absolute top-4 left-4 bg-slate-950/75 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md border border-white/10 shadow-sm">
                      {proj.is_real ? t.gallery.realTag : t.gallery.illustrativeTag}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold">{proj.location}</span>
                      </div>
                      <span className="font-mono bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-lg font-bold shadow-md">
                        {proj.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Right: Project Details & Spec Card */}
                  <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-amber-600 font-bold uppercase tracking-wider mb-2">
                        <span>Project #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                        <span className="text-slate-500 font-semibold">{proj.category}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-snug">
                        {getTitle(proj)}
                      </h3>

                      <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                        <div className="flex items-start gap-2.5">
                          <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900 block">Photovoltaic Array</span>
                            <span className="text-slate-600">{proj.panels_used}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900 block">Installation Type</span>
                            <span className="text-slate-600">{proj.system_type}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between mt-4">
                      <span className="text-[11px] text-slate-600 font-medium">
                        Balaji Solar Engineering
                      </span>
                      <button
                        onClick={() => setQuoteModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Request Similar System</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-center max-w-2xl mx-auto shadow-sm">
          <p className="font-bold text-sm sm:text-base text-amber-950 mb-1">
            Have a residential terrace or commercial rooftop in Bhusawal or Jalgaon?
          </p>
          <p className="text-xs text-amber-900/80 mb-4">
            Our engineers assess your structural orientation, shadow angles, and load capacity on-site.
          </p>
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <span>Schedule a Free Site Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
