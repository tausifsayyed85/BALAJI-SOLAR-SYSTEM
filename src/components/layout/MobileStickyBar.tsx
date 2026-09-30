import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MessageCircle, FileText } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const { businessSettings, language, setQuoteModalOpen } = useApp();

  const waMessages = {
    en: "Hello Balaji Solar Systems, I am interested in a rooftop solar system. Please help me with a quotation.",
    hi: "नमस्ते Balaji Solar Systems, मुझे रूफटॉप सोलर सिस्टम में रुचि है। कृपया मुझे कोटेशन के बारे में जानकारी दें।",
    mr: "नमस्कार Balaji Solar Systems, मला रूफटॉप सोलर सिस्टममध्ये स्वारस्य आहे. कृपया मला कोटेशनची माहिती द्या.",
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(waMessages[language]);
    window.open(`https://wa.me/91${businessSettings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 shadow-lg md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${businessSettings.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-bold transition-colors"
        >
          <Phone className="w-4 h-4 text-amber-600 mb-0.5" />
          <span>Call Now</span>
        </a>

        <button
          onClick={openWhatsApp}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors shadow-xs"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => setQuoteModalOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold transition-colors shadow-xs"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span>Get Quote</span>
        </button>
      </div>
    </div>
  );
};
