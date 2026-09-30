import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, Printer, FileText, ShieldCheck, Phone } from 'lucide-react';

export const PackageDetailModal: React.FC = () => {
  const {
    packageDetailModal,
    setPackageDetailModal,
    openQuoteWithPackage,
    businessSettings,
    activeDisplayAddress,
  } = useApp();

  if (!packageDetailModal) return null;

  const pkg = packageDetailModal;
  const netEstimated = pkg.system_price - pkg.subsidy_reference;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none">
        
        {/* Close Button */}
        <button
          onClick={() => setPackageDetailModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors print:hidden"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Quotation Header */}
        <div className="border-b border-slate-200 pb-5 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-amber-600 tracking-wider">
                Official Quotation Specification
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                {pkg.capacity_kw} kW Grid-Connected Solar System
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Balaji Solar Systems · Bhusawal, Maharashtra · GST: {businessSettings.gst}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-mono text-slate-500 block">Validity</span>
              <span className="text-xs font-bold text-slate-900">{pkg.quotation_validity_days} Days from Issue</span>
            </div>
          </div>
        </div>

        {/* Pricing Summary Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-2 border-b sm:border-b-0 sm:border-r border-slate-200">
            <span className="text-[11px] text-slate-500 block">Quoted Price</span>
            <span className="text-xl font-black text-slate-900">₹{pkg.system_price.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-2 border-b sm:border-b-0 sm:border-r border-slate-200">
            <span className="text-[11px] text-emerald-700 block font-medium">Govt. CFA Subsidy Ref*</span>
            <span className="text-xl font-black text-emerald-700">₹{pkg.subsidy_reference.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-2">
            <span className="text-[11px] text-amber-700 block font-bold">Approx. Net Outlay*</span>
            <span className="text-xl font-black text-amber-700">~₹{netEstimated.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Bill of Materials (BOM) Table */}
        <div className="space-y-4 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Quoted Scope of Supply & Equipment Specifications
          </h4>

          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50 font-semibold text-slate-900">
                  <td className="p-3 w-1/3">Solar PV Modules</td>
                  <td className="p-3 text-slate-700">
                    {pkg.panel_count} Nos × {pkg.panel_wattage} Wp ({pkg.total_wp} Wp total)<br />
                    <span className="text-slate-500">{pkg.panel_technology} — {pkg.panel_brand_ref}</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-900">Grid Inverter</td>
                  <td className="p-3 text-slate-700">
                    {pkg.inverter_model} ({pkg.inverter_capacity})<br />
                    <span className="text-slate-500">TATA Power SOLAROOF Approved String Inverter</span>
                  </td>
                </tr>

                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">AC / DC Distribution</td>
                  <td className="p-3 text-slate-700">{pkg.ac_dc_db}</td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-900">Earthing System</td>
                  <td className="p-3 text-slate-700">{pkg.earthing_details}</td>
                </tr>

                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Lightning Arrester</td>
                  <td className="p-3 text-slate-700">{pkg.lightning_arrester}</td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-900">Cabling & BOS</td>
                  <td className="p-3 text-slate-700">{pkg.cables_fittings}</td>
                </tr>

                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Annual Maintenance (AMC)</td>
                  <td className="p-3 text-emerald-700 font-bold">{pkg.amc_included_years} Years AMC Option as quoted</td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-900">Warranty Reference*</td>
                  <td className="p-3 text-slate-700">
                    {pkg.warranty_pv_performance}<br />
                    <span className="text-slate-500">{pkg.warranty_inverter}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Confidential Banking Shield Notification */}
        <div className="p-3.5 rounded-xl bg-slate-100 text-slate-600 text-[11px] leading-relaxed mb-6 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>Public Quotation Policy:</strong> Banking details, RTGS/NEFT accounts, and payment milestones are provided securely in formal signed paper contracts to ensure client data security.
          </span>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Specification</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPackageDetailModal(null)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                setPackageDetailModal(null);
                openQuoteWithPackage(pkg);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
            >
              Order / Request This Package
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
