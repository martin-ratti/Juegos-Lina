import React, { useId } from 'react';
import { clsx } from 'clsx';

const BUNTING_COLORS = ['#F25C78', '#FFBE3D', '#5BC0EB', '#6BCB9F', '#C8A2F6'];

export const PlayroomBunting: React.FC<{
  className?: string;
  variant?: 'page' | 'card';
}> = ({ className, variant = 'page' }) => {
  if (variant === 'card') {
    const cardFlags = Array.from({ length: 9 });

    return (
      <div
        aria-hidden="true"
        className={clsx('w-full pointer-events-none select-none', className)}
      >
        <svg
          data-bunting-svg="card"
          viewBox="0 0 600 58"
          className="w-full h-auto block overflow-visible"
        >
          <path
            d="M-6 3 Q300 22 606 3"
            fill="none"
            stroke="#3D2645"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {cardFlags.map((_, i) => {
            const t = (i + 0.5) / cardFlags.length;
            const x = t * 560 + 20;
            const y = (1 - t) * (1 - t) * 3 + 2 * (1 - t) * t * 22 + t * t * 3;
            const color = BUNTING_COLORS[i % BUNTING_COLORS.length];
            const tilt = (t - 0.5) * -12;

            return (
              <g
                key={i}
                transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${tilt.toFixed(1)})`}
              >
                <path
                  d="M-21 0 L21 0 L2 31 Q0 34.5 -2 31 Z"
                  fill={color}
                  stroke="#3D2645"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M-13 5 L13 5 L0 25 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeDasharray="3 3"
                  opacity="0.85"
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  const swags = 10;
  const swagWidth = 480;
  const flagsPerSwag = 7;

  return (
    <div
      aria-hidden="true"
      className={clsx('w-full pointer-events-none select-none overflow-x-clip', className)}
    >
      <svg
        data-bunting-svg="page"
        viewBox="0 0 4800 68"
        className="w-full h-10 sm:h-13 2xl:h-14 block overflow-visible"
        preserveAspectRatio="xMidYMin slice"
      >
        {Array.from({ length: swags }).map((_, swagIdx) => {
          const x0 = swagIdx * swagWidth;
          const x1 = x0 + swagWidth;

          return (
            <g key={swagIdx}>
              <path
                d={`M${x0} 4 Q${x0 + swagWidth / 2} 22 ${x1} 4`}
                fill="none"
                stroke="#3D2645"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {Array.from({ length: flagsPerSwag }).map((__, flagIdx) => {
                const t = (flagIdx + 0.5) / flagsPerSwag;
                const x = x0 + t * swagWidth;
                const y = (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * 22 + t * t * 4;
                const color =
                  BUNTING_COLORS[(swagIdx * flagsPerSwag + flagIdx) % BUNTING_COLORS.length];
                const tilt = (t - 0.5) * -10;

                return (
                  <g
                    key={flagIdx}
                    transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${tilt.toFixed(1)})`}
                  >
                    <path
                      d="M-21 0 L21 0 L2.2 33 Q0 36.5 -2.2 33 Z"
                      fill={color}
                      stroke="#3D2645"
                      strokeWidth="2.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M-13.5 5 L13.5 5 L0 26.5 Z"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeDasharray="3 3"
                      opacity="0.88"
                    />
                  </g>
                );
              })}
              <circle
                cx={x0}
                cy="4"
                r="4.5"
                fill="#FFBE3D"
                stroke="#3D2645"
                strokeWidth="2.4"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

interface ScallopedMedallionProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'card';
  showCrown?: boolean;
  className?: string;
}

