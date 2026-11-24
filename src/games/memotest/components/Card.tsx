import { memo } from 'react';
import { clsx } from 'clsx';
import type { CardItem } from '../../../types';
import { ScallopedMedallion, StorybookStar } from '../../../components/PlayroomDecor';

interface CardProps {
  card: CardItem;
  onClick: () => void;
  isShaking: boolean;
  tileBg: string;
}

export const Card = memo<CardProps>(function Card({ card, onClick, isShaking, tileBg }) {
  const isRevealed = card.isFlipped || card.isMatched;
  const isPhoto = card.image.endsWith('.jpg');

  return (
    <button
      type="button"
      data-kb-item
      onClick={onClick}
      aria-label={
        card.isMatched
          ? `Par encontrado: ${card.label}`
          : card.isFlipped
            ? `Carta volteada: ${card.label}`
            : 'Carta boca abajo'
      }
      className={clsx(
        'toy-press group relative w-full aspect-square cursor-pointer perspective-1000 rounded-[14px] sm:rounded-[24px]',
        isShaking && 'animate-shake'
      )}
    >
      <div
        className={clsx(
          'w-full h-full transform-style-3d rounded-[14px] sm:rounded-[24px] relative transition-transform duration-500',
          isRevealed && 'rotate-y-180'
        )}
      >
        {/* === BACK FACE (face-down) === */}
        <div
          className={clsx(
            'absolute inset-0 backface-hidden rounded-[14px] sm:rounded-[24px] flex items-center justify-center p-[4px] sm:p-[8px]',
            'border-3 sm:border-4 border-white shadow-[0_4px_0_rgba(61,38,69,0.2)] sm:shadow-[0_5px_0_rgba(61,38,69,0.2)] overflow-hidden',
            tileBg
          )}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #FFFFFF 2px, transparent 2.5px)',
              backgroundSize: '16px 16px',
            }}
          />
          <div className="w-full h-full rounded-[10px] sm:rounded-[16px] border-2 border-dashed border-white/60 flex items-center justify-center p-[2px] sm:p-[4px]">
            <ScallopedMedallion src="/images/lina.jpg" alt="" size="card" />
          </div>
        </div>

        {/* === FRONT FACE (revealed) === */}
        <div
          className={clsx(
            'absolute inset-0 backface-hidden rounded-[14px] sm:rounded-[24px] rotate-y-180 overflow-hidden',
            'flex items-center justify-center p-[4px] sm:p-[8px]',
            card.isMatched
              ? 'bg-[#EFFAF3] border-3 sm:border-4 border-[#6BCB9F] shadow-[0_4px_0_#3EA376] sm:shadow-[0_5px_0_#3EA376]'
              : 'bg-white border-3 sm:border-4 border-[#E8D4B8] shadow-[0_4px_0_#D8BE9C] sm:shadow-[0_5px_0_#D8BE9C]'
          )}
        >
          <img
            src={card.image}
            alt=""
            decoding="async"
            className={clsx(
              'w-full h-full rounded-[9px] sm:rounded-[14px]',
              isPhoto ? 'object-cover' : 'object-contain',
              card.isMatched && 'animate-spring-pop'
            )}
            draggable={false}
          />
          {card.isMatched && (
            <div className="absolute top-[4px] right-[4px] sm:top-[6px] sm:right-[6px] animate-spring-pop" aria-hidden="true">
              <StorybookStar filled className="w-[22px] h-[22px] sm:w-[30px] sm:h-[30px]" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
});
