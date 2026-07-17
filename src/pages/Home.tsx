
import { ThemeSelector } from '../components/ThemeSelector';
import { Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-8 sm:pt-16 px-4">
      <div className="text-center mb-8 relative">
        <Sparkles className="absolute -top-6 -left-8 w-12 h-12 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute -bottom-4 -right-8 w-10 h-10 text-pink-400 animate-pulse" style={{ animationDelay: '500ms' }} />
        
        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 drop-shadow-lg p-2">
          Juegos de Lina
        </h1>
        <p className="mt-4 text-2xl text-purple-700 font-bold bg-white/50 inline-block px-6 py-2 rounded-full shadow-sm">
          ¿A qué jugamos hoy?
        </p>
      </div>

      <ThemeSelector />
      
      <p className="mt-auto py-8 text-center text-purple-800/60 font-bold flex items-center gap-2">
        <span>Usa las flechitas </span>
        <span className="bg-white/80 px-2 rounded-md shadow-sm border border-purple-200">←↑↓→</span>
        <span> para moverte y </span>
        <span className="bg-white/80 px-2 rounded-md shadow-sm border border-purple-200">Enter</span>
        <span> para elegir</span>
      </p>
    </div>
  );
};
