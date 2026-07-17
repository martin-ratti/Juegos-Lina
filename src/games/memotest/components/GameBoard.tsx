import { Card } from './Card';
import type { CardItem, Theme } from '../../../types';
import { useKeyboard } from '../../../hooks/useKeyboard';
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
  
  const { focusedIndex, setFocusedIndex } = useKeyboard({
    gridColumns: 3,
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
    <div className="w-full max-w-[min(100%,32rem)] lg:max-w-2xl mx-auto p-3 sm:p-6 md:p-8 bg-white/30 backdrop-blur-md rounded-2xl sm:rounded-[2rem] shadow-2xl border-2 border-white/50 animate-fade-in">
      {/* Extra padding so scale on focused cards doesn't get clipped */}
      <div className="p-1 sm:p-2 md:p-3">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-5 lg:gap-6">
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
