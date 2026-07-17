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
    <header className="w-full p-4 flex items-center justify-between bg-white/60 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-full font-bold shadow hover:bg-purple-50 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Volver</span>
      </button>

      <h1 className="text-3xl sm:text-4xl text-center text-purple-800 flex-1 px-4 drop-shadow-sm">
        {theme.name}
      </h1>

      <div className="flex items-center gap-1 sm:gap-2 bg-white/80 px-4 py-2 rounded-full shadow">
        {Array.from({ length: totalPairs }).map((_, i) => (
          <Star 
            key={i}
            className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-500 ${
              i < matches 
                ? 'text-yellow-400 fill-yellow-400 scale-110 drop-shadow-md' 
                : 'text-gray-300 fill-gray-200'
            }`} 
          />
        ))}
      </div>
    </header>
  );
};
