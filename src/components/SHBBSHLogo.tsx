import React from 'react';

interface SHBBSHLogoProps {
  className?: string;
  size?: number;
}

export const SHBBSHLogo: React.FC<SHBBSHLogoProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md transition-transform hover:scale-105 ${className}`}
      aria-label="Logo Zyrtare SHBBSH"
    >
      <defs>
        {/* Curved Text Paths for Top and Bottom Arcs */}
        <path id="topArcPath" d="M 28,100 A 72,72 0 1,1 172,100" />
        <path id="bottomArcPath" d="M 166,100 A 66,66 0 0,1 34,100" />

        {/* Outer Ring & Fill Gradients */}
        <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a1f38" />
          <stop offset="100%" stopColor="#0e2a4a" />
        </linearGradient>

        <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Outer White Base Disc */}
      <circle cx="100" cy="100" r="98" fill="#ffffff" />

      {/* Outer Dark Navy Border Circle */}
      <circle cx="100" cy="100" r="96" stroke="#0a1f38" strokeWidth="5" fill="none" />

      {/* Inner Dark Navy Ring Border */}
      <circle cx="100" cy="100" r="70" stroke="#0a1f38" strokeWidth="3" fill="none" />

      {/* --- Top Text Arc: SHOQATA E BIOLOGËVE DHE BIOTEKNOLOGËVE TË SHQIPËRISË --- */}
      <text fill="#0a1f38" fontSize="11" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.8 font-sans">
        <textPath href="#topArcPath" startOffset="50%" textAnchor="middle">
          SHOQATA E BIOLOGËVE DHE BIOTEKNOLOGËVE TË SHQIPËRISË
        </textPath>
      </text>

      {/* --- Separator Dots --- */}
      <circle cx="34" cy="118" r="3.5" fill="#0a1f38" />
      <circle cx="166" cy="118" r="3.5" fill="#0a1f38" />

      {/* --- Bottom Text Arc: SHBBSH --- */}
      <text fill="#0a1f38" fontSize="18" fontWeight="900" fontFamily="sans-serif" letterSpacing="3">
        <textPath href="#bottomArcPath" startOffset="50%" textAnchor="middle">
          SHBBSH
        </textPath>
      </text>

      {/* --- INNER EMBLEM (Yin-Yang Split Seal) --- */}
      <g transform="translate(100, 100) scale(0.66) translate(-100, -100)">
        
        {/* Outer Inner Circle Clipping Base */}
        <circle cx="100" cy="100" r="92" fill="#ffffff" />

        {/* LEFT HALF: Dark Navy Cell Biology Region */}
        <path
          d="M 100 8 C 151 8 192 49 192 100 C 192 151 151 192 100 192 C 70 192 60 160 60 130 C 60 90 100 110 100 70 C 100 30 100 8 100 8 Z"
          fill="#0a1f38"
        />

        {/* RIGHT HALF: Emerald Green Chemistry Region */}
        <path
          d="M 100 8 C 100 8 100 30 100 70 C 100 110 60 90 60 130 C 60 160 70 192 100 192 C 151 192 192 151 192 100 C 192 49 151 8 100 8 Z"
          fill="#0d9488"
        />

        {/* --- CELL BIOLOGY DETAILS (Left / Dark Half) --- */}
        {/* Cell Nucleus Ring & Core */}
        <circle cx="78" cy="72" r="22" stroke="#ffffff" strokeWidth="6" fill="none" />
        <circle cx="78" cy="72" r="11" fill="#ffffff" />
        
        {/* Endoplasmic Reticulum Curved Ribbons */}
        <path d="M 45 42 C 55 32, 75 32, 90 42" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 40 52 C 52 42, 72 42, 85 52" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none" />
        
        {/* Mitochondria & Vesicles */}
        <circle cx="48" cy="92" r="4.5" fill="#ffffff" />
        <circle cx="95" cy="40" r="5" fill="#ffffff" />

        {/* Green Cell Organelles inside Navy Region */}
        <circle cx="56" cy="116" r="10" stroke="#0d9488" strokeWidth="4" fill="none" />
        <path d="M 44 148 C 44 135, 62 135, 62 148 C 62 160, 44 160, 44 148 Z" fill="#0d9488" />
        <circle cx="75" cy="138" r="4" fill="#0d9488" />
        <circle cx="82" cy="160" r="5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />

        {/* --- MOLECULAR CHEMISTRY DETAILS (Right / Emerald Half) --- */}
        {/* Ball-and-Stick Molecular Bonds */}
        <line x1="140" y1="58" x2="162" y2="82" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        <line x1="162" y1="82" x2="148" y2="114" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        <line x1="148" y1="114" x2="118" y2="114" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        <line x1="148" y1="114" x2="168" y2="142" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        <line x1="118" y1="114" x2="104" y2="136" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />

        {/* White Molecular Atom Nodes */}
        <circle cx="140" cy="58" r="9" fill="#ffffff" />
        <circle cx="162" cy="82" r="9" fill="#ffffff" />
        <circle cx="148" cy="114" r="10" fill="#ffffff" />
        <circle cx="118" cy="114" r="8" fill="#ffffff" />
        <circle cx="168" cy="142" r="11" fill="#ffffff" />
        <circle cx="104" cy="136" r="8" fill="#ffffff" />

        {/* Green Ring Node Inside White Node */}
        <circle cx="140" cy="58" r="5" stroke="#0d9488" strokeWidth="2" fill="none" />

        {/* Lower Olive Green Bio-Molecule Ring */}
        <circle cx="126" cy="158" r="14" stroke="#ffffff" strokeWidth="5" fill="#84cc16" />

      </g>
    </svg>
  );
};
