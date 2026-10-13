import React from 'react';
import type { PieceId } from '../types';

export const SvgHair: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Base Hair Top */}
    <path d="M 20 40 Q 15 15 50 15 Q 85 15 80 40 Q 50 30 20 40 Z" fill="#6B4423" />
    {/* Pigtails / Colitas */}
    <circle cx="15" cy="35" r="12" fill="#6B4423" />
    <circle cx="85" cy="35" r="12" fill="#6B4423" />
    {/* Bows / Moños */}
    <path d="M 0 30 L 20 30 L 10 40 Z" fill="#FF9EBB" />
    <path d="M 80 30 L 100 30 L 90 40 Z" fill="#FF9EBB" />
    <path d="M 0 40 L 20 40 L 10 30 Z" fill="#FF9EBB" />
    <path d="M 80 40 L 100 40 L 90 30 Z" fill="#FF9EBB" />
    {/* Bangs */}
    <path d="M 20 40 Q 30 20 50 25 Q 70 20 80 40 Q 50 30 20 40 Z" fill="#8B5A2B" />
  </svg>
);

export const SvgHead: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Ears */}
    <circle cx="15" cy="55" r="8" fill="#FFCBA4" />
    <circle cx="85" cy="55" r="8" fill="#FFCBA4" />
    {/* Inner ears */}
    <circle cx="15" cy="55" r="4" fill="#E8A598" />
    <circle cx="85" cy="55" r="4" fill="#E8A598" />
    {/* Face */}
    <rect x="20" y="20" width="60" height="70" rx="30" fill="#FFD3B6" />
    {/* Big cute eyes */}
    <circle cx="35" cy="55" r="7" fill="#4A3018" />
    <circle cx="65" cy="55" r="7" fill="#4A3018" />
    {/* Sparkles */}
    <circle cx="33" cy="53" r="2.5" fill="#FFF" />
    <circle cx="36" cy="56" r="1" fill="#FFF" />
    <circle cx="63" cy="53" r="2.5" fill="#FFF" />
    <circle cx="66" cy="56" r="1" fill="#FFF" />
    {/* Blush */}
    <ellipse cx="25" cy="65" rx="6" ry="4" fill="#FF9EBB" opacity="0.6" />
    <ellipse cx="75" cy="65" rx="6" ry="4" fill="#FF9EBB" opacity="0.6" />
    {/* Cute nose */}
    <path d="M 48 62 Q 50 65 52 62" fill="transparent" stroke="#E8A598" strokeWidth="2" strokeLinecap="round" />
    {/* Happy Smile */}
    <path d="M 40 70 Q 50 80 60 70" fill="transparent" stroke="#4A3018" strokeWidth="3" strokeLinecap="round" />
    <path d="M 45 74 Q 50 78 55 74" fill="#FF9EBB" />
  </svg>
);

export const SvgTorso: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Neck */}
    <rect x="40" y="0" width="20" height="20" fill="#FFCBA4" rx="5" />
    {/* Shadow under neck */}
    <rect x="40" y="15" width="20" height="5" fill="#E8A598" />
    {/* Hoodie / Shirt */}
    <path d="M 25 15 L 75 15 Q 95 20 90 40 L 85 90 Q 80 100 50 100 Q 20 100 15 90 L 10 40 Q 5 20 25 15 Z" fill="#E1BEE7" />
    {/* Hoodie pocket */}
    <path d="M 30 60 L 70 60 L 80 90 L 20 90 Z" fill="#CE93D8" rx="5" />
    {/* Hoodie strings */}
    <path d="M 45 20 L 45 40" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M 55 20 L 55 40" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    <circle cx="45" cy="40" r="2" fill="#FFF" />
    <circle cx="55" cy="40" r="2" fill="#FFF" />
    {/* Collar */}
    <path d="M 35 15 Q 50 30 65 15" fill="#CE93D8" />
  </svg>
);

