import type { CardItem } from '../../../types';
import { clsx } from 'clsx';
import { Star, Sparkles } from 'lucide-react';

interface CardProps {
  card: CardItem;
  onClick: () => void;
  isFocused: boolean;
  isShaking: boolean;
  themeColor: string;
}

export const Card: React.FC<CardProps> = ({ card, onClick, isFocused, isShaking, themeColor }) => {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <div 
      className={clsx(
        'relative w-full aspect-square cursor-pointer perspective-1000 transition-all duration-300 rounded-xl sm:rounded-2xl',
        // Focused state
        isFocused && !card.isMatched && 'ring-4 sm:ring-[6px] ring-yellow-400 ring-offset-2 sm:ring-offset-4 ring-offset-transparent scale-105 sm:scale-110 z-20 shadow-[0_0_25px_rgba(255,215,0,0.5)]',
        // Idle state
        !isFocused && !card.isMatched && 'hover:scale-105 hover:shadow-xl',
        // Matched state
        card.isMatched && 'shadow-[0_0_20px_rgba(34,197,94,0.4)] ring-2 sm:ring-4 ring-green-400/80 scale-[0.95]',
      )}
      onClick={onClick}
    >
      <div 
        className={clsx(
          'w-full h-full transform-style-3d rounded-xl sm:rounded-2xl relative',
          isRevealed ? 'rotate-y-180' : '',
          !isShaking && 'duration-500',
          isShaking && 'animate-shake',
        )}
      >
        {/* === BACK FACE (face-down) === */}
        <div 
          className={clsx(
            'absolute w-full h-full backface-hidden rounded-xl sm:rounded-2xl flex items-center justify-center',
            'border-2 sm:border-4 border-white/60 bg-gradient-to-br shadow-lg overflow-hidden',
            themeColor
          )}
        >
          <div className="w-1/2 h-1/2 sm:w-3/5 sm:h-3/5 rounded-full overflow-hidden border-2 sm:border-4 border-white/80 shadow-lg">
            <img 
              src="/images/lina.jpg" 
              alt="Lina" 
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* === FRONT FACE (revealed) === */}
        <div 
          className={clsx(
            'absolute w-full h-full backface-hidden rounded-xl sm:rounded-2xl rotate-y-180 overflow-hidden',
            'flex items-center justify-center p-1.5 sm:p-3',
            card.isMatched 
              ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 sm:border-4 border-green-400' 
              : 'bg-white border-2 sm:border-4 border-gray-200 shadow-inner'
          )}
        >
          <img 
            src={card.image} 
            alt="Ficha de memotest" 
            className={clsx(
              'w-full h-full object-contain rounded-lg transition-transform duration-300',
              card.isMatched && 'scale-105'
            )}
            draggable={false}
          />
          {card.isMatched && (
            <>
              <Star className="absolute top-1 right-1 w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <Sparkles className="absolute top-1 left-1 w-4 h-4 sm:w-6 sm:h-6 text-yellow-300 animate-bounce" style={{ animationDelay: '200ms' }} />
              <Star className="absolute bottom-1 right-1 w-3 h-3 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: '400ms' }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
