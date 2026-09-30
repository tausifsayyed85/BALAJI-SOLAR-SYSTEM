import React from 'react';
import { useApp } from '../../context/AppContext';
import { initialArticles } from '../../data/initialData';
import { SolarArticle } from '../../types';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  const { t, language, setActiveArticle } = useApp();

  const getTitle = (art: SolarArticle) => {
    if (language === 'hi') return art.title_hi;
    if (language === 'mr') return art.title_mr;
    return art.title_en;
  };

  const getSummary = (art: SolarArticle) => {
    if (language === 'hi') return art.summary_hi;
    if (language === 'mr') return art.summary_mr;
    return art.summary_en;
  };

  return (
    <section id="blog" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.blog.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.blog.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.blog.subtitle}
          </p>
        </div>

        {/* 10 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialArticles.map((art, idx) => (
            <div
              key={art.id}
              className={`bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-amber-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between reveal-init delay-${(idx % 3) * 100}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-amber-700">{art.category}</span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{art.read_time} {t.blog.minsRead}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {getTitle(art)}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {getSummary(art)}
                </p>
              </div>

              <button
                onClick={() => setActiveArticle(art)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-amber-600 pt-3 border-t border-slate-200/60 transition-colors"
              >
                <span>{t.blog.readMore}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
