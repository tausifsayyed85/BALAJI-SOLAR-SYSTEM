import React from 'react';
import { useApp } from '../../context/AppContext';
import { BalajiLogo } from '../brand/BalajiLogo';
import { Phone, Mail, MapPin, Instagram, Youtube, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, businessSettings, activeDisplayAddress, setLegalModalType, setCmsModalOpen } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="mb-4">
              <BalajiLogo variant="footer" size="lg" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              {t.footer.tagline}
            </p>

            <div className="text-xs text-slate-400 space-y-1 mb-6">
              <div>
                <strong>Proprietor:</strong> {businessSettings.owner_name}
              </div>
              <div>
                <strong>GST:</strong> <span className="font-mono text-slate-300">{businessSettings.gst}</span>
              </div>
            </div>

            {/* Social Handles */}
            <div className="flex items-center gap-3">
              <a
                href={`https://instagram.com/${businessSettings.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-amber-600 rounded-xl text-slate-300 hover:text-white transition-colors"
                title="Follow Balaji Solar Systems on Instagram (@Solar_Wallah)"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://youtube.com/@${businessSettings.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-red-600 rounded-xl text-slate-300 hover:text-white transition-colors"
                title="Subscribe to Balaji Solar Systems on YouTube (@Solar_Wallah)"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <span className="text-xs text-slate-400 font-mono">
                @{businessSettings.instagram}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Solar Packages</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Solar Calculator</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Project Showcase</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Learn Solar</a></li>
            </ul>
          </div>

          {/* Solar Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              {t.footer.solutionsTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#solutions" className="hover:text-white transition-colors">Residential Rooftop Solar</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Commercial & Office Solar</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Rooftop Canopy Structures</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">5-Year AMC Maintenance</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Free Site Consultation</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">TATA Power Solar Quoted Systems</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{activeDisplayAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${businessSettings.phone}`} className="hover:text-white">
                  +91 {businessSettings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${businessSettings.email}`} className="hover:text-white break-all">
                  {businessSettings.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCmsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-amber-400 py-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Business Admin CMS</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Policies Row */}
        <div className="pt-8 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setLegalModalType('privacy')} className="hover:text-slate-300">
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setLegalModalType('terms')} className="hover:text-slate-300">
              Terms & Conditions
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setLegalModalType('cookie')} className="hover:text-slate-300">
              Cookie Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setLegalModalType('disclaimer')} className="hover:text-slate-300">
              General Disclaimer
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setLegalModalType('solarDisclaimer')} className="hover:text-slate-300">
              Solar Estimate Disclaimer
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setLegalModalType('refund')} className="hover:text-slate-300">
              Quotation Cancellation / Refund
            </button>
          </div>

          <div>
            © {currentYear} Balaji Solar Systems. All Rights Reserved.
          </div>
        </div>

        {/* Mandatory Regulatory Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-400 leading-relaxed text-center max-w-4xl mx-auto">
          {t.footer.disclaimerText}
        </div>

      </div>
    </footer>
  );
};
