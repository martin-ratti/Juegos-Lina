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
        'relative w-full aspect-square cursor-pointer perspective-1000',
        isFocused && 'focus-ring',
        card.isMatched && 'opacity-80 scale-105 transition-all duration-300'
      )}
      onClick={onClick}
    >
      <div 
        className={clsx(
          'w-full h-full duration-500 transform-style-3d shadow-lg rounded-2xl relative',
          (card.isFlipped || card.isMatched) ? 'rotate-y-180' : ''
        )}
      >
        {/* Front of card (Backside of the game piece) */}
        <div 
          className={clsx(
            'absolute w-full h-full backface-hidden rounded-2xl flex items-center justify-center border-4 border-white/50 bg-gradient-to-br',
            themeColor
          )}
        >
          {/* Decorative pattern for the back of the card */}
          <div className="w-1/2 h-1/2 opacity-30 bg-white rounded-full mix-blend-overlay"></div>
        </div>

        {/* Back of card (The image to match) */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-2xl rotate-y-180 bg-white border-4 border-white overflow-hidden shadow-inner flex items-center justify-center"
        >
          <img 
            src={card.image} 
            alt="Ficha de memotest" 
            className="w-4/5 h-4/5 object-contain"
            draggable={false}
          />
          {card.isMatched && (
            <div className="absolute inset-0 bg-yellow-400/20 mix-blend-overlay animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};
