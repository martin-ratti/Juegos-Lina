import React from 'react';
import type { PuzzleModel } from '../types';

interface PuzzlePreviewProps {
  model: PuzzleModel;
  className?: string;
}

export const PuzzlePreview: React.FC<PuzzlePreviewProps> = ({ model, className }) => {
  const orderedPieces = model.pieces.toSorted((a, b) => a.zOrder - b.zOrder);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 320"
      className={className}
    >
      {orderedPieces.map((piece) => (
        <g key={piece.id}>{piece.render()}</g>
      ))}
    </svg>
  );
};
