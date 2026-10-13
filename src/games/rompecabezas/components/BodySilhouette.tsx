import React from 'react';
import { clsx } from 'clsx';
import type { PieceId } from '../types';
import { PieceRenderer } from './SvgParts';
import { SlotRenderer } from './SlotRenderer';

interface BodySilhouetteProps {
  placedPieces: PieceId[];
  selectedPiece: PieceId | null;
  shakingSlot: PieceId | null;
  targetSlotId?: PieceId;
  onSlotSelect: (targetId: PieceId) => void;
}

export const BodySilhouette: React.FC<BodySilhouetteProps> = ({
  placedPieces,
  selectedPiece,
  shakingSlot,
  targetSlotId,
  onSlotSelect,
}) => {
  const renderSlot = (
    id: PieceId,
    name: string,
    positionClasses: string,
    innerPadding = ''
  ) => {
    const isPlaced = placedPieces.includes(id);
    const isTarget = targetSlotId === id && selectedPiece !== null;
    const isClickable = !isPlaced && selectedPiece !== null;

    return (
      <div
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : -1}
        aria-label={`${name}: ${isPlaced ? 'pieza colocada' : isClickable ? 'tocar para colocar pieza' : 'lugar vacío'}`}
        onClick={() => onSlotSelect(id)}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSlotSelect(id);
          }
        }}
        className={clsx(
          positionClasses,
          'transition-transform select-none',
          isClickable && 'cursor-pointer hover:scale-110 focus:outline-none focus:scale-110',
          shakingSlot === id && 'animate-shake'
        )}
      >
        {isPlaced ? (
          <PieceRenderer id={id} />
        ) : (
          <div className={clsx('w-full h-full', innerPadding)}>
            <SlotRenderer id={id} isTarget={isTarget} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-[300px] h-[400px] sm:w-[350px] sm:h-[480px] mt-2 sm:mt-6 lg:mt-0 bg-white/30 backdrop-blur-md rounded-[3rem] border-4 border-white/70 shadow-2xl flex flex-col items-center p-6 animate-fade-in shrink-0">
      {/* Helper overlay when piece is selected */}
      {selectedPiece && (
        <div className="absolute inset-0 bg-cyan-900/10 rounded-[3rem] pointer-events-none z-0" />
      )}

      {/* HAIR */}
      {renderSlot(
        'hair',
        'Pelo',
        'absolute -top-3 sm:-top-2 w-28 h-28 sm:w-36 sm:h-36 z-40',
        'p-1'
      )}

      {/* HEAD */}
      {renderSlot(
        'head',
        'Cara',
        'absolute top-4 sm:top-6 w-24 h-24 sm:w-28 sm:h-28 z-30',
        'p-2'
      )}

      {/* LEFT ARM */}
      {renderSlot(
        'leftArm',
        'Brazo Izquierdo',
        'absolute top-[6.5rem] sm:top-36 left-8 sm:left-10 w-12 h-24 sm:w-14 sm:h-28 z-10'
      )}

      {/* RIGHT ARM */}
      {renderSlot(
        'rightArm',
        'Brazo Derecho',
        'absolute top-[6.5rem] sm:top-36 right-8 sm:right-10 w-12 h-24 sm:w-14 sm:h-28 z-10'
      )}

      {/* TORSO */}
      {renderSlot(
        'torso',
        'Cuerpo / Torso',
        'absolute top-[6rem] sm:top-32 w-28 h-32 sm:w-32 sm:h-36 z-20',
        'p-2'
      )}

      {/* LEFT LEG */}
      {renderSlot(
        'leftLeg',
        'Pierna Izquierda',
        'absolute top-[13.5rem] sm:top-[20rem] left-[4.5rem] sm:left-[5.5rem] w-14 h-24 sm:w-16 sm:h-28 z-10',
        'p-1'
      )}

      {/* RIGHT LEG */}
      {renderSlot(
        'rightLeg',
        'Pierna Derecha',
        'absolute top-[13.5rem] sm:top-[20rem] right-[4.5rem] sm:right-[5.5rem] w-14 h-24 sm:w-16 sm:h-28 z-10',
        'p-1'
      )}
    </div>
  );
};
