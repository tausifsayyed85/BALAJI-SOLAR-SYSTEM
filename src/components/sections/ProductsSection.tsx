import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { initialProducts } from '../../data/initialData';
import { SolarProduct } from '../../types';
import { ShieldCheck, ChevronRight, X, Cpu } from 'lucide-react';

export const ProductsSection: React.FC = () => {
  const { t, language, setQuoteModalOpen } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<SolarProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Components' },
    { key: 'modules', label: 'PV Modules' },
    { key: 'inverter', label: 'Inverters' },
    { key: 'structure', label: 'Structures' },
    { key: 'electrical', label: 'AC / DC DB' },
    { key: 'safety', label: 'Earthing & Lightning' },
    { key: 'cables', label: 'Cables & BOS' },
    { key: 'metering', label: 'Net Metering' },
    { key: 'service', label: 'Maintenance / AMC' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? initialProducts
    : initialProducts.filter(p => p.category === activeCategory);

  const getTitle = (p: SolarProduct) => {
    if (language === 'hi') return p.title_hi;
    if (language === 'mr') return p.title_mr;
    return p.title_en;
  };

  const getDesc = (p: SolarProduct) => {
    if (language === 'hi') return p.description_hi;
    if (language === 'mr') return p.description_mr;
    return p.description_en;
  };

  return (
    <section id="products" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            Certified Hardware & Components
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Solar Equipment & BOS Catalogue
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every component in Balaji Solar Systems quotations conforms strictly to MNRE, MSEDCL, and CEA safety standards.
          </p>
        </div>

        {/* Category Filters (Interactive buttons adhering to skill standards) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar justify-start lg:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod, idx) => (
            <div
              key={prod.id}
              className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group reveal-init delay-${(idx % 3) * 100}`}
            >
              {/* Product Visual */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={prod.image_url}
                  alt={getTitle(prod)}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-800 shadow-xs">
                  {prod.brand_ref}
                </div>
                {prod.is_illustrative && (
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                    Illustrative Visual
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {getTitle(prod)}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {getDesc(prod)}
                  </p>

                  {/* Highlights Specs (Unboxed metadata) */}
                  <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                    {prod.specs.slice(0, 2).map((sp, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="text-slate-500">{sp.label_en}:</span>
                        <span className="font-semibold text-slate-800 text-right">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-amber-700">
                    {prod.warranty}
                  </span>
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors"
                  >
                    <span>View Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[11px] font-mono uppercase text-amber-600 font-bold tracking-wider">
                {selectedProduct.brand_ref}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {getTitle(selectedProduct)}
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {getDesc(selectedProduct)}
            </p>

            {/* Specifications Matrix */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-amber-600" />
                <span>Technical Specifications</span>
              </h4>
              <div className="space-y-2.5 text-xs">
                {selectedProduct.specs.map((sp, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-200/50 last:border-0">
                    <span className="text-slate-500">{sp.label_en}</span>
                    <span className="font-bold text-slate-900">{sp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900 mb-6">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <span><strong>Warranty:</strong> {selectedProduct.warranty}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setQuoteModalOpen(true);
                }}
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs text-center shadow-xs transition-colors"
              >
                Inquire About This Equipment
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
