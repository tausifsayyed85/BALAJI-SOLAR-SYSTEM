import React, { useState } from 'react';

interface BalajiLogoProps {
  variant?: 'full' | 'icon' | 'footer' | 'monochrome' | 'loading';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BalajiLogo: React.FC<BalajiLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    sm: { icon: 36, text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 46, text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 58, text: 'text-xl', sub: 'text-xs' },
    xl: { icon: 78, text: 'text-2xl', sub: 'text-sm' },
  };

  const dim = sizeMap[size];

  // Official Logo downloaded from user's Google Drive link
  const OfficialLogoImage = (
    <div
      style={{ width: dim.icon, height: dim.icon }}
      className="relative shrink-0 rounded-xl overflow-hidden bg-white p-0.5 shadow-sm border border-amber-200/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
    >
      <img
        src="/logo.jpg"
        alt="Balaji Solar Systems Official Logo"
        onError={() => setImgError(true)}
        className="w-full h-full object-contain"
      />
    </div>
  );

  // High-fidelity fallback SVG if image fails or for special vector rendering
  const VectorFallback = (
    <svg
      width={dim.icon}
      height={dim.icon}
      viewBox="0 0 100 100"
      className="shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Balaji Solar Systems Crest"
    >
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="logoFlame" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="logoSun" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>

      <g fill="#DC2626" opacity="0.95">
        <path d="M 23 66 C 17 62 15 54 17 48 C 21 52 24 56 25 60 Z" />
        <path d="M 20 54 C 15 48 14 40 17 34 C 21 38 23 43 23 48 Z" />
        <path d="M 21 40 C 17 34 19 26 23 22 C 26 26 27 32 26 37 Z" />
        <path d="M 26 28 C 24 22 27 16 33 14 C 33 19 32 24 30 27 Z" />
        <path d="M 77 66 C 83 62 85 54 83 48 C 79 52 76 56 75 60 Z" />
        <path d="M 80 54 C 85 48 86 40 83 34 C 79 38 77 43 77 48 Z" />
        <path d="M 79 40 C 83 34 81 26 77 22 C 74 26 73 32 74 37 Z" />
        <path d="M 74 28 C 76 22 73 16 67 14 C 67 19 68 24 70 27 Z" />
      </g>

      <path
        d="M 30 24 C 30 68 38 80 50 80 C 62 80 70 68 70 24 C 65 26 62 38 62 48 C 62 67 57 72 50 72 C 43 72 38 67 38 48 C 38 38 35 26 30 24 Z"
        fill="url(#logoGold)"
      />
      <path d="M 28 73 C 38 86 62 86 72 73 C 67 79 33 79 28 73 Z" fill="#B45309" />
      <circle cx="50" cy="47" r="11" fill="url(#logoSun)" />
      <path
        d="M 50 18 C 45 28 44 37 46 45 C 47 38 49 33 50 28 C 51 33 53 38 54 45 C 56 37 55 28 50 18 Z"
        fill="url(#logoFlame)"
      />
      <line x1="50" y1="33" x2="50" y2="29" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="47" x2="34" y2="47" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="47" x2="66" y2="47" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
      <line x1="41" y1="39" x2="38" y2="36" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="59" y1="39" x2="62" y2="36" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="44,83 50,87 56,83 50,85" fill="#DC2626" />
    </svg>
  );

  const LogoMark = !imgError ? OfficialLogoImage : VectorFallback;

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoMark}</div>;
  }

  return (
    <div className={`group inline-flex items-center gap-3 ${className}`}>
      {LogoMark}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors uppercase ${
            variant === 'footer' ? 'text-white' : ''
          } ${dim.text}`}
          style={{ letterSpacing: '-0.03em' }}
        >
          BALAJI SOLAR
        </span>
        <span
          className={`font-bold tracking-widest uppercase mt-0.5 ${
            variant === 'footer' ? 'text-amber-400' : 'text-amber-600'
          } ${dim.sub}`}
          style={{ letterSpacing: '0.18em' }}
        >
          SYSTEMS
        </span>
      </div>
    </div>
  );
};
