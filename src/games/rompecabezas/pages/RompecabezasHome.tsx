import React, { useMemo, useRef } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { clsx } from 'clsx';
import { MagicalBackground } from '../../../components/MagicalBackground';
import { PlayroomBunting, StorybookStar, WashiTape } from '../../../components/PlayroomDecor';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { useViewTransitionNavigate } from '../../../hooks/useViewTransitionNavigate';
import { PUZZLE_LEVELS, PUZZLE_MODELS } from '../data/puzzles';
import { getCompletedPuzzles } from '../utils/progress';
import { PuzzlePreview } from '../components/PuzzlePreview';

export const RompecabezasHome: React.FC = () => {
  const navigate = useViewTransitionNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const completedIds = useMemo(() => getCompletedPuzzles(), []);

  useDocumentTitle('Rompecabezas · Juegos de Lina');

  useKeyboard({
    containerRef,
    onEscape: () => navigate('/'),
    isActive: true,
  });

  return (
    <div className="min-h-dvh flex flex-col pb-[max(1rem,env(safe-area-inset-bottom,0px))] relative">
      <MagicalBackground variant="meadow" />
      <PlayroomBunting />

      <div className="w-full max-w-5xl mx-auto px-2.5 sm:px-5 flex items-center justify-between mt-1 mb-2">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Volver al menú principal"
          className="toy-press flex items-center gap-2 px-4 py-2 bg-[#FFFDF9] text-[#3D2645] rounded-full font-bold border-3 border-[#E8D4B8] shadow-[0_4px_0_#D8BE9C] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span>Atrás</span>
        </button>
      </div>

      <header className="text-center px-2.5 sm:px-5 mb-3 sm:mb-4">
        <h1
          tabIndex={-1}
          className="sticker-title text-[clamp(2rem,1.4rem+3vw,3.75rem)] text-[#2E92BD] outline-none"
        >
          Rompecabezas
        </h1>
        <p className="mt-1.5 inline-block bg-[#FFFDF9] border-2 border-[#E8D4B8] px-5 py-1 rounded-full text-[clamp(0.95rem,0.85rem+0.5vw,1.25rem)] text-[#3D2645] shadow-xs">
          Elegí qué querés armar
        </p>
      </header>

      <main
        ref={containerRef}
        className="w-full max-w-5xl mx-auto px-2.5 sm:px-5 flex-1 flex flex-col justify-center space-y-4 sm:space-y-5"
      >
        {PUZZLE_LEVELS.map((group) => {
          const models = PUZZLE_MODELS.filter((m) => m.level === group.level);

          return (
            <section key={group.level} aria-labelledby={`level-heading-${group.level}`}>
              <div className="flex flex-wrap items-center justify-center text-center gap-2.5 mb-2 sm:mb-2.5">
                <span
                  className={clsx(
                    'px-3.5 py-0.5 rounded-full text-sm sm:text-base font-bold border-2 border-[#3D2645]',
                    group.badgeColor
                  )}
                >
                  {group.title}
                </span>
                <h2
                  id={`level-heading-${group.level}`}
                  className="text-lg sm:text-2xl text-[#3D2645]"
                >
                  {group.subtitle}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3.5 sm:gap-6">
                {models.map((model) => {
                  const isDone = completedIds.includes(model.id);

                  return (
                    <button
                      key={model.id}
                      type="button"
                      data-kb-item
                      onClick={() => navigate(`/rompecabezas/jugar/${model.id}`)}
                      aria-label={`Armar ${model.name}, ${model.pieces.length} piezas`}
                      className={clsx(
                        'toy-press group relative rounded-[1.75rem] sm:rounded-[2rem] border-4 border-white p-3 sm:px-5 sm:py-3.5 text-center sm:text-left flex flex-col sm:flex-row items-center gap-2 sm:gap-5 cursor-pointer',
                        model.cardBg,
                        model.lipClass
                      )}
                    >
                      <WashiTape
                        color={
                          group.level === 1
                            ? 'bg-[#6BCB9F]/70'
                            : group.level === 2
                              ? 'bg-[#5BC0EB]/70'
                              : 'bg-[#FFBE3D]/80'
                        }
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-2"
                      />

                      {isDone && (
                        <div
                          className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-[#FFFDF9] border-2 border-[#3D2645] rounded-full px-2 py-0.5 shadow-xs z-10"
                          title="¡Completado!"
                        >
                          <StorybookStar filled className="w-4 h-4" />
                          <span className="hidden sm:inline text-xs font-bold text-[#3D2645]">
                            ¡Listo!
                          </span>
                        </div>
                      )}

                      <div className="w-24 h-26 sm:w-28 sm:h-30 shrink-0 rounded-[1.25rem] bg-[#FFFDF9] border-3 border-[#F0DFC8] p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 mt-1 sm:mt-0">
                        <PuzzlePreview model={model} className="w-full h-full overflow-visible" />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start gap-1 sm:gap-1.5">
                        <h3 className="text-[clamp(1.1rem,0.95rem+0.85vw,1.65rem)] text-[#3D2645] leading-tight">
                          {model.name}
                        </h3>
                        <span className="inline-block bg-[#FFFDF9]/90 border-2 border-[#3D2645]/15 text-[#3D2645] text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-full">
                          {model.pieces.length} piezas
                        </span>
                        <span className="mt-0.5 inline-flex items-center gap-1.5 bg-[#3D2645] text-[#FFFDF9] text-xs sm:text-base font-bold px-4 sm:px-5 py-1 sm:py-1.5 rounded-full">
                          <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                          <span>Armar</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};
