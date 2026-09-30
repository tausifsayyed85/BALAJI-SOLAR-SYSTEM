import React, { useState, useEffect } from 'react';

interface SectionMarker {
  id: string;
  label: string;
}

const sections: SectionMarker[] = [
  { id: 'hero', label: '01 Opening' },
  { id: 'intro', label: '02 Philosophy' },
  { id: 'featured-product', label: '03 Craft & Modules' },
  { id: 'stacking-cards', label: '04 Quoted Systems' },
  { id: 'calculator', label: '05 Calculator' },
  { id: 'process', label: '06 Installation' },
  { id: 'gallery', label: '07 Portfolio' },
  { id: 'faq', label: '08 Questions' },
  { id: 'contact', label: '09 Inquire' },
];

export const ScrollJourneyLine: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Identify active section
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Page scroll journey indicator"
      className="hidden 2xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-end pointer-events-none"
    >
      <div className="relative py-4 pr-1 pointer-events-auto flex flex-col items-end gap-5">
        {/* Vertical Track Line */}
        <div className="absolute right-[5px] top-0 bottom-0 w-[1.5px] bg-[#E8B7BE]/40 -z-10">
          <div
            className="w-full bg-[#4B202A] transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        {/* Section Markers */}
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group flex items-center gap-3 text-right focus:outline-none cursor-pointer"
              title={`Jump to ${sec.label}`}
            >
              {/* Floating Label on Hover or Active */}
              <span
                className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 text-[#4B202A] font-bold translate-x-0'
                    : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#9A8587]'
                }`}
              >
                {sec.label}
              </span>

              {/* Marker Glyphs */}
              <span
                className={`w-3 h-3 rounded-full border transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'border-[#4B202A] bg-[#4B202A] scale-125 shadow-xs'
                    : 'border-[#C98F9B] bg-[#FFFDFC] group-hover:border-[#4B202A]'
                }`}
              >
                {isActive && <span className="w-1 h-1 rounded-full bg-[#FFFDFC]" />}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
