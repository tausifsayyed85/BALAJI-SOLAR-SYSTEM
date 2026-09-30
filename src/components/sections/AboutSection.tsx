import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Shield, User, MapPin, FileCheck, Phone } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, businessSettings, activeDisplayAddress, setQuoteModalOpen } = useApp();

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Assets & Founder Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 reveal-init">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/src/assets/images/solar_engineer_1790791657194.jpg"
                alt="Solar engineer inspecting rooftop solar photovoltaic panels in Bhusawal Maharashtra"
                loading="lazy"
                className="w-full h-80 sm:h-96 object-cover hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                  Engineering & Field Execution
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  Local rooftop inspection, testing and commissioning
                </p>
                <span className="text-[10px] text-slate-300">Illustrative Engineering Visual</span>
              </div>
            </div>

            {/* Founder Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    {t.about.proprietorTitle}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {businessSettings.owner_name}
                  </h3>
                  <div className="text-xs font-medium text-slate-600 mb-2">
                    {t.about.proprietorRole}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.about.proprietorNote}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>GST: <strong className="text-slate-900">{businessSettings.gst}</strong></span>
                </div>
                <a
                  href={`tel:${businessSettings.phone}`}
                  className="inline-flex items-center gap-1 font-bold text-amber-700 hover:text-amber-800"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{businessSettings.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Business Story & Capabilities */}
          <div className="lg:col-span-7 flex flex-col items-start reveal-init delay-150">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
              {t.about.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
              {t.about.title}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              {t.about.leadParagraph}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {t.about.bodyParagraph}
            </p>

            {/* Core Capabilities Checklist */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {t.about.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    {cap}
                  </span>
                </div>
              ))}
            </div>

            {/* Address Verification Badge & Details */}
            <div className="w-full p-4 bg-amber-50/70 border border-amber-200/70 rounded-xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-950">Approved Business Location:</span>
                  <p className="text-amber-900 mt-0.5">{activeDisplayAddress}</p>
                </div>
              </div>
              <span className="shrink-0 text-[11px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Verified Address
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all"
              >
                Discuss Your Solar Project
              </button>
              <a
                href="#packages"
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                View Quoted Packages
              </a>
            </div>

            <div className="mt-4 text-[11px] text-slate-600">
              {t.about.experienceNote}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
