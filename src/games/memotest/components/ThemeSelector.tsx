import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { Play } from 'lucide-react';
import { THEMES } from '../../../data/themes';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { useViewTransitionNavigate } from '../../../hooks/useViewTransitionNavigate';
import { WashiTape } from '../../../components/PlayroomDecor';

export const ThemeSelector: React.FC = () => {
  const navigate = useViewTransitionNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useKeyboard({
    containerRef,
    onEscape: () => navigate('/'),
    isActive: true,
  });

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-2 gap-3.5 sm:gap-6">
        {THEMES.map((theme) => {
          const previewCards = theme.cards.slice(0, 3);

          return (
            <button
              type="button"
              key={theme.id}
              data-kb-item
              onClick={() => navigate(`/memotest/jugar/${theme.id}`)}
              aria-label={`Jugar Memotest con tema ${theme.name}`}
              className={clsx(
                'toy-press group relative rounded-[1.75rem] sm:rounded-[2.25rem] border-4 border-white p-3.5 sm:p-6 flex flex-col sm:flex-row items-center sm:text-left text-center gap-2.5 sm:gap-6 cursor-pointer',
                theme.cardBg,
                theme.lipColor
              )}
            >
              <WashiTape
                color={
                  theme.id === 'mickey'
                    ? 'bg-[#F25C78]/75'
                    : theme.id === 'barbie'
                      ? 'bg-[#FFBE3D]/85'
                      : theme.id === 'princesas'
                        ? 'bg-[#5BC0EB]/80'
                        : 'bg-[#6BCB9F]/80'
                }
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-2"
              />

              {/* Abanico de 3 fotos */}
              <div
                className="relative w-28 h-22 sm:w-44 sm:h-32 shrink-0 flex items-center justify-center mt-1 sm:mt-0"
                aria-hidden="true"
              >
                {previewCards.map((card, i) => {
                  const pos = [
                    '-rotate-12 -translate-x-6 sm:-translate-x-10 translate-y-1.5 z-10',
                    'rotate-0 -translate-y-1 scale-108 z-20',
                    'rotate-12 translate-x-6 sm:translate-x-10 translate-y-1.5 z-10',
                  ];
                  const isPhoto = card.image.endsWith('.jpg');
                  return (
                    <div
                      key={card.image}
                      className={clsx(
                        'absolute w-12 h-15 sm:w-20 sm:h-24 rounded-xl sm:rounded-2xl bg-white p-1 border-2 sm:border-3 border-[#3D2645] shadow-[0_3px_0_rgba(61,38,69,0.18)] transition-transform duration-300 group-hover:scale-105',
                        pos[i]
                      )}
                    >
                      <img
                        src={card.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={clsx(
                          'w-full h-full rounded-md sm:rounded-lg',
                          isPhoto ? 'object-cover' : 'object-contain'
                        )}
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start gap-1.5 sm:gap-2">
                <h2 className="text-[clamp(1.2rem,1rem+1vw,1.95rem)] text-[#3D2645] leading-tight">
                  {theme.name}
                </h2>
                <p className="text-[#3D2645]/80 text-xs sm:text-base font-bold leading-snug">
                  {theme.description}
                </p>
                <span className="mt-0.5 inline-flex items-center gap-1.5 bg-[#3D2645] text-[#FFFDF9] font-bold text-xs sm:text-base px-4 sm:px-6 py-1.5 rounded-full">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" aria-hidden="true" />
                  <span>Jugar</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
