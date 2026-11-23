import React from 'react';
import { GameSelector } from '../components/GameSelector';
import { MagicalBackground } from '../components/MagicalBackground';
import { PlayroomBunting, ScallopedMedallion } from '../components/PlayroomDecor';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Home: React.FC = () => {
  useDocumentTitle('Juegos de Lina');

  return (
    <div className="min-h-dvh flex flex-col pb-[max(1rem,env(safe-area-inset-bottom,0px))] relative">
      <MagicalBackground variant="fairy" />
      <PlayroomBunting />

      <header className="text-center px-3 sm:px-6 pt-5 sm:pt-7 mb-3 sm:mb-5 flex flex-col items-center">
        <ScallopedMedallion src="/images/lina.jpg" alt="Lina" showCrown size="md" />

        <h1
          tabIndex={-1}
          className="sticker-title text-[clamp(2rem,1.4rem+3vw,3.75rem)] text-[#F25C78] mt-1.5 sm:mt-2 outline-none"
        >
          ¡Hola, Lina!
        </h1>

        <p className="mt-1 sm:mt-1.5 inline-block bg-[#FFFDF9] border-2 sm:border-3 border-[#E8D4B8] shadow-[0_3px_0_#DFC7A7] px-5 py-1 rounded-full text-[clamp(1rem,0.9rem+0.5vw,1.3rem)] text-[#3D2645]">
          ¿A qué querés jugar?
        </p>
      </header>

      <main className="w-full flex-1 flex items-center justify-center px-3 sm:px-6 py-2 sm:py-4">
        <GameSelector />
      </main>
    </div>
  );
};
