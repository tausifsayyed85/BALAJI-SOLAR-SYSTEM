import React from 'react';
import { useApp } from '../../context/AppContext';
import { SunMedium, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { t, setQuoteModalOpen } = useApp();

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white text-xs py-2 px-4 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <SunMedium className="w-3.5 h-3.5 shrink-0 text-amber-200 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="font-medium tracking-wide truncate">
            {t.announcement.text}
          </span>
        </div>
        <button
          onClick={() => setQuoteModalOpen(true)}
          className="shrink-0 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded transition-colors"
        >
          <span>{t.announcement.action}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
