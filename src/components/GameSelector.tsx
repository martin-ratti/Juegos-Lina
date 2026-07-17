import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useKeyboard } from '../hooks/useKeyboard';
import { Puzzle, Smile } from 'lucide-react';

const GAMES = [
  {
    id: 'memotest',
    name: 'Memotest',
    emoji: '🧠',
    description: '¡Encontrá las parejas!',
    color: 'from-purple-400 to-indigo-500',
    icon: Puzzle,
    path: '/memotest',
  },
  {
    id: 'rompecabezas',
    name: 'Cuerpo Humano',
    emoji: '👦',
    description: '¡Armá el muñeco!',
    color: 'from-blue-400 to-cyan-500',
    icon: Smile,
    path: '/rompecabezas',
  },
];

export const GameSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    const game = GAMES[index];
    if (game) {
      navigate(game.path);
    }
  };

  const { focusedIndex, setFocusedIndex } = useKeyboard({
    gridColumns: 2,
    totalItems: GAMES.length,
    onEnter: handleSelect,
    isActive: true,
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {GAMES.map((game, index) => {
          const isFocused = focusedIndex === index;
          const Icon = game.icon;

          return (
            <div
              key={game.id}
              onMouseEnter={() => setFocusedIndex(index)}
              onClick={() => handleSelect(index)}
              className={clsx(
                'relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-300 transform animate-pop-in cursor-pointer',
                isFocused && 'scale-105 ring-4 sm:ring-[6px] ring-yellow-400 ring-offset-2 sm:ring-offset-4 ring-offset-transparent z-10 shadow-[0_0_30px_rgba(255,215,0,0.4)]',
                !isFocused && 'hover:scale-[1.03]',
              )}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
            >
              <div className={clsx('absolute inset-0 bg-gradient-to-br', game.color)} />

              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-20 sm:w-28 h-20 sm:h-28 bg-white/10 rounded-full" />

              <div className="relative p-5 sm:p-8 md:p-10 h-40 sm:h-52 md:h-64 flex flex-col items-center justify-center text-center gap-2 sm:gap-3">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-1">{game.emoji}</div>
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white/70" />
                <h2 className="text-xl sm:text-3xl md:text-4xl text-white drop-shadow-lg">
                  {game.name}
                </h2>
                <p className="text-white/90 text-xs sm:text-base md:text-lg font-bold">
                  {game.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
