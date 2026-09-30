import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Lock,
  Save,
  Download,
  CheckCircle2,
  AlertTriangle,
  Building,
  Package,
  Users,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

export const AdminCmsModal: React.FC = () => {
  const {
    cmsModalOpen,
    setCmsModalOpen,
    businessSettings,
    updateBusinessSettings,
    packages,
    updatePackage,
    leads,
    showToast,
    t,
  } = useApp();

  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);
  const [activeTab, setActiveTab] = useState<'business' | 'packages' | 'leads'>('business');

  // Local editable business state
  const [localSettings, setLocalSettings] = useState(businessSettings);

  // Local editable packages state
  const [localPackages, setLocalPackages] = useState(packages);

  if (!cmsModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'balaji2026' || passcode === 'admin123' || passcode === '9009600665') {
      setAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleQuickUnlock = () => {
    setAuthenticated(true);
    setPassError(false);
  };

  const handleSaveBusiness = () => {
    updateBusinessSettings(localSettings);
    showToast("Business & address settings saved successfully!", "success");
  };

  const handleSavePackage = (id: string) => {
    const target = localPackages.find(p => p.id === id);
    if (target) {
      updatePackage(id, target);
      showToast(`Package ${target.capacity_kw} kW pricing updated!`, "success");
    }
  };

  const handleExportCsv = () => {
    if (leads.length === 0) {
      showToast("No leads available to export.", "info");
      return;
    }

    const headers = ["ID", "Name", "Phone", "Email", "City", "Property", "Monthly Bill", "Units", "Capacity", "Source", "Date", "Status"];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      l.phone,
      l.email,
      `"${l.city}"`,
      l.property_type,
      l.monthly_bill,
      l.monthly_units,
      `"${l.preferred_capacity || ''}"`,
      `"${l.source}"`,
      l.created_at,
      l.status,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `balaji_solar_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Leads CSV exported successfully!", "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setCmsModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Close CMS"
        >
          <X className="w-5 h-5" />
        </button>

        {!authenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto py-8 text-center">
            <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Business CMS & Settings
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Enter the security passcode to manage approved business address, quotation pricing, and customer leads.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. balaji2026)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />

              {passError && (
                <p className="text-xs text-red-600 font-medium">
                  Invalid passcode. Try "balaji2026" or click demo access below.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Access CMS
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleQuickUnlock}
                  className="text-xs text-amber-700 font-semibold hover:underline"
                >
                  Quick Unlock for Verification / Demo Access
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* CMS Dashboard */
          <div>
            <div className="border-b border-slate-200 pb-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-amber-600 font-bold uppercase tracking-wider">
                  Admin Control Panel
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  Balaji Solar Systems CMS
                </h3>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-700">
                <button
                  onClick={() => setActiveTab('business')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'business' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Business & Address</span>
                </button>

                <button
                  onClick={() => setActiveTab('packages')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'packages' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Packages & Pricing</span>
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'leads' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Leads ({leads.length})</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Business Settings & Address Verification */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                
                {/* Critical Address Verification Selector (Shop 101 vs 201) */}
                <div className="p-5 bg-amber-50/80 border border-amber-300 rounded-2xl">
                  <div className="flex items-start gap-2.5 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                        Address Verification Discrepancy Control
                      </h4>
                      <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
                        The uploaded quotation documents state <strong>"Shop No. 201"</strong> while the business-card artwork states <strong>"Shop No. 101"</strong>. Select which verified address is currently displayed publicly on the website:
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pl-7">
                    <label className="flex items-start gap-2.5 text-xs text-slate-800 cursor-pointer p-2.5 rounded-xl bg-white border border-amber-200">
                      <input
                        type="radio"
                        name="approvedAddress"
                        checked={localSettings.approved_address_variant === '101'}
                        onChange={() => setLocalSettings({ ...localSettings, approved_address_variant: '101' })}
                        className="mt-0.5 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <strong className="text-slate-900 block">Option A: Shop No. 101 (From Business Card — Recommended)</strong>
                        <span className="text-slate-600 text-[11px]">{localSettings.address_101}</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 text-xs text-slate-800 cursor-pointer p-2.5 rounded-xl bg-white border border-amber-200">
                      <input
                        type="radio"
                        name="approvedAddress"
                        checked={localSettings.approved_address_variant === '201'}
                        onChange={() => setLocalSettings({ ...localSettings, approved_address_variant: '201' })}
                        className="mt-0.5 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <strong className="text-slate-900 block">Option B: Shop No. 201 (From Quotation Document)</strong>
                        <span className="text-slate-600 text-[11px]">{localSettings.address_201}</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Primary Business Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={localSettings.business_name}
                      onChange={(e) => setLocalSettings({ ...localSettings, business_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Proprietor Name
                    </label>
                    <input
                      type="text"
                      value={localSettings.owner_name}
                      onChange={(e) => setLocalSettings({ ...localSettings, owner_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary Phone / Call
                    </label>
                    <input
                      type="text"
                      value={localSettings.phone}
                      onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      WhatsApp Number (91...)
                    </label>
                    <input
                      type="text"
                      value={localSettings.whatsapp}
                      onChange={(e) => setLocalSettings({ ...localSettings, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Official Contact Email (Verified Spelling)
                    </label>
                    <input
                      type="email"
                      value={localSettings.email}
                      onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      GST Number
                    </label>
                    <input
                      type="text"
                      value={localSettings.gst}
                      onChange={(e) => setLocalSettings({ ...localSettings, gst: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-mono font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Social Handle (Instagram & YouTube)
                    </label>
                    <input
                      type="text"
                      value={localSettings.instagram}
                      onChange={(e) => setLocalSettings({ ...localSettings, instagram: e.target.value, youtube: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-mono font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Google Maps URL
                    </label>
                    <input
                      type="text"
                      value={localSettings.google_maps_url}
                      onChange={(e) => setLocalSettings({ ...localSettings, google_maps_url: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={handleSaveBusiness}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Business & Address Settings</span>
                  </button>
                </div>

              </div>
            )}

            {/* Tab 2: Packages & Pricing CMS */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <p className="text-xs text-slate-600">
                  Update quotation prices, government subsidy references, and validity durations without hard-coding:
                </p>

                <div className="space-y-4">
                  {localPackages.map((pkg, idx) => (
                    <div key={pkg.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900 mb-3">
                        <span className="text-sm">{pkg.capacity_kw} kW System ({pkg.total_wp} Wp)</span>
                        <span className="text-amber-700 font-mono">{pkg.panel_count} × {pkg.panel_wattage}W Bifacial</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">System Price (₹)</label>
                          <input
                            type="number"
                            value={pkg.system_price}
                            onChange={(e) => {
                              const updated = [...localPackages];
                              updated[idx].system_price = Number(e.target.value);
                              setLocalPackages(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Subsidy Reference (₹)</label>
                          <input
                            type="number"
                            value={pkg.subsidy_reference}
                            onChange={(e) => {
                              const updated = [...localPackages];
                              updated[idx].subsidy_reference = Number(e.target.value);
                              setLocalPackages(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold text-emerald-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Quotation Validity (Days)</label>
                          <input
                            type="number"
                            value={pkg.quotation_validity_days}
                            onChange={(e) => {
                              const updated = [...localPackages];
                              updated[idx].quotation_validity_days = Number(e.target.value);
                              setLocalPackages(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSavePackage(pkg.id)}
                          className="px-4 py-1.5 bg-slate-900 hover:bg-amber-600 text-white font-bold rounded-lg text-xs transition-colors"
                        >
                          Update {pkg.capacity_kw} kW Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Leads Manager */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">
                    Total Submitted Inquiries: <strong>{leads.length}</strong>
                  </span>
                  <button
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Leads to CSV</span>
                  </button>
                </div>

                {leads.length === 0 ? (
                  <div className="p-12 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                    No inquiries received yet. Submit a test consultation from the frontend to see it here!
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs max-h-96 overflow-y-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 font-bold text-slate-800 sticky top-0">
                        <tr>
                          <th className="p-3">Customer</th>
                          <th className="p-3">Contact</th>
                          <th className="p-3">Property & City</th>
                          <th className="p-3">Bill / Capacity</th>
                          <th className="p-3">Source</th>
                          <th className="p-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-900">{lead.name}</td>
                            <td className="p-3">
                              <a href={`tel:${lead.phone}`} className="text-amber-700 font-semibold hover:underline block">
                                {lead.phone}
                              </a>
                              <span className="text-[11px] text-slate-500">{lead.email}</span>
                            </td>
                            <td className="p-3">
                              <span className="font-semibold text-slate-800">{lead.city}</span>
                              <span className="text-[11px] text-slate-500 block">{lead.property_type}</span>
                            </td>
                            <td className="p-3">
                              <span>₹{lead.monthly_bill} / {lead.monthly_units} kWh</span>
                              <span className="text-[11px] text-amber-700 block font-semibold">{lead.preferred_capacity}</span>
                            </td>
                            <td className="p-3 text-[11px] text-slate-500">{lead.source}</td>
                            <td className="p-3 text-[11px] text-slate-400">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
