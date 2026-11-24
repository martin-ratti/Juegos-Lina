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
      className="memotest-board-wrap mx-auto p-[6px] sm:p-[14px] bg-[#FFFDF9] rounded-[22px] sm:rounded-[34px] border-3 sm:border-4 border-white shadow-[0_8px_0_#E5CEB0,0_16px_28px_rgba(61,38,69,0.12)]"
    >
      <div className="border-2 border-dashed border-[#EEDBC3] rounded-[16px] sm:rounded-[26px] p-[6px] sm:p-[12px]">
        <div className="memotest-grid gap-[6px] sm:gap-[12px]">
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
