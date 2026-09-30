import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { initialFaqs } from '../../data/initialData';
import { FAQItem } from '../../types';
import { ChevronDown, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { t, language } = useApp();
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const getQ = (item: FAQItem) => {
    if (language === 'hi') return item.q_hi;
    if (language === 'mr') return item.q_mr;
    return item.q_en;
  };

  const getA = (item: FAQItem) => {
    if (language === 'hi') return item.a_hi;
    if (language === 'mr') return item.a_mr;
    return item.a_en;
  };

  const categories = [
    { key: 'all', label: t.faq.allCategories },
    { key: 'general', label: t.faq.catGeneral },
    { key: 'technical', label: t.faq.catTechnical },
    { key: 'financial', label: t.faq.catFinancial },
    { key: 'maintenance', label: t.faq.catMaintenance },
  ];

  const filteredFaqs = initialFaqs.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const q = getQ(item).toLowerCase();
    const a = getA(item).toLowerCase();
    const matchesSearch = !searchQuery || q.includes(searchQuery.toLowerCase()) || a.includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.faq.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.faq.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.faq.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCat(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200 reveal-init delay-${(idx % 4) * 60}`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-amber-600 transition-colors"
                >
                  <span>{getQ(faq)}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                    {getA(faq)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