function buildScallopPolygon(cx: number, cy: number, rBase: number, lobes: number): string {
  const parts: string[] = [];
  for (let i = 0; i < lobes; i++) {
    const a1 = (i / lobes) * Math.PI * 2;
    const aMid = ((i + 0.5) / lobes) * Math.PI * 2;
    const a2 = ((i + 1) / lobes) * Math.PI * 2;
    const x1 = cx + Math.cos(a1) * rBase;
    const y1 = cy + Math.sin(a1) * rBase;
    const xCtrl = cx + Math.cos(aMid) * (rBase + 8.5);
    const yCtrl = cy + Math.sin(aMid) * (rBase + 8.5);
    const x2 = cx + Math.cos(a2) * rBase;
    const y2 = cy + Math.sin(a2) * rBase;
    if (i === 0) parts.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}`);
    parts.push(`Q${xCtrl.toFixed(1)} ${yCtrl.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
  }
  return parts.join(' ') + 'Z';
}

const SCALLOP_PATH = buildScallopPolygon(60, 60, 48, 12);

export const ScallopedMedallion: React.FC<ScallopedMedallionProps> = ({
  src,
  alt,
  size = 'md',
  showCrown = false,
  className,
}) => {
  const clipId = useId();
  const sizeClass =
    size === 'card'
      ? 'w-[78%] max-w-[118px] aspect-square'
      : size === 'lg'
        ? 'w-20 h-20 sm:w-26 sm:h-26'
        : size === 'md'
          ? 'w-16 h-16 sm:w-20 sm:h-20'
          : 'w-14 h-14 sm:w-16 sm:h-16';

  return (
    <div className={clsx('relative inline-block shrink-0', sizeClass, className)}>
      <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible drop-shadow-[0_4px_0_rgba(61,38,69,0.16)]">
        <defs>
          <clipPath id={clipId}>
            <circle cx="60" cy="60" r="41" />
          </clipPath>
        </defs>
        <path d={SCALLOP_PATH} fill="#FFFFFF" stroke="#3D2645" strokeWidth="3.5" />
        <circle cx="60" cy="60" r="43" fill="#FFBE3D" />
        <image
          href={src}
          x="19"
          y="19"
          width="82"
          height="82"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
        <circle cx="60" cy="60" r="41" fill="none" stroke="#3D2645" strokeWidth="2.8" />
        {/* Accessibility alt fallback for screen readers if non-empty */}
        {alt && <title>{alt}</title>}
      </svg>

      {showCrown && (
        <svg
          data-crown-svg
          aria-hidden="true"
          viewBox="0 0 44 34"
          className="absolute -top-4 -right-2 w-9 h-7 sm:w-10 sm:h-8 rotate-12 drop-shadow-xs"
        >
          <path
            d="M5 27 L3 9 L14 17 L22 4 L30 17 L41 9 L39 27 Z"
            fill="#FFBE3D"
            stroke="#3D2645"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle cx="22" cy="4" r="2.6" fill="#F25C78" stroke="#3D2645" strokeWidth="1.8" />
          <circle cx="3" cy="9" r="2.3" fill="#5BC0EB" stroke="#3D2645" strokeWidth="1.8" />
          <circle cx="41" cy="9" r="2.3" fill="#6BCB9F" stroke="#3D2645" strokeWidth="1.8" />
        </svg>
      )}
    </div>
  );
};

export const StorybookStar: React.FC<{ filled?: boolean; className?: string }> = ({
  filled = false,
  className = 'w-5 h-5',
}) => (
  <svg aria-hidden="true" viewBox="0 0 36 36" className={className}>
    <path
      d="M18 3.2l4.4 8.7 9.6 1.5-6.9 6.8 1.6 9.6L18 25.3l-8.7 4.5 1.6-9.6-6.9-6.8 9.6-1.5L18 3.2z"
      fill={filled ? '#FFBE3D' : '#F2E4CE'}
      stroke="#3D2645"
      strokeWidth="2.6"
      strokeLinejoin="round"
    />
    {filled && (
      <path
        d="M14.5 11.5l1.6-3.2"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
    )}
  </svg>
);

export const WashiTape: React.FC<{ color?: string; className?: string }> = ({
  color = 'bg-[#FFBE3D]/80',
  className,
}) => (
  <div
    aria-hidden="true"
    className={clsx(
      'w-16 h-4 sm:w-20 sm:h-5 rounded-sm border border-[#3D2645]/15 shadow-xs pointer-events-none',
      color,
      className
    )}
  />
);
