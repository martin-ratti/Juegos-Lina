import type { CardItem } from '../types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  card: CardItem;
  onClick: () => void;
  isFocused: boolean;
  themeColor: string; // Tailwind gradient class
}

export const Card: React.FC<CardProps> = ({ card, onClick, isFocused, themeColor }) => {
  return (
    <div 
      className={twMerge(
        'relative w-full aspect-square cursor-pointer perspective-1000 transition-all duration-300 rounded-2xl',
        isFocused && !card.isMatched && 'ring-[6px] ring-yellow-400 ring-offset-4 ring-offset-transparent scale-110 z-20 shadow-[0_0_30px_rgba(255,215,0,0.6)]',
        !isFocused && !card.isMatched && 'hover:scale-105 hover:shadow-xl',
        card.isMatched && 'scale-100 shadow-[0_0_20px_rgba(34,197,94,0.5)] ring-4 ring-green-400'
      )}
      onClick={onClick}
    >
      <div 
        className={clsx(
          'w-full h-full duration-500 transform-style-3d rounded-2xl relative',
          (card.isFlipped || card.isMatched) ? 'rotate-y-180' : ''
        )}
      >
        {/* Front of card (Backside of the game piece - what you see when card is face down) */}
        <div 
          className={clsx(
            'absolute w-full h-full backface-hidden rounded-2xl flex items-center justify-center border-4 border-white/60 bg-gradient-to-br shadow-lg',
            themeColor
          )}
        >
          {/* Decorative question mark */}
          <span className="text-5xl sm:text-6xl md:text-7xl text-white/40 font-bold select-none drop-shadow-lg">?</span>
        </div>

        {/* Back of card (The image to match - what you see when flipped) */}
        <div 
          className={clsx(
            'absolute w-full h-full backface-hidden rounded-2xl rotate-y-180 overflow-hidden flex items-center justify-center p-2',
            card.isMatched 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-4 border-green-400' 
              : 'bg-white border-4 border-gray-100 shadow-inner'
          )}
        >
          <img 
            src={card.image} 
            alt="Ficha de memotest" 
            className="w-full h-full object-contain rounded-xl"
            draggable={false}
          />
          {card.isMatched && (
            <div className="absolute top-1 right-1 text-2xl animate-bounce">⭐</div>
          )}
        </div>
      </div>
    </div>
  );
};
