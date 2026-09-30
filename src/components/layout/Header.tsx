import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BalajiLogo } from '../brand/BalajiLogo';
import { Phone, MessageCircle, Menu, X, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';

export const Header: React.FC = () => {
  const { language, setLanguage, t, businessSettings, setQuoteModalOpen, setCmsModalOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waMessages = {
    en: "Hello Balaji Solar Systems, I am interested in a rooftop solar system. Please help me with a quotation.",
    hi: "नमस्ते Balaji Solar Systems, मुझे रूफटॉप सोलर सिस्टम में रुचि है। कृपया मुझे कोटेशन के बारे में जानकारी दें।",
    mr: "नमस्कार Balaji Solar Systems, मला रूफटॉप सोलर सिस्टममध्ये स्वारस्य आहे. कृपया मला कोटेशनची माहिती द्या.",
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(waMessages[language]);
    window.open(`https://wa.me/91${businessSettings.whatsapp}?text=${text}`, '_blank');
  };

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.solutions, href: '#solutions' },
    { label: t.nav.products, href: '#products' },
    { label: t.nav.packages, href: '#packages' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: t.nav.calculator, href: '#calculator' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.blog, href: '#blog' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#home" className="shrink-0 flex items-center focus:outline-none">
            <BalajiLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-600 transition-colors focus:outline-none"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200">
              {(['en', 'hi', 'mr'] as Language[]).map((lng) => {
                const labels: Record<Language, string> = {
                  en: 'EN',
                  hi: 'हिन्दी',
                  mr: 'मराठी',
                };
                const active = language === lng;
                return (
                  <button
                    key={lng}
                    onClick={() => setLanguage(lng)}
                    className={`px-2 py-1 rounded transition-colors ${
                      active
                        ? 'bg-white text-amber-700 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {labels[lng]}
                  </button>
                );
              })}
            </div>

            {/* Call Button */}
            <a
              href={`tel:${businessSettings.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-colors"
              title={`Call Balaji Solar Systems: ${businessSettings.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden 2xl:inline">{businessSettings.phone}</span>
            </a>

            {/* WhatsApp CTA */}
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
              title="Chat with Balaji Solar Systems on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">WhatsApp</span>
            </button>

            {/* Primary Quote CTA */}
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all hover:shadow active:scale-98"
            >
              {t.nav.getQuote}
            </button>

            {/* CMS / Admin quick entry icon */}
            <button
              onClick={() => setCmsModalOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Balaji Solar CMS & Settings"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Controls: Language + WhatsApp + Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Compact Lang Switch */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-md text-[11px] font-semibold text-slate-600">
              {(['en', 'hi', 'mr'] as Language[]).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-1.5 py-0.5 rounded ${
                    language === lng ? 'bg-white text-amber-700 font-bold' : 'text-slate-500'
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={openWhatsApp}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-slate-700 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteModalOpen(true);
              }}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-sm text-center shadow-xs"
            >
              {t.nav.getQuote}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${businessSettings.phone}`}
                className="flex items-center justify-center gap-1.5 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call {businessSettings.phone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCmsModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Admin CMS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
