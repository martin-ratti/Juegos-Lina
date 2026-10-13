import React from 'react';
import { clsx } from 'clsx';
import type { PieceId } from '../types';
import { PieceRenderer } from './SvgParts';

interface SlotRendererProps {
  id: PieceId;
  isTarget?: boolean;
}

export const SlotRenderer: React.FC<SlotRendererProps> = ({ id, isTarget }) => (
  <div
    className={clsx(
      'w-full h-full border-4 border-dashed rounded-[30%] transition-all duration-300 flex items-center justify-center overflow-visible relative',
      isTarget
        ? 'border-yellow-400 bg-yellow-400/20 shadow-[0_0_15px_rgba(253,224,71,0.5)] animate-pulse z-10 scale-105'
        : 'border-white/40 bg-white/10'
    )}
  >
    <div className="absolute inset-0 p-1 opacity-25 grayscale brightness-50 flex items-center justify-center pointer-events-none">
      <PieceRenderer id={id} />
    </div>
  </div>
);
