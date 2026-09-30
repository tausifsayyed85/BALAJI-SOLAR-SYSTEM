import React, { useState, useId } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t, businessSettings, activeDisplayAddress, addLead, showToast, language } = useApp();

  const fullNameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const cityId = useId();
  const propertyTypeId = useId();
  const preferredCapacityId = useId();
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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your full name.";
    }
    const phoneClean = formData.phone.trim().replace(/\D/g, '');
    if (!phoneClean || phoneClean.length !== 10 || !/^[6-9]\d{9}$/.test(phoneClean)) {
      errs.phone = "Please enter a valid 10-digit Indian mobile number.";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.city.trim()) {
      errs.city = "Please enter your city / town.";
    }
    if (!formData.consent) {
      errs.consent = "Please check the consent box to proceed.";
    }
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
        source: 'Website Contact Page Form',
      });

      setSubmitting(false);
      setSubmitted(true);
      showToast(t.contact.successTitle, 'success');
    }, 600);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `*Balaji Solar Systems — Consultation Enquiry*\n` +
      `• Name: ${formData.name || 'Customer'}\n` +
      `• Mobile: ${formData.phone || 'Provided via WhatsApp'}\n` +
      `• Email: ${formData.email || 'N/A'}\n` +
      `• City: ${formData.city}\n` +
      `• Property: ${formData.propertyType}\n` +
      `• Monthly Bill: ₹${formData.monthlyBill}\n` +
      `• Preferred Capacity: ${formData.preferredCapacity}\n` +
      `• Note: ${formData.message || 'Looking for rooftop solar assessment'}`
    );
    window.open(`https://wa.me/91${businessSettings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.contact.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Business Contact Information */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-6">
                Bhusawal Headquarters
              </h3>

              <div className="space-y-6 text-xs sm:text-sm">
                
                {/* Office Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-0.5">
                      {t.contact.addressTitle}
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {activeDisplayAddress}
                    </p>
                    <span className="text-[11px] text-amber-800 font-semibold block mt-1">
                      {t.contact.addressNote}
                    </span>
                  </div>
                </div>

                {/* Direct Phone & WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-0.5">
                      {t.contact.phoneTitle}
                    </span>
                    <a
                      href={`tel:${businessSettings.phone}`}
                      className="text-base font-extrabold text-slate-900 hover:text-amber-600 transition-colors block"
                    >
                      +91 {businessSettings.phone}
                    </a>
                    <span className="text-xs text-slate-500">
                      Proprietor: <strong>{businessSettings.owner_name}</strong>
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-0.5">
                      {t.contact.emailTitle}
                    </span>
                    <a
                      href={`mailto:${businessSettings.email}`}
                      className="font-bold text-slate-800 hover:text-amber-600 transition-colors"
                    >
                      {businessSettings.email}
                    </a>
                  </div>
                </div>

                {/* GST & Working Hours */}
                <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">{t.contact.gstTitle}</span>
                    <span className="font-mono font-bold text-slate-700">{businessSettings.gst}</span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">{t.contact.hoursTitle}</span>
                    <span className="text-slate-600">{t.contact.hours}</span>
                  </div>
                </div>

              </div>

              {/* Google Map Link / Directions & Interactive Embed */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="mb-4 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm relative group bg-slate-100 aspect-[16/9] sm:aspect-[2/1]">
                  <iframe
                    title="Balaji Solar Systems Location Map"
                    src="https://maps.google.com/maps?q=Sahakar+Nagar,+Bhusawal,+Maharashtra+425201&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[25%] contrast-[105%] group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md pointer-events-none">
                    Bhusawal · Maharashtra
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={businessSettings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-amber-600 text-white shadow-xs transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Office</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md">
            
            {submitted ? (
              <div className="text-center py-12 px-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  {t.contact.successTitle}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
                  {t.contact.successMessage}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        city: 'Bhusawal',
                        propertyType: 'Residential',
                        monthlyBill: 3500,
                        monthlyUnits: 400,
                        preferredCapacity: '3.5 kW',
                        message: '',
                        consent: true,
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    Submit Another Query
                  </button>
                  <a
                    href={`tel:${businessSettings.phone}`}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                  >
                    {t.contact.callDirect}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {t.contact.formTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.contact.formSubtitle}
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={fullNameId} className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      id={fullNameId}
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Patil"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor={phoneId} className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={emailId} className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.emailLabel}
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh@gmail.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor={cityId} className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.cityLabel}
                    </label>
                    <input
                      id={cityId}
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Bhusawal, Jalgaon, etc."
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                        errors.city ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
                  </div>
                </div>

                {/* Property Type & Preferred Capacity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={propertyTypeId} className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.propertyLabel}
                    </label>
                    <select
                      id={propertyTypeId}
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="Residential">Residential Home</option>
                      <option value="Commercial">Commercial / Shop</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={preferredCapacityId} className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.capacityLabel}
                    </label>
                    <select
                      id={preferredCapacityId}
                      value={formData.preferredCapacity}
                      onChange={(e) => setFormData({ ...formData, preferredCapacity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="3.5 kW">3.5 kW (6 Panels / 3540 Wp)</option>
                      <option value="4.1 kW">4.1 kW (7 Panels / 4130 Wp)</option>
                      <option value="5.3 kW">5.3 kW (9 Panels / 5310 Wp)</option>
                      <option value="Custom / Above 10 kW">Custom / Above 10 kW</option>
                    </select>
                  </div>
                </div>

                {/* Monthly Bill & Units */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={monthlyBillId} className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.billLabel}
                    </label>
                    <input
                      id={monthlyBillId}
                      type="number"
                      value={formData.monthlyBill}
                      onChange={(e) => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={monthlyUnitsId} className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.unitsLabel}
                    </label>
                    <input
                      id={monthlyUnitsId}
                      type="number"
                      value={formData.monthlyUnits}
                      onChange={(e) => setFormData({ ...formData, monthlyUnits: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor={messageId} className="block text-xs font-bold text-slate-700 mb-1">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id={messageId}
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specific questions about your roof, shading, or quotation..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
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
                  {errors.consent && <p className="text-[11px] text-red-600 mt-1">{errors.consent}</p>}
                </div>

                {/* Submission Action Cluster */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? t.contact.submitting : t.contact.submitBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.contact.whatsappDirectBtn}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
