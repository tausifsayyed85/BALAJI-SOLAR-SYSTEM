import React, { useState, useEffect } from 'react';
import { Sun, Zap, CheckCircle2 } from 'lucide-react';

interface JourneyStep {
  id: string;
  label: string;
  sectionId: string;
}

export const ScrollJourneyLine: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const steps: JourneyStep[] = [
    { id: '1', label: 'Sunlight Arrival', sectionId: 'home' },
    { id: '2', label: 'Local Engineering', sectionId: 'about' },
    { id: '3', label: 'Clean Economics', sectionId: 'why-solar' },
    { id: '4', label: 'Custom Solutions', sectionId: 'solutions' },
    { id: '5', label: 'Electrical Flow', sectionId: 'how-it-works' },
    { id: '6', label: 'Certified Equipment', sectionId: 'products' },
    { id: '7', label: 'Transparent Quotations', sectionId: 'packages' },
    { id: '8', label: 'Solar Calculator', sectionId: 'calculator' },
    { id: '9', label: 'Safety Architecture', sectionId: 'safety' },
    { id: '10', label: 'Installation Journey', sectionId: 'installation' },
    { id: '11', label: 'Project Portfolio', sectionId: 'projects' },
    { id: '12', label: 'Free Consultation', sectionId: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Detect current section in view
      const scrollPos = window.scrollY + 250;
      for (let i = steps.length - 1; i >= 0; i--) {
        const el = document.getElementById(steps[i].sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(steps[i].sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Slim Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200/50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-all duration-150 relative shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Glowing Energy Particle at line head */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_12px_#f59e0b] animate-ping opacity-75" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#ea580c]" />
        </div>
      </div>

      {/* Floating Desktop Scroll Journey Line (Subtle & Non-obstructive) */}
      <aside
        aria-label="Solar System Journey Progress"
        className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden 2xl:flex flex-col items-center py-4 px-2 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-lg pointer-events-auto transition-opacity duration-300"
      >
        <div className="text-[9px] font-extrabold uppercase tracking-widest text-amber-600 mb-3 writing-vertical rotate-180 flex items-center gap-1">
          <Sun className="w-3 h-3 text-amber-500" />
          <span>Solar Journey</span>
        </div>

        {/* Central Track Line */}
        <div className="relative w-1 h-64 bg-slate-200 rounded-full overflow-hidden my-1">
          {/* Active progress fill */}
          <div
            className="w-full bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600 transition-all duration-200"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        {/* Journey Step Dots */}
        <div className="absolute top-12 bottom-6 flex flex-col justify-between items-center pointer-events-none">
          {steps.map((st) => {
            const isActive = activeSection === st.sectionId;
            return (
              <button
                key={st.id}
                onClick={() => scrollTo(st.sectionId)}
                title={st.label}
                aria-label={`Jump to ${st.label}`}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center pointer-events-auto group relative ${
                  isActive
                    ? 'bg-amber-500 ring-4 ring-amber-400/30 scale-125 shadow-md shadow-amber-500/50'
                    : 'bg-white border-2 border-slate-300 hover:border-amber-400 hover:scale-110'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                )}

                {/* Hover Tooltip */}
                <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-[10px] font-mono font-bold text-slate-500 mt-3">
          {Math.round(scrollProgress)}%
        </div>
      </aside>
    </>
  );
};
