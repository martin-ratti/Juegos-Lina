import { Card } from './Card';
import type { CardItem, Theme } from '../types';
import { useKeyboard } from '../hooks/useKeyboard';
import { useNavigate } from 'react-router-dom';

interface GameBoardProps {
  cards: CardItem[];
  theme: Theme;
  onCardClick: (index: number) => void;
  isWon: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ cards, theme, onCardClick, isWon }) => {
  const navigate = useNavigate();
  
  const { focusedIndex, setFocusedIndex } = useKeyboard({
    gridColumns: 3, // 3 columns, 4 rows = 12 cards
    totalItems: cards.length,
    onEnter: (index) => {
      onCardClick(index);
    },
    onEscape: () => {
      navigate('/');
    },
    isActive: !isWon && cards.length > 0 // only active if game is playing
  });

  if (cards.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white/40 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-white/60">
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            onMouseEnter={() => setFocusedIndex(index)}
          >
            <Card
              card={card}
              onClick={() => onCardClick(index)}
              isFocused={focusedIndex === index}
              themeColor={theme.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
