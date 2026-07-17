import type { CardItem } from '../types';
import { clsx } from 'clsx';

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
        'relative w-full aspect-square cursor-pointer perspective-1000 transition-all duration-300 rounded-2xl',
        // Focused state — big glowing ring
        isFocused && !card.isMatched && 'ring-[6px] ring-yellow-400 ring-offset-4 ring-offset-transparent scale-110 z-20 shadow-[0_0_35px_rgba(255,215,0,0.5)]',
        // Idle state
        !isFocused && !card.isMatched && 'hover:scale-105 hover:shadow-xl',
        // Matched state — green glow + slight shrink to "settle"
        card.isMatched && 'shadow-[0_0_25px_rgba(34,197,94,0.4)] ring-4 ring-green-400/80 scale-[0.95]',
      )}
      onClick={onClick}
    >
      <div 
        className={clsx(
          'w-full h-full transform-style-3d rounded-2xl relative',
          isRevealed ? 'rotate-y-180' : '',
          // Flip speed
          !isShaking && 'duration-500',
          // Shake animation on mismatch
          isShaking && 'animate-shake',
        )}
      >
        {/* === BACK FACE (what you see when card is face-down) === */}
        <div 
          className={clsx(
            'absolute w-full h-full backface-hidden rounded-2xl flex items-center justify-center',
            'border-4 border-white/60 bg-gradient-to-br shadow-lg overflow-hidden',
            themeColor
          )}
        >
          {/* Foto de Lina como dorso */}
          <div className="w-3/5 h-3/5 rounded-full overflow-hidden border-4 border-white/80 shadow-lg">
            <img 
              src="/images/lina.jpg" 
              alt="Lina" 
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* === FRONT FACE (the image — revealed when flipped) === */}
        <div 
          className={clsx(
            'absolute w-full h-full backface-hidden rounded-2xl rotate-y-180 overflow-hidden',
            'flex items-center justify-center p-3',
            card.isMatched 
              ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-4 border-green-400' 
              : 'bg-white border-4 border-gray-200 shadow-inner'
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
              <div className="absolute top-1 right-1 text-xl animate-bounce" style={{ animationDelay: '0ms' }}>⭐</div>
              <div className="absolute top-1 left-1 text-xl animate-bounce" style={{ animationDelay: '200ms' }}>✨</div>
              <div className="absolute bottom-1 right-1 text-lg animate-bounce" style={{ animationDelay: '400ms' }}>🌟</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
