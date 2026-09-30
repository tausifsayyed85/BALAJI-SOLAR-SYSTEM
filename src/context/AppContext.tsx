import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, BusinessSettings, SolarPackage, Lead, SolarArticle } from '../types';
import { translations } from '../data/translations';
import { initialBusinessSettings, initialPackages } from '../data/initialData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  businessSettings: BusinessSettings;
  updateBusinessSettings: (updated: Partial<BusinessSettings>) => void;
  packages: SolarPackage[];
  updatePackage: (id: string, updated: Partial<SolarPackage>) => void;
  leads: Lead[];
  addLead: (leadData: Omit<Lead, 'id' | 'created_at' | 'status'>) => void;
  selectedPackageForQuote: SolarPackage | null;
  setSelectedPackageForQuote: (pkg: SolarPackage | null) => void;
  quoteModalOpen: boolean;
  setQuoteModalOpen: (open: boolean) => void;
  activeArticle: SolarArticle | null;
  setActiveArticle: (art: SolarArticle | null) => void;
  packageDetailModal: SolarPackage | null;
  setPackageDetailModal: (pkg: SolarPackage | null) => void;
  cmsModalOpen: boolean;
  setCmsModalOpen: (open: boolean) => void;
  legalModalType: string | null;
  setLegalModalType: (type: string | null) => void;
  activeDisplayAddress: string;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  openQuoteWithPackage: (pkg: SolarPackage) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bss_lang');
    return (saved === 'hi' || saved === 'mr' || saved === 'en') ? saved : 'en';
  });

  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(() => {
    const saved = localStorage.getItem('bss_business_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialBusinessSettings;
  });

  const [packages, setPackages] = useState<SolarPackage[]>(() => {
    const saved = localStorage.getItem('bss_packages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialPackages;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('bss_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  const [selectedPackageForQuote, setSelectedPackageForQuote] = useState<SolarPackage | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<SolarArticle | null>(null);
  const [packageDetailModal, setPackageDetailModal] = useState<SolarPackage | null>(null);
  const [cmsModalOpen, setCmsModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bss_lang', lang);
  };

  const updateBusinessSettings = (updated: Partial<BusinessSettings>) => {
    setBusinessSettings(prev => {
      const next = { ...prev, ...updated };
      localStorage.setItem('bss_business_settings', JSON.stringify(next));
      return next;
    });
  };

  const updatePackage = (id: string, updated: Partial<SolarPackage>) => {
    setPackages(prev => {
      const next = prev.map(p => (p.id === id ? { ...p, ...updated } : p));
      localStorage.setItem('bss_packages', JSON.stringify(next));
      return next;
    });
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'created_at' | 'status'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'New',
    };
    setLeads(prev => {
      const next = [newLead, ...prev];
      localStorage.setItem('bss_leads', JSON.stringify(next));
      return next;
    });
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const openQuoteWithPackage = (pkg: SolarPackage) => {
    setSelectedPackageForQuote(pkg);
    setQuoteModalOpen(true);
  };

  const activeDisplayAddress =
    businessSettings.approved_address_variant === '201'
      ? businessSettings.address_201
      : businessSettings.address_101;

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        businessSettings,
        updateBusinessSettings,
        packages,
        updatePackage,
        leads,
        addLead,
        selectedPackageForQuote,
        setSelectedPackageForQuote,
        quoteModalOpen,
        setQuoteModalOpen,
        activeArticle,
        setActiveArticle,
        packageDetailModal,
        setPackageDetailModal,
        cmsModalOpen,
        setCmsModalOpen,
        legalModalType,
        setLegalModalType,
        activeDisplayAddress,
        toast,
        showToast,
        openQuoteWithPackage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
