import React, { useRef } from 'react';
import { Card } from './Card';
import type { CardItem, Theme } from '../../../types';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { useViewTransitionNavigate } from '../../../hooks/useViewTransitionNavigate';

interface GameBoardProps {
  cards: CardItem[];
  theme: Theme;
  onCardClick: (index: number) => void;
  isWon: boolean;
  shakingCards: number[];
}

export const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  theme,
  onCardClick,
  isWon,
  shakingCards,
}) => {
  const navigate = useViewTransitionNavigate();
  const boardRef = useRef<HTMLDivElement>(null);

  useKeyboard({
    containerRef: boardRef,
    onEscape: () => navigate('/memotest'),
    isActive: !isWon && cards.length > 0,
  });

  if (cards.length === 0) return null;

  return (
    <div
      ref={boardRef}
      data-pairs={theme.cards.length}
      className="memotest-board-wrap mx-auto p-2 sm:p-3.5 bg-[#FFFDF9] rounded-[1.75rem] sm:rounded-[2.25rem] border-3 sm:border-4 border-white shadow-[0_8px_0_#E5CEB0,0_16px_28px_rgba(61,38,69,0.12)]"
    >
      <div className="border-2 border-dashed border-[#EEDBC3] rounded-[1.35rem] sm:rounded-[1.75rem] p-2 sm:p-3">
        <div className="memotest-grid gap-2 sm:gap-3.5">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => onCardClick(index)}
              isShaking={shakingCards.includes(index)}
              tileBg={theme.tileBg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
