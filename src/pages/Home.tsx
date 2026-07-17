import { ThemeSelector } from '../components/ThemeSelector';
import { Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-dvh flex flex-col items-center pt-8 sm:pt-14 px-4">
      {/* Title section */}
      <div className="text-center mb-6 relative animate-slide-up">
        <Sparkles className="absolute -top-4 -left-6 w-10 h-10 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute -top-2 -right-6 w-8 h-8 text-pink-400 animate-pulse" style={{ animationDelay: '500ms' }} />
        <Sparkles className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 text-cyan-400 animate-pulse" style={{ animationDelay: '1000ms' }} />
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-2 leading-tight">
          Juegos de Lina
        </h1>
        <p className="mt-3 text-xl sm:text-2xl text-purple-700 font-bold bg-white/50 backdrop-blur-sm inline-block px-6 py-2 rounded-full shadow-sm border border-white/60">
          🎮 ¿A qué jugamos hoy?
        </p>
      </div>

      {/* Theme selector */}
      <ThemeSelector />
      
      {/* Keyboard hint */}
      <div className="mt-auto py-6 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
        <div className="flex items-center gap-2 text-purple-800/50 font-bold text-sm sm:text-base bg-white/40 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/50">
          <span>Flechitas</span>
          <kbd className="bg-white/80 px-2 py-0.5 rounded-md shadow-sm border border-purple-200 text-xs font-mono">←↑↓→</kbd>
          <span>para moverte ·</span>
          <kbd className="bg-white/80 px-2 py-0.5 rounded-md shadow-sm border border-purple-200 text-xs font-mono">Enter</kbd>
          <span>para elegir</span>
        </div>
      </div>
    </div>
  );
};
