import React, { useEffect, useState } from 'react';
import { BalajiLogo } from '../brand/BalajiLogo';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 350);
    }, 1100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-300 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center p-8">
        {/* Animated Sun Glow behind Logo */}
        <div className="absolute w-36 h-36 rounded-full bg-amber-100/60 blur-2xl animate-pulse" />

        {/* Central Logo */}
        <div className="relative z-10 scale-125 mb-8">
          <BalajiLogo size="lg" />
        </div>

        {/* Technical Solar Grid lines illuminating */}
        <div className="relative w-48 h-8 flex items-center justify-between gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md shadow-inner overflow-hidden mb-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full bg-slate-200 rounded-sm overflow-hidden"
            >
              <div
                className="w-full h-full bg-gradient-to-t from-amber-500 to-amber-300 transition-all duration-700 ease-out"
                style={{
                  animation: `pulseSubtle 1s ease-in-out infinite alternate`,
                  animationDelay: `${i * 120}ms`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Microcopy */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest animate-pulse">
          Generating Clean Experiences...
        </p>
      </div>
    </div>
  );
};
