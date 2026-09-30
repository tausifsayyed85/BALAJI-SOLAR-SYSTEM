import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, BookOpen, Clock, Tag } from 'lucide-react';

export const ArticleModal: React.FC = () => {
  const { activeArticle, setActiveArticle, language, t } = useApp();

  if (!activeArticle) return null;

  const art = activeArticle;

  const getTitle = () => {
    if (language === 'hi') return art.title_hi;
    if (language === 'mr') return art.title_mr;
    return art.title_en;
  };

  const getContent = () => {
    if (language === 'hi') return art.content_hi;
    if (language === 'mr') return art.content_mr;
    return art.content_en;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={() => setActiveArticle(null)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="font-bold text-amber-700 uppercase tracking-wider">{art.category}</span>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{art.read_time} {t.blog.minsRead}</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-tight">
          {getTitle()}
        </h3>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
          {getContent().map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setActiveArticle(null)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            {t.blog.closeModal}
          </button>
        </div>

      </div>
    </div>
  );
};
