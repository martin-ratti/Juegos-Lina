import { Card } from './Card';
import type { CardItem, Theme } from '../../../types';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface GameBoardProps {
  cards: CardItem[];
  theme: Theme;
  onCardClick: (index: number) => void;
  isWon: boolean;
  shakingCards: number[];
}

export const GameBoard: React.FC<GameBoardProps> = ({ cards, theme, onCardClick, isWon, shakingCards }) => {
  const navigate = useNavigate();
  
  const [cols, setCols] = useState(3);
  
  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1024) setCols(6); // lg
      else if (window.innerWidth >= 640) setCols(4); // sm
      else setCols(3); // base
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const { focusedIndex, setFocusedIndex } = useKeyboard({
    gridColumns: cols,
    totalItems: cards.length,
    onEnter: (index) => {
      onCardClick(index);
    },
    onEscape: () => {
      navigate('/');
    },
    isActive: !isWon && cards.length > 0
  });

  if (cards.length === 0) return null;

  return (
    <div className="w-full max-w-[min(100%,32rem)] sm:max-w-2xl md:max-w-4xl lg:max-w-[90vw] xl:max-w-6xl mx-auto p-3 sm:p-6 md:p-8 bg-white/90 rounded-2xl sm:rounded-[2rem] shadow-2xl border-2 border-white/50 animate-fade-in">
      {/* Extra padding so scale on focused cards doesn't get clipped */}
      <div className="p-1 sm:p-2 md:p-3">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className="animate-pop-in"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              <Card
                card={card}
                onClick={() => onCardClick(index)}
                isFocused={focusedIndex === index}
                isShaking={shakingCards.includes(index)}
                themeColor={theme.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
