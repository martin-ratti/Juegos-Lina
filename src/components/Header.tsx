import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import type { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  matches: number;
  totalPairs: number;
}

export const Header: React.FC<HeaderProps> = ({ theme, matches, totalPairs }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full px-4 py-3 flex items-center justify-between bg-white/70 backdrop-blur-lg sticky top-0 z-30 shadow-md border-b border-white/50">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-purple-50 text-purple-600 rounded-full font-extrabold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-purple-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">Volver</span>
      </button>

      <h1 className="text-2xl sm:text-3xl md:text-4xl text-center text-purple-800 flex-1 px-3 drop-shadow-sm truncate">
        {theme.name}
      </h1>

      <div className="flex items-center gap-1 bg-white/90 px-3 py-2 rounded-full shadow-md border border-yellow-200">
        {Array.from({ length: totalPairs }).map((_, i) => (
          <Star 
            key={i}
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 ${
              i < matches 
                ? 'text-yellow-400 fill-yellow-400 scale-125 drop-shadow-md' 
                : 'text-gray-300/60 fill-gray-200/40'
            }`} 
          />
        ))}
      </div>
    </header>
  );
};
