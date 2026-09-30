import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export const LegalModal: React.FC = () => {
  const { legalModalType, setLegalModalType, businessSettings, activeDisplayAddress } = useApp();

  if (!legalModalType) return null;

  const policies: Record<string, { title: string; content: string[] }> = {
    privacy: {
      title: "Privacy Policy",
      content: [
        "Balaji Solar Systems respects your privacy. When you request a rooftop solar consultation or estimate, we collect only the necessary details required to assess your project: your name, contact mobile number, email address, property address/city, and approximate monthly electricity consumption units.",
        "Your contact information is strictly used by proprietor Vivek Patil and our direct engineering personnel to discuss system feasibility, schedule site inspections, and provide formal quotation proposals.",
        "We do not sell, rent, monetize, or disclose your personal data to third-party telemarketing or data brokerage agencies.",
        "To review, update, or request deletion of your submitted consultation details, you may contact us at balajisolarsystems28@gmail.com or call 9009600665.",
      ],
    },
    terms: {
      title: "Terms & Conditions",
      content: [
        "1. Scope of Quotations: Estimates provided on this website are indicative representations based on standard sunshine conditions in Maharashtra. Actual quotations are formalized in written proposals following physical site inspection and shadow profiling.",
        "2. Equipment Specifications: System components, including TATA MONO bifacial modules and SOLAROOF approved grid inverters, are supplied in accordance with the signed quotation schedule.",
        "3. Installation & Net Metering: Physical installation is conducted by certified electricians. Net-metering approval timelines depend on the local MSEDCL division and regulatory inspection schedules.",
        "4. Jurisdiction: Any disputes arising out of contracts entered into with Balaji Solar Systems shall be subject to the exclusive jurisdiction of the competent courts in Bhusawal / Jalgaon, Maharashtra.",
      ],
    },
    cookie: {
      title: "Cookie Policy",
      content: [
        "This website utilizes minimal browser local storage exclusively for functional purposes: remembering your selected language preference (English, Hindi, or Marathi) and maintaining your solar calculator session.",
        "We do not employ third-party tracking cookies or behavioral advertising trackers across our website interface.",
      ],
    },
    disclaimer: {
      title: "General Business Disclaimer",
      content: [
        "Balaji Solar Systems is an independent solar engineering and installation business operating from Bhusawal, Maharashtra, led by proprietor Vivek Patil.",
        "References to equipment manufacturers (including Tata Power Solar or other component brands) indicate the quoted component models and approved materials used in the proposed system engineering, and should not be construed as unauthorized agency claims.",
        "17+ years of experience reflects business-provided background in electrical and solar contracting work.",
      ],
    },
    solarDisclaimer: {
      title: "Solar Estimate & Generation Disclaimer",
      content: [
        "CRITICAL NOTICE: All solar calculations, projected annual kilowatt-hour generations, and estimated electricity bill savings presented on this website are purely indicative simulations.",
        "Actual photovoltaic generation fluctuates based on seasonal atmospheric variations, roof orientation, tilt angle, local temperature coefficients, dust accumulation, tree/building shading, and MSEDCL tariff slab modifications.",
        "Balaji Solar Systems does not guarantee fixed monthly monetary savings or electricity production figures. A customized shadow-path analysis is conducted prior to contract finalization.",
      ],
    },
    refund: {
      title: "Quotation, Payment & Cancellation Terms",
      content: [
        "1. Quotation Validity: As noted on official quotation documents, quoted pricing is valid for 7 days from the date of quotation issue.",
        "2. Order Confirmation: Formal order processing commences upon signing of the quotation proposal and receipt of the agreed mobilization advance as specified in the quotation terms.",
        "3. Material Procurement & Cancellation: Once customized structural materials and solar modules are procured and dispatched from the manufacturer warehouse specifically for a site, cancellation and refund terms apply in accordance with the executed written agreement.",
        "4. Payment Milestones: Payment milestones (Advance, Delivery of Materials, Commissioning) are detailed in the official written contract. Bank details are provided securely in formal invoices to safeguard client financial transactions.",
      ],
    },
  };

  const currentPolicy = policies[legalModalType] || policies.privacy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 relative max-h-[88vh] overflow-y-auto">
        <button
          onClick={() => setLegalModalType(null)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
          <FileText className="w-4 h-4" />
          <span>Legal Document & Policy</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-6">
          {currentPolicy.title}
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
          {currentPolicy.content.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Balaji Solar Systems · Vivek Patil · Bhusawal, MH
          </div>
          <button
            onClick={() => setLegalModalType(null)}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
