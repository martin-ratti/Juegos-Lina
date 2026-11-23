import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ThemeSelector } from '../components/ThemeSelector';
import { MagicalBackground } from '../../../components/MagicalBackground';
import { PlayroomBunting } from '../../../components/PlayroomDecor';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { useViewTransitionNavigate } from '../../../hooks/useViewTransitionNavigate';

export const MemoHome: React.FC = () => {
  const navigate = useViewTransitionNavigate();
  useDocumentTitle('Memotest · Juegos de Lina');

  return (
    <div className="min-h-dvh flex flex-col pb-[max(1rem,env(safe-area-inset-bottom,0px))] relative">
      <MagicalBackground variant="fairy" />
      <PlayroomBunting />

      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 flex items-center justify-between mt-1 mb-2">
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

      <header className="text-center px-3 sm:px-6 mb-3 sm:mb-5">
        <h1
          tabIndex={-1}
          className="sticker-title text-[clamp(2rem,1.4rem+3vw,3.75rem)] text-[#F25C78] outline-none"
        >
          Memotest
        </h1>
        <p className="mt-1.5 inline-block bg-[#FFFDF9] border-2 border-[#E8D4B8] px-5 py-1 rounded-full text-[clamp(0.95rem,0.85rem+0.5vw,1.25rem)] text-[#3D2645] shadow-xs">
          Elegí tus dibujos favoritos
        </p>
      </header>

      <main className="w-full flex-1 flex items-center justify-center px-3 sm:px-6 py-2 sm:py-4">
        <ThemeSelector />
      </main>
    </div>
  );
};
