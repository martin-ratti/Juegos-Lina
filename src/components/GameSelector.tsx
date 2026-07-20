import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useKeyboard } from '../hooks/useKeyboard';
import { Puzzle, Smile } from 'lucide-react';

const GAMES = [
  {
    id: 'memotest',
    name: 'Memotest',
    description: '¡Encontrá las parejas!',
    color: 'from-purple-400 to-indigo-500',
    icon: Puzzle,
    path: '/memotest',
  },
  {
    id: 'rompecabezas',
    name: 'Cuerpo Humano',
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {GAMES.map((game, index) => {
          const isFocused = focusedIndex === index;
          const Icon = game.icon;

          return (
            <div
              key={game.id}
              onMouseEnter={() => setFocusedIndex(index)}
              onClick={() => handleSelect(index)}
              className={clsx(
                'group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 transform animate-pop-in cursor-pointer border-4 border-white/40',
                isFocused && 'scale-105 sm:scale-110 ring-[6px] ring-yellow-400 ring-offset-4 ring-offset-purple-50 z-10 shadow-[0_0_40px_rgba(255,215,0,0.6)] -translate-y-2',
                !isFocused && 'hover:-translate-y-2 hover:scale-[1.02]',
              )}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
            >
              <div className={clsx('absolute inset-0 bg-gradient-to-br', game.color)} />

              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-20 sm:w-28 h-20 sm:h-28 bg-white/10 rounded-full" />

              <div className="relative p-4 sm:p-6 md:p-8 h-40 sm:h-48 md:h-56 lg:h-64 flex flex-col items-center justify-center text-center gap-2 sm:gap-3">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white drop-shadow-md" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
                  {game.name}
                </h2>
                <p className="text-white/90 text-sm sm:text-base md:text-lg font-bold bg-black/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full backdrop-blur-sm">
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