export const SvgArmLeft: React.FC = () => (
  <svg viewBox="0 0 50 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Hand */}
    <circle cx="25" cy="85" r="16" fill="#FFD3B6" />
    {/* Fingers */}
    <circle cx="12" cy="80" r="5" fill="#FFCBA4" />
    <circle cx="15" cy="92" r="5" fill="#FFCBA4" />
    {/* Sleeve */}
    <path d="M 40 5 L 15 15 Q 5 40 10 70 L 40 75 Q 50 40 40 5 Z" fill="#E1BEE7" />
    <path d="M 10 70 L 40 75 L 42 65 L 12 60 Z" fill="#CE93D8" />
  </svg>
);

export const SvgArmRight: React.FC = () => (
  <svg viewBox="0 0 50 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Hand */}
    <circle cx="25" cy="85" r="16" fill="#FFD3B6" />
    {/* Fingers */}
    <circle cx="38" cy="80" r="5" fill="#FFCBA4" />
    <circle cx="35" cy="92" r="5" fill="#FFCBA4" />
    {/* Sleeve */}
    <path d="M 10 5 L 35 15 Q 45 40 40 70 L 10 75 Q 0 40 10 5 Z" fill="#E1BEE7" />
    <path d="M 40 70 L 10 75 L 8 65 L 38 60 Z" fill="#CE93D8" />
  </svg>
);

export const SvgLegLeft: React.FC = () => (
  <svg viewBox="0 0 60 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Leg */}
    <rect x="22" y="30" width="20" height="50" fill="#FFD3B6" />
    {/* Shorts */}
    <path d="M 15 0 L 50 0 L 48 40 Q 32 45 18 40 Z" fill="#45B7D1" />
    {/* Sock */}
    <rect x="22" y="70" width="20" height="15" fill="#FFF" />
    <rect x="22" y="72" width="20" height="3" fill="#FF9EBB" />
    <rect x="22" y="78" width="20" height="3" fill="#FF9EBB" />
    {/* Shoe */}
    <path d="M 10 85 Q 10 100 32 100 Q 55 100 50 85 Q 45 75 32 75 Q 10 75 10 85 Z" fill="#9C27B0" />
    <path d="M 15 100 L 45 100" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const SvgLegRight: React.FC = () => (
  <svg viewBox="0 0 60 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Leg */}
    <rect x="18" y="30" width="20" height="50" fill="#FFD3B6" />
    {/* Shorts */}
    <path d="M 10 0 L 45 0 L 42 40 Q 28 45 12 40 Z" fill="#45B7D1" />
    {/* Cute Patch on Right Short */}
    <rect x="15" y="20" width="12" height="12" rx="2" fill="#FF9EBB" transform="rotate(-10 20 25)" />
    <path d="M 17 22 L 25 22 M 17 26 L 25 26" stroke="#FFF" strokeWidth="1" />
    {/* Sock */}
    <rect x="18" y="70" width="20" height="15" fill="#FFF" />
    <rect x="18" y="72" width="20" height="3" fill="#45B7D1" />
    <rect x="18" y="78" width="20" height="3" fill="#45B7D1" />
    {/* Shoe with Star */}
    <path d="M 10 85 Q 5 100 28 100 Q 50 100 50 85 Q 50 75 28 75 Q 15 75 10 85 Z" fill="#9C27B0" />
    <path d="M 15 100 L 45 100" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
    <path d="M 28 85 L 30 90 L 35 90 L 31 93 L 33 98 L 28 95 L 23 98 L 25 93 L 21 90 L 26 90 Z" fill="#FFF" />
  </svg>
);

export const PieceRenderer: React.FC<{ id: PieceId }> = ({ id }) => {
  switch (id) {
    case 'hair': return <SvgHair />;
    case 'head': return <SvgHead />;
    case 'torso': return <SvgTorso />;
    case 'leftArm': return <SvgArmLeft />;
    case 'rightArm': return <SvgArmRight />;
    case 'leftLeg': return <SvgLegLeft />;
    case 'rightLeg': return <SvgLegRight />;
    default: return null;
  }
};
