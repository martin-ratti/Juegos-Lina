import React from 'react';
import { INK } from './geometry';

export const StoryEyes: React.FC<{
  lx: number;
  rx: number;
  y: number;
  r?: number;
  lashes?: boolean;
}> = ({ lx, rx, y, r = 6.5, lashes = false }) => (
  <g>
    {lashes && (
      <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d={`M${lx - r - 2} ${y - r + 2} L${lx - r - 5} ${y - r - 2}`} />
        <path d={`M${lx - r + 1} ${y - r} L${lx - r - 1} ${y - r - 4}`} />
        <path d={`M${rx + r + 2} ${y - r + 2} L${rx + r + 5} ${y - r - 2}`} />
        <path d={`M${rx + r - 1} ${y - r} L${rx + r + 1} ${y - r - 4}`} />
      </g>
    )}
    <ellipse cx={lx} cy={y} rx={r} ry={r * 1.15} fill={INK} />
    <ellipse cx={rx} cy={y} rx={r} ry={r * 1.15} fill={INK} />
    <circle cx={lx - r * 0.32} cy={y - r * 0.32} r={r * 0.38} fill="#FFFFFF" />
    <circle cx={lx + r * 0.25} cy={y + r * 0.3} r={r * 0.18} fill="#FFFFFF" />
    <circle cx={rx - r * 0.32} cy={y - r * 0.32} r={r * 0.38} fill="#FFFFFF" />
    <circle cx={rx + r * 0.25} cy={y + r * 0.3} r={r * 0.18} fill="#FFFFFF" />
  </g>
);

export const RosyCheeks: React.FC<{
  lx: number;
  rx: number;
  y: number;
  rxSize?: number;
  rySize?: number;
  color?: string;
}> = ({ lx, rx, y, rxSize = 8, rySize = 5, color = '#FF8FA3' }) => (
  <g opacity="0.65">
    <ellipse cx={lx} cy={y} rx={rxSize} ry={rySize} fill={color} />
    <ellipse cx={rx} cy={y} rx={rxSize} ry={rySize} fill={color} />
  </g>
);

export const PolkaBow: React.FC<{
  cx: number;
  cy: number;
  scale?: number;
  rotate?: number;
  color?: string;
  centerColor?: string;
}> = ({
  cx,
  cy,
  scale = 1,
  rotate = 0,
  color = '#F25C78',
  centerColor = '#FFBE3D',
}) => (
  <g transform={`translate(${cx}, ${cy}) rotate(${rotate}) scale(${scale})`}>
    <path
      d="M0 0 C-10 -12 -20 -10 -18 0 C-20 10 -10 12 0 0 Z"
      fill={color}
      stroke={INK}
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <path
      d="M0 0 C10 -12 20 -10 18 0 C20 10 10 12 0 0 Z"
      fill={color}
      stroke={INK}
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <circle cx="-10" cy="-2" r="2.2" fill="#FFFFFF" opacity="0.9" />
    <circle cx="10" cy="-2" r="2.2" fill="#FFFFFF" opacity="0.9" />
    <circle cx="0" cy="0" r="5" fill={centerColor} stroke={INK} strokeWidth="2.6" />
  </g>
);

export const FlowerEmblem: React.FC<{
  cx: number;
  cy: number;
  petalRadius?: number;
  petalColor?: string;
  centerColor?: string;
}> = ({
  cx,
  cy,
  petalRadius = 7,
  petalColor = '#FFFFFF',
  centerColor = '#FFBE3D',
}) => {
  const petals = Array.from({ length: 6 });
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      {petals.map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const px = Math.cos(angle) * (petalRadius * 1.15);
        const py = Math.sin(angle) * (petalRadius * 1.15);
        return (
          <circle
            key={i}
            cx={px}
            cy={py}
            r={petalRadius}
            fill={petalColor}
            stroke={INK}
            strokeWidth="2.2"
          />
        );
      })}
      <circle cx="0" cy="0" r={petalRadius * 0.9} fill={centerColor} stroke={INK} strokeWidth="2.4" />
    </g>
  );
};
