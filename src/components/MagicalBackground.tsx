import React from 'react';

interface MagicalBackgroundProps {
  variant?: 'fairy' | 'meadow';
}

export const MagicalBackground: React.FC<MagicalBackgroundProps> = ({ variant = 'fairy' }) => {
  const isMeadow = variant === 'meadow';

  return (
    <div
      data-magical-bg
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* Degradado base mágico */}
      <div className={isMeadow ? 'absolute inset-0 bg-magic-meadow' : 'absolute inset-0 bg-magic-fairy'} />

      {/* Halos pastel suaves */}
      <div
        className={
          isMeadow
            ? 'absolute -top-28 -left-24 w-80 h-80 sm:w-[30rem] sm:h-[30rem] rounded-full bg-[#FFBE3D]/25 blur-3xl'
            : 'absolute -top-28 -left-24 w-80 h-80 sm:w-[30rem] sm:h-[30rem] rounded-full bg-[#F25C78]/20 blur-3xl'
        }
      />
      <div
        className={
          isMeadow
            ? 'absolute top-1/3 -right-28 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-[#5BC0EB]/28 blur-3xl'
            : 'absolute top-1/4 -right-24 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-[#C8A2F6]/28 blur-3xl'
        }
      />
      <div
        className={
          isMeadow
            ? 'absolute -bottom-24 left-1/4 w-96 h-72 rounded-full bg-[#6BCB9F]/28 blur-3xl'
            : 'absolute -bottom-28 left-1/3 w-96 h-80 rounded-full bg-[#5BC0EB]/25 blur-3xl'
        }
      />

      {/* Nubecitas ilustradas esponjosas */}
      <svg
        viewBox="0 0 220 90"
        className="absolute top-16 left-[4%] w-32 sm:w-48 text-white/80 animate-float drop-shadow-xs"
      >
        <path
          fill="currentColor"
          d="M42 74h136c17 0 30-12 30-27 0-13-10-24-23-26-4-15-18-21-33-21-12 0-23 5-30 14-6-4-13-6-21-6-18 0-32 13-34 30-2-.3-4-.5-6-.5-15 0-27 11-27 24.5C14 67 26 74 42 74z"
        />
      </svg>

      <svg
        viewBox="0 0 220 90"
        className="absolute top-24 right-[5%] w-28 sm:w-44 text-white/75 animate-float drop-shadow-xs"
        style={{ animationDelay: '1.2s' }}
      >
        <path
          fill="currentColor"
          d="M42 74h136c17 0 30-12 30-27 0-13-10-24-23-26-4-15-18-21-33-21-12 0-23 5-30 14-6-4-13-6-21-6-18 0-32 13-34 30-2-.3-4-.5-6-.5-15 0-27 11-27 24.5C14 67 26 74 42 74z"
        />
      </svg>

      <svg
        viewBox="0 0 220 90"
        className="hidden sm:block absolute bottom-10 left-[12%] w-36 text-white/65 animate-float"
        style={{ animationDelay: '2.1s' }}
      >
        <path
          fill="currentColor"
          d="M42 74h136c17 0 30-12 30-27 0-13-10-24-23-26-4-15-18-21-33-21-12 0-23 5-30 14-6-4-13-6-21-6-18 0-32 13-34 30-2-.3-4-.5-6-.5-15 0-27 11-27 24.5C14 67 26 74 42 74z"
        />
      </svg>

      {/* Estrellitas brillantes suaves en las esquinas */}
      <svg
        viewBox="0 0 36 36"
        className="hidden sm:block absolute bottom-14 left-8 w-8 h-8 text-[#FFBE3D]/85 animate-wiggle"
      >
        <path
          fill="currentColor"
          d="M18 3.2l4.4 8.7 9.6 1.5-6.9 6.8 1.6 9.6L18 25.3l-8.7 4.5 1.6-9.6-6.9-6.8 9.6-1.5L18 3.2z"
        />
      </svg>

      <svg
        viewBox="0 0 36 36"
        className="hidden sm:block absolute bottom-16 right-10 w-9 h-9 text-[#F25C78]/65 animate-float"
        style={{ animationDelay: '0.7s' }}
      >
        <path
          fill="currentColor"
          d="M18 3.2l4.4 8.7 9.6 1.5-6.9 6.8 1.6 9.6L18 25.3l-8.7 4.5 1.6-9.6-6.9-6.8 9.6-1.5L18 3.2z"
        />
      </svg>

      <svg
        viewBox="0 0 36 36"
        className="hidden md:block absolute top-1/2 left-6 w-6 h-6 text-[#5BC0EB]/70 animate-wiggle"
        style={{ animationDelay: '1.4s' }}
      >
        <path
          fill="currentColor"
          d="M18 3.2l4.4 8.7 9.6 1.5-6.9 6.8 1.6 9.6L18 25.3l-8.7 4.5 1.6-9.6-6.9-6.8 9.6-1.5L18 3.2z"
        />
      </svg>
    </div>
  );
};
