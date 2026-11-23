import React, { useRef } from 'react';
import { Play } from 'lucide-react';
import { useKeyboard } from '../hooks/useKeyboard';
import { useViewTransitionNavigate } from '../hooks/useViewTransitionNavigate';
import { StorybookStar, WashiTape } from './PlayroomDecor';
import { LEVEL_1_MODELS } from '../games/rompecabezas/data/modelsLevel1';
import { LEVEL_2_MODELS } from '../games/rompecabezas/data/modelsLevel2';
import { PuzzlePreview } from '../games/rompecabezas/components/PuzzlePreview';

const MemotestArt: React.FC = () => (
  <div
    className="relative w-56 h-32 sm:w-72 sm:h-44 flex items-center justify-center"
    aria-hidden="true"
  >
    <div className="absolute -translate-x-14 sm:-translate-x-18 translate-y-2 -rotate-12 w-20 h-24 sm:w-26 sm:h-32 rounded-2xl bg-white p-1.5 border-3 border-[#3D2645] shadow-[0_4px_0_rgba(61,38,69,0.16)]">
      <img src="/images/barbie/1.png" alt="" className="w-full h-full object-contain rounded-lg" draggable={false} />
    </div>
    <div className="absolute translate-x-14 sm:translate-x-18 translate-y-2 rotate-12 w-20 h-24 sm:w-26 sm:h-32 rounded-2xl bg-white p-1.5 border-3 border-[#3D2645] shadow-[0_4px_0_rgba(61,38,69,0.16)]">
      <img src="/images/princesas/1.png" alt="" className="w-full h-full object-contain rounded-lg" draggable={false} />
    </div>
    <div className="relative z-10 w-22 h-26 sm:w-28 sm:h-34 rounded-2xl bg-white p-1.5 border-3 border-[#3D2645] shadow-[0_5px_0_rgba(61,38,69,0.2)]">
      <img src="/images/mickey/1.png" alt="" className="w-full h-full object-contain rounded-lg" draggable={false} />
    </div>
    <StorybookStar filled className="absolute top-0 left-3 sm:left-4 w-7 h-7 sm:w-8 sm:h-8 -rotate-12 z-20" />
    <StorybookStar filled className="absolute bottom-0 right-3 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rotate-12 z-20" />
  </div>
);

const RompecabezasArt: React.FC = () => {
  const perrito = LEVEL_1_MODELS[0];
  const unicornio = LEVEL_2_MODELS[1];

  return (
    <div
      className="relative w-56 h-32 sm:w-72 sm:h-44 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute -translate-x-12 sm:-translate-x-16 translate-y-1 -rotate-6 w-26 h-28 sm:w-34 sm:h-36 rounded-[1.5rem] bg-[#FCEBD4] border-3 border-[#3D2645] shadow-[0_4px_0_#CFA36E] p-1.5 sm:p-2">
        <PuzzlePreview model={unicornio} className="w-full h-full overflow-visible" />
      </div>
      <div className="relative z-10 translate-x-11 sm:translate-x-14 rotate-6 w-28 h-30 sm:w-36 sm:h-38 rounded-[1.5rem] bg-[#FFFDF9] border-3 border-[#3D2645] shadow-[0_5px_0_#CFA36E] p-1.5 sm:p-2">
        <PuzzlePreview model={perrito} className="w-full h-full overflow-visible" />
      </div>
      <StorybookStar filled className="absolute top-0 right-4 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rotate-12 z-20" />
    </div>
  );
};

export const GameSelector: React.FC = () => {
  const navigate = useViewTransitionNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useKeyboard({
    containerRef,
    isActive: true,
  });

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Tarjeta Memotest */}
        <button
          type="button"
          data-kb-item
          onClick={() => navigate('/memotest')}
          aria-label="Jugar Memotest: Encontrá los dibujos iguales"
          className="toy-press group relative rounded-[2rem] sm:rounded-[2.5rem] bg-[#FFE5EC] border-4 border-white shadow-[0_8px_0_#E05270,0_16px_28px_rgba(61,38,69,0.12)] p-5 sm:p-8 lg:p-10 flex flex-col items-center justify-between gap-4 sm:gap-5 cursor-pointer text-center"
        >
          <WashiTape color="bg-[#FFBE3D]/85" className="absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-2" />

          <div className="transition-transform duration-300 group-hover:scale-105">
            <MemotestArt />
          </div>

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-[clamp(1.75rem,1.25rem+1.8vw,2.75rem)] text-[#3D2645]">Memotest</h2>
            <p className="text-[#3D2645]/85 text-sm sm:text-lg font-bold">
              Encontrá los dibujos iguales
            </p>
          </div>

          <span className="inline-flex items-center gap-2 bg-[#F25C78] text-white font-bold text-base sm:text-xl px-8 py-2.5 rounded-full border-3 border-[#3D2645] shadow-[0_4px_0_#C93B58]">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" aria-hidden="true" />
            <span>Jugar</span>
          </span>
        </button>

        {/* Tarjeta Rompecabezas */}
        <button
          type="button"
          data-kb-item
          onClick={() => navigate('/rompecabezas')}
          aria-label="Jugar Rompecabezas: Armá perritos, gatitos y más"
          className="toy-press group relative rounded-[2rem] sm:rounded-[2.5rem] bg-[#E2F5FF] border-4 border-white shadow-[0_8px_0_#3AA0CC,0_16px_28px_rgba(61,38,69,0.12)] p-5 sm:p-8 lg:p-10 flex flex-col items-center justify-between gap-4 sm:gap-5 cursor-pointer text-center"
        >
          <WashiTape color="bg-[#6BCB9F]/85" className="absolute -top-2.5 left-1/2 -translate-x-1/2 rotate-2" />

          <div className="transition-transform duration-300 group-hover:scale-105">
            <RompecabezasArt />
          </div>

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-[clamp(1.75rem,1.25rem+1.8vw,2.75rem)] text-[#3D2645]">Rompecabezas</h2>
            <p className="text-[#3D2645]/85 text-sm sm:text-lg font-bold">
              Armá perritos, gatitos y más
            </p>
          </div>

          <span className="inline-flex items-center gap-2 bg-[#2E92BD] text-white font-bold text-base sm:text-xl px-8 py-2.5 rounded-full border-3 border-[#3D2645] shadow-[0_4px_0_#1D6A8C]">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" aria-hidden="true" />
            <span>Jugar</span>
          </span>
        </button>
      </div>
    </div>
  );
};
