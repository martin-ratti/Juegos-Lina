import React from 'react';
import { clsx } from 'clsx';
import type { PuzzlePieceDef } from '../types';

interface PieceBankProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  availablePieces: PuzzlePieceDef[];
  selectedPiece: string | null;
  bankHint: boolean;
  onSelectPiece: (id: string) => void;
}

export const PieceBank: React.FC<PieceBankProps> = ({
  containerRef,
  availablePieces,
  selectedPiece,
  bankHint,
  onSelectPiece,
}) => {
  const isCompactFour = availablePieces.length <= 4;

  return (
    <section
      ref={containerRef}
      aria-label="Piezas para encastrar"
      className={clsx(
        'h-fit self-center w-full lg:flex-1 lg:max-w-xl flex items-center justify-center p-[8px] sm:p-5 lg:p-6 rounded-[24px] sm:rounded-[34px] bg-[#FFFDF9] border-3 sm:border-4 border-[#F0DFC8] shadow-[0_7px_0_#DFC7A7] transition-shadow duration-300',
        bankHint && 'ring-4 ring-[#FFBE3D] shadow-[0_7px_0_#D99216]'
      )}
    >
      <div
        className={clsx(
          'grid w-full gap-[6px] sm:gap-3.5 lg:gap-4',
          isCompactFour
            ? 'grid-cols-4 sm:grid-cols-4 lg:grid-cols-2'
            : 'grid-cols-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3'
        )}
      >
        {availablePieces.map((piece) => {
          const isSelected = selectedPiece === piece.id;
          const hasOtherSelected = selectedPiece !== null && !isSelected;

          return (
            <button
              key={piece.id}
              type="button"
              data-kb-item
              data-piece-id={piece.id}
              draggable
              aria-pressed={isSelected}
              aria-label={`Elegir ${piece.name}`}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', piece.id);
                if (!isSelected) {
                  onSelectPiece(piece.id);
                }
              }}
              onClick={() => onSelectPiece(piece.id)}
              className={clsx(
                'toy-press flex flex-col items-center justify-between gap-[4px] sm:gap-2 p-[6px] sm:p-3 rounded-[16px] sm:rounded-[22px] border-3 cursor-pointer min-w-0 w-full',
                isSelected
                  ? 'bg-[#FFF5D6] border-[#FFBE3D] shadow-[0_5px_0_#D99216] -translate-y-1 scale-105'
                  : 'bg-[#FFF8EE] border-[#E8D4B8] shadow-[0_4px_0_#D8BE9C] hover:border-[#5BC0EB]',
                hasOtherSelected && 'opacity-80 hover:opacity-100'
              )}
            >
              <div className="w-full aspect-square max-w-[3.75rem] sm:max-w-[5rem] lg:max-w-[7.5rem] flex items-center justify-center pointer-events-none">
                <svg
                  aria-hidden="true"
                  viewBox={piece.cropBox}
                  className="w-full h-full overflow-visible drop-shadow-[0_2px_0_rgba(61,38,69,0.16)]"
                >
                  {piece.render()}
                </svg>
              </div>
              <span
                className={clsx(
                  'text-[11px] sm:text-sm font-bold px-2 py-0.5 rounded-full truncate max-w-full',
                  isSelected
                    ? 'bg-[#FFBE3D] text-[#3D2645]'
                    : 'bg-[#F3E5D0] text-[#3D2645]'
                )}
              >
                {piece.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
