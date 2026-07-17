import { THEMES } from '../../../data/themes';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { Lock, Mouse, Crown, Heart, Users } from 'lucide-react';

const THEME_ICONS: Record<string, React.ReactNode> = {
  mickey: <Mouse className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white/80" />,
  barbie: <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white/80" />,
  princesas: <Crown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white/80" />,
  familia: <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white/80" />,
};



export const ThemeSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    const theme = THEMES[index];
    if (theme && !theme.comingSoon) {
      navigate(`/memotest/jugar/${theme.id}`);
    }
  };

  const { focusedIndex, setFocusedIndex } = useKeyboard({
    gridColumns: 2,
    totalItems: THEMES.length,
    onEnter: handleSelect,
    isActive: true
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
        {THEMES.map((theme, index) => {
          const isFocused = focusedIndex === index;
          
          return (
            <div
              key={theme.id}
              onMouseEnter={() => setFocusedIndex(index)}
              onClick={() => handleSelect(index)}
              className={clsx(
                'relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-300 transform animate-pop-in',
                isFocused && !theme.comingSoon && 'scale-105 ring-4 sm:ring-[6px] ring-yellow-400 ring-offset-2 sm:ring-offset-4 ring-offset-transparent z-10 shadow-[0_0_30px_rgba(255,215,0,0.4)]',
                !isFocused && 'hover:scale-[1.03]',
                theme.comingSoon ? 'cursor-not-allowed grayscale-[30%] opacity-70' : 'cursor-pointer',
              )}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
            >
              <div className={clsx('absolute inset-0 bg-gradient-to-br', theme.color)} />
              
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-20 sm:w-24 h-20 sm:h-24 bg-white/10 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 sm:w-20 h-16 sm:h-20 bg-white/10 rounded-full" />
              
              <div className="relative p-4 sm:p-6 md:p-8 h-32 sm:h-44 md:h-52 flex flex-col items-center justify-center text-center gap-1 sm:gap-2">
                <div className="mb-0.5 sm:mb-1">
                  {THEME_ICONS[theme.id]}
                </div>
                <h2 className="text-xl sm:text-3xl md:text-4xl text-white drop-shadow-lg flex items-center gap-1 sm:gap-2">
                  {theme.name}
                </h2>
                <p className="text-white/90 text-xs sm:text-base md:text-lg font-bold">
                  {theme.comingSoon ? '🔒 Próximamente...' : theme.description}
                </p>
                
                {theme.comingSoon && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/40 p-1.5 sm:p-2 rounded-full">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
