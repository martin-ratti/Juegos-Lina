
import { THEMES } from '../data/themes';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useKeyboard } from '../hooks/useKeyboard';
import { Lock } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    const theme = THEMES[index];
    if (theme && !theme.comingSoon) {
      navigate(`/jugar/${theme.id}`);
    }
  };

  const { focusedIndex, setFocusedIndex } = useKeyboard({
    gridColumns: 2,
    totalItems: THEMES.length,
    onEnter: handleSelect,
    isActive: true
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-center text-pink-600 mb-8 drop-shadow-md animate-bounce-slight">
        ¡Elige un Juego!
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {THEMES.map((theme, index) => {
          const isFocused = focusedIndex === index;
          
          return (
            <div
              key={theme.id}
              onMouseEnter={() => setFocusedIndex(index)}
              onClick={() => handleSelect(index)}
              className={clsx(
                'relative overflow-hidden rounded-3xl shadow-xl transition-all duration-300 transform',
                isFocused ? 'scale-105 focus-ring z-10' : 'hover:scale-105',
                theme.comingSoon ? 'cursor-not-allowed opacity-80' : 'cursor-pointer',
                !theme.comingSoon && isFocused && 'animate-pulse-glow'
              )}
            >
              <div className={clsx('absolute inset-0 bg-gradient-to-br opacity-90', theme.color)}></div>
              
              <div className="relative p-8 h-48 sm:h-56 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl sm:text-4xl text-white drop-shadow-lg mb-2">
                  {theme.name}
                </h2>
                <p className="text-white/90 text-lg sm:text-xl font-bold">
                  {theme.comingSoon ? 'Próximamente...' : theme.description}
                </p>
                
                {theme.comingSoon && (
                  <div className="absolute top-4 right-4 bg-black/20 p-2 rounded-full backdrop-blur-sm">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
