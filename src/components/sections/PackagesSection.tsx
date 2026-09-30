import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SolarPackage } from '../../types';
import { Check, ArrowRight, ShieldCheck, FileText, Info, Table } from 'lucide-react';

export const PackagesSection: React.FC = () => {
  const { t, packages, openQuoteWithPackage, setPackageDetailModal } = useApp();
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="packages" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.packages.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.packages.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.packages.subtitle}
          </p>
        </div>

        {/* 3 Quotation Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {packages.filter(p => p.active).map((pkg, idx) => {
            const isPopular = pkg.capacity_kw === 4.1;
            const netPrice = pkg.system_price - pkg.subsidy_reference;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 reveal-init delay-${idx * 150} ${
                  isPopular
                    ? 'bg-white border-2 border-amber-500 shadow-xl lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popularity Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[11px] font-extrabold uppercase tracking-widest py-1 px-3.5 rounded-full shadow-sm">
                    Most Popular Residential Choice
                  </div>
                )}

                <div>
                  {/* Capacity Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wider font-mono">
                        {pkg.phase}
                      </span>
                      <h3 className="text-3xl font-black text-slate-900 mt-0.5">
                        {pkg.capacity_kw} kW
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {pkg.suitable_for}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold text-slate-500 block">Peak DC Power</span>
                      <span className="text-sm font-black font-mono text-slate-900">{pkg.total_wp} Wp</span>
                    </div>
                  </div>

                  {/* Quoted Price & Subsidy Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
                    <div className="text-xs text-slate-500 mb-0.5">
                      {t.packages.quotedPrice}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                      ₹{pkg.system_price.toLocaleString('en-IN')}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs">
                      <div className="flex justify-between items-center text-emerald-700 font-medium">
                        <span>{t.packages.subsidyRef}</span>
                        <span className="font-bold">- ₹{pkg.subsidy_reference.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-900 font-bold pt-1 border-t border-slate-200/40">
                        <span>{t.packages.netIndicative}</span>
                        <span className="text-amber-700 text-sm">~₹{netPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Certified Components from Quotation */}
                  <div className="space-y-3 text-xs mb-8">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        <strong>Modules:</strong> {pkg.panel_count} × {pkg.panel_wattage}W {pkg.panel_technology} ({pkg.total_wp} Wp)
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        <strong>Inverter:</strong> {pkg.inverter_model}
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        <strong>Protection:</strong> Dedicated AC DB & DC DB with Type-II SPD
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        <strong>Earthing & Lightning:</strong> Chemical earthing electrodes + rooftop arrester
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        <strong>Maintenance:</strong> 5-Year AMC option included in quotation
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        <strong>MSEDCL:</strong> Complete net-metering liaison assistance
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => openQuoteWithPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-amber-600 text-white'
                    }`}
                  >
                    <span>{t.packages.requestPackage}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setPackageDetailModal(pkg)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.packages.viewQuotationDoc}</span>
                  </button>

                  <div className="text-[10px] text-center text-slate-600 font-medium">
                    {t.packages.validityPrefix} {pkg.quotation_validity_days} {t.packages.validitySuffix}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing & Subsidy Legal Notes (Strict Compliance) */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 max-w-4xl mx-auto text-xs text-slate-600 space-y-1.5 mb-10">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Quotation Notice:</strong> {t.packages.priceNote}
            </p>
          </div>
          <p className="pl-6 text-[11px] text-slate-500">
            {t.packages.subsidyDisclaimer}
          </p>
        </div>

        {/* Toggle Comparison Matrix Button */}
        <div className="text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-bold text-xs shadow-xs hover:shadow transition-all"
          >
            <Table className="w-4 h-4 text-amber-600" />
            <span>{showComparison ? "Hide Comparison Matrix" : t.packages.comparePackages}</span>
          </button>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        {showComparison && (
          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                      Technical & Commercial Specs
                    </th>
                    {packages.map((pkg) => (
                      <th key={pkg.id} className="p-4 font-black text-sm text-center border-b border-slate-800">
                        {pkg.capacity_kw} kW ({pkg.total_wp} Wp)
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-900">Quoted System Price</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center font-bold text-slate-900">
                        ₹{p.system_price.toLocaleString('en-IN')}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-900">Govt. CFA Subsidy Reference*</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center font-bold text-emerald-700">
                        ₹{p.subsidy_reference.toLocaleString('en-IN')}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-900">Approx. Net Outlay*</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center font-black text-amber-700">
                        ₹{(p.system_price - p.subsidy_reference).toLocaleString('en-IN')}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-900">Module Count & Power</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center">
                        {p.panel_count} Panels × {p.panel_wattage}W
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-900">Module Technology</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center">
                        {p.panel_technology}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-900">Grid Inverter</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center font-medium">
                        {p.inverter_model}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-900">Annual Maintenance (AMC)</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center font-semibold text-emerald-700">
                        {p.amc_included_years} Years Option
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-900">PV Performance Warranty Reference*</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center text-[11px]">
                        {p.warranty_pv_performance}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-900">Quotation Validity</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center">
                        {p.quotation_validity_days} Days
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">Action</td>
                    {packages.map(p => (
                      <td key={p.id} className="p-4 text-center">
                        <button
                          onClick={() => openQuoteWithPackage(p)}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs"
                        >
                          Select {p.capacity_kw} kW
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
