import React, { useState, useEffect, useId } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const {
    quoteModalOpen,
    setQuoteModalOpen,
    selectedPackageForQuote,
    setSelectedPackageForQuote,
    businessSettings,
    addLead,
    showToast,
    t,
  } = useApp();

  const fullNameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const cityId = useId();
  const propertyTypeId = useId();
  const capacityId = useId();
  const monthlyBillId = useId();
  const monthlyUnitsId = useId();
  const messageId = useId();
  const consentId = useId();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Bhusawal',
    propertyType: 'Residential' as 'Residential' | 'Commercial' | 'Industrial',
    monthlyBill: 3500,
    monthlyUnits: 400,
    preferredCapacity: '3.5 kW',
    message: '',
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedPackageForQuote) {
      setFormData(prev => ({
        ...prev,
        preferredCapacity: `${selectedPackageForQuote.capacity_kw} kW (${selectedPackageForQuote.total_wp} Wp)`,
      }));
    }
  }, [selectedPackageForQuote]);

  if (!quoteModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    const phoneClean = formData.phone.trim().replace(/\D/g, '');
    if (!phoneClean || phoneClean.length !== 10 || !/^[6-9]\d{9}$/.test(phoneClean)) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.city.trim()) errs.city = "Please enter your city / location.";
    if (!formData.consent) errs.consent = "Please check the consent agreement to proceed.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      addLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        property_type: formData.propertyType,
        monthly_bill: formData.monthlyBill,
        monthly_units: formData.monthlyUnits,
        preferred_capacity: formData.preferredCapacity,
        message: formData.message.trim(),
        source: selectedPackageForQuote
          ? `Package Modal: ${selectedPackageForQuote.capacity_kw} kW`
          : 'Website Quote Modal',
      });

      setSubmitting(false);
      setSubmitted(true);
      showToast(t.contact.successTitle, 'success');
    }, 500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `*Balaji Solar Systems — Quotation Request*\n` +
      `• Name: ${formData.name || 'Customer'}\n` +
      `• Mobile: ${formData.phone || 'N/A'}\n` +
      `• City: ${formData.city}\n` +
      `• Property: ${formData.propertyType}\n` +
      `• Monthly Bill: ₹${formData.monthlyBill}\n` +
      `• Capacity: ${formData.preferredCapacity}\n` +
      `• Note: ${formData.message || 'Please send solar quotation details'}`
    );
    window.open(`https://wa.me/91${businessSettings.whatsapp}?text=${text}`, '_blank');
  };

  const handleClose = () => {
    setQuoteModalOpen(false);
    setSelectedPackageForQuote(null);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 px-2 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {t.contact.successTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              {t.contact.successMessage}
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-amber-600 font-bold tracking-wider">
                Personalized Rooftop Proposal
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Get Your Free Solar Consultation
              </h3>
              {selectedPackageForQuote && (
                <div className="mt-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
                  Selected Package: <strong>{selectedPackageForQuote.capacity_kw} kW</strong> ({selectedPackageForQuote.panel_count} × {selectedPackageForQuote.panel_wattage}W Bifacial) — ₹{selectedPackageForQuote.system_price.toLocaleString('en-IN')}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor={fullNameId} className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  id={fullNameId}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vivek Patil"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                    errors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.name && <p className="text-[10px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor={phoneId} className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (10 digits) *
                </label>
                <input
                  id={phoneId}
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9009600665"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor={emailId} className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  id={emailId}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor={cityId} className="block text-xs font-bold text-slate-700 mb-1">
                  City / Location *
                </label>
                <input
                  id={cityId}
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Bhusawal, Jalgaon, etc."
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                    errors.city ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.city && <p className="text-[10px] text-red-600 mt-1">{errors.city}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor={propertyTypeId} className="block text-xs font-bold text-slate-700 mb-1">
                  Property Type
                </label>
                <select
                  id={propertyTypeId}
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial / Office</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <div>
                <label htmlFor={capacityId} className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Capacity
                </label>
                <input
                  id={capacityId}
                  type="text"
                  value={formData.preferredCapacity}
                  onChange={(e) => setFormData({ ...formData, preferredCapacity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor={monthlyBillId} className="block text-xs font-bold text-slate-700 mb-1">
                  Average Monthly Bill (₹)
                </label>
                <input
                  id={monthlyBillId}
                  type="number"
                  value={formData.monthlyBill}
                  onChange={(e) => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor={monthlyUnitsId} className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly Consumption Units (kWh)
                </label>
                <input
                  id={monthlyUnitsId}
                  type="number"
                  value={formData.monthlyUnits}
                  onChange={(e) => setFormData({ ...formData, monthlyUnits: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor={messageId} className="block text-xs font-bold text-slate-700 mb-1">
                Any specific question or site note
              </label>
              <textarea
                id={messageId}
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Rooftop terrace type, shadow observations, or timeline..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={consentId} className="flex items-start gap-2 cursor-pointer">
                <input
                  id={consentId}
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 shrink-0"
                />
                <span className="text-[11px] text-slate-600 leading-snug">
                  {t.contact.consentText}
                </span>
              </label>
              {errors.consent && <p className="text-[10px] text-red-600 mt-1">{errors.consent}</p>}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:flex-1 py-3 px-6 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? "Sending Request..." : "Request Official Quotation"}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto py-3 px-5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Instead</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
