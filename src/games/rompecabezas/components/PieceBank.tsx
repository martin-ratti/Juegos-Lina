import React from 'react';
import { clsx } from 'clsx';
import type { PieceId, PieceInfo } from '../types';
import { PieceRenderer } from './SvgParts';

interface PieceBankProps {
  availablePieces: PieceInfo[];
  selectedPiece: PieceId | null;
  focusedIndex: number;
  onSelectPiece: (id: PieceId) => void;
  onHoverPiece: (index: number) => void;
}

export const PieceBank: React.FC<PieceBankProps> = ({
  availablePieces,
  selectedPiece,
  focusedIndex,
  onSelectPiece,
  onHoverPiece,
}) => {
  return (
    <div
      className={clsx(
        'w-full max-w-2xl lg:max-w-md xl:max-w-lg mt-4 sm:mt-8 lg:mt-0 mb-4 lg:mb-0 p-4 rounded-3xl transition-all duration-500',
        selectedPiece ? 'opacity-50 grayscale-[30%] pointer-events-none' : 'opacity-100 bg-white/20'
      )}
    >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 min-h-[120px]">
        {availablePieces.map((piece, index) => {
          const isFocused = focusedIndex === index && selectedPiece === null;

          return (
            <button
              key={piece.id}
              type="button"
              aria-label={`Seleccionar pieza ${piece.name}`}
              onMouseEnter={() => onHoverPiece(index)}
              onClick={() => onSelectPiece(piece.id)}
              className={clsx(
                'flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-2xl transition-all duration-300 animate-pop-in cursor-pointer',
                isFocused
                  ? 'scale-110 bg-white shadow-xl ring-4 ring-cyan-400 ring-offset-2'
                  : 'hover:scale-105 bg-white/70 shadow-md hover:bg-white'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center pointer-events-none">
                <PieceRenderer id={piece.id} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
