import { GameSelector } from '../components/GameSelector';
import { Sparkles, Gamepad2 } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-dvh flex flex-col items-center pt-8 sm:pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Title section */}
      <div className="text-center mb-4 sm:mb-6 relative animate-slide-up">
        <Sparkles className="absolute -top-3 -left-4 sm:-top-4 sm:-left-6 w-7 h-7 sm:w-10 sm:h-10 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute -top-1 -right-4 sm:-top-2 sm:-right-6 w-6 h-6 sm:w-8 sm:h-8 text-pink-400 animate-pulse" style={{ animationDelay: '500ms' }} />
        <Sparkles className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" style={{ animationDelay: '1000ms' }} />
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-2 leading-tight">
          Juegos de Lina
        </h1>
        <p className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl text-purple-700 font-bold bg-white/80 inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-sm border border-white/60">
          <Gamepad2 className="inline w-6 h-6 mr-1 -mt-1" /> ¿A qué jugamos hoy?
        </p>
      </div>

      {/* Game selector */}
      <GameSelector />
      
      {/* Keyboard hint */}
      <div className="hidden sm:block mt-auto py-6 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
        <div className="flex items-center gap-2 text-purple-800 font-bold text-sm bg-white/80 px-5 py-2.5 rounded-full border border-white/50 shadow-sm">
          <span>Flechitas</span>
          <kbd className="bg-white/80 px-2 py-0.5 rounded-md shadow-sm border border-purple-200 text-xs font-mono">←↑↓→</kbd>
          <span>para moverte ·</span>
          <kbd className="bg-white/80 px-2 py-0.5 rounded-md shadow-sm border border-purple-200 text-xs font-mono">Enter</kbd>
          <span>para elegir</span>
        </div>
      </div>

      <div className="sm:hidden h-6" />
    </div>
  );
};
