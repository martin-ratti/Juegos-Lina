import React from 'react';
import { clsx } from 'clsx';
import type { BoardDecorType, PuzzleModel } from '../types';

interface BodySilhouetteProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  model: PuzzleModel;
  placedPieces: string[];
  selectedPiece: string | null;
  shakingSlot: string | null;
  onSlotSelect: (targetId: string) => void;
  onSlotDrop: (targetId: string, droppedId: string) => void;
}

const BoardDecor: React.FC<{ type: BoardDecorType }> = ({ type }) => {
  if (type === 'sky') {
    return (
      <g aria-hidden="true" opacity="0.65">
        {/* Nubecitas suaves */}
        <path
          d="M28 52 C28 43 37 38 45 41 C49 32 63 32 68 41 C76 41 82 47 81 55 L32 55 C29 55 28 54 28 52 Z"
          fill="#FFFDF9"
        />
        <path
          d="M228 66 C228 59 235 55 241 57 C245 50 256 50 260 57 C266 57 271 62 270 68 L231 68 C229 68 228 67 228 66 Z"
          fill="#FFFDF9"
        />
        {/* Estrellitas pintadas */}
        <circle cx="44" cy="264" r="4" fill="#E3BC88" />
        <circle cx="256" cy="268" r="3.5" fill="#E3BC88" />
      </g>
    );
  }

  if (type === 'sunny') {
    return (
      <g aria-hidden="true" opacity="0.72">
        <circle cx="42" cy="40" r="14" fill="#FFE08C" />
        <g stroke="#F2C057" strokeWidth="2.8" strokeLinecap="round">
          <line x1="42" y1="18" x2="42" y2="22" />
          <line x1="42" y1="58" x2="42" y2="62" />
          <line x1="20" y1="40" x2="24" y2="40" />
          <line x1="60" y1="40" x2="64" y2="40" />
          <line x1="26" y1="24" x2="29" y2="27" />
          <line x1="55" y1="53" x2="58" y2="56" />
        </g>
        <path d="M22 292 Q150 274 278 292 L278 310 L22 310 Z" fill="#E6C99E" opacity="0.55" />
      </g>
    );
  }

  return (
    <g aria-hidden="true" opacity="0.75">
      {/* Sol suave y pastito con margaritas */}
      <circle cx="258" cy="40" r="13" fill="#FFE08C" />
      <path d="M16 290 Q150 270 284 290 L284 314 L16 314 Z" fill="#C9E4BA" />
      <circle cx="46" cy="294" r="4.5" fill="#FFFDF9" />
      <circle cx="46" cy="294" r="2" fill="#FFBE3D" />
      <circle cx="246" cy="292" r="4.5" fill="#FFFDF9" />
      <circle cx="246" cy="292" r="2" fill="#F25C78" />
      <circle cx="64" cy="302" r="3.5" fill="#FFFDF9" />
      <circle cx="64" cy="302" r="1.5" fill="#5BC0EB" />
    </g>
  );
};

export const BodySilhouette: React.FC<BodySilhouetteProps> = ({
  svgRef,
  model,
  placedPieces,
  selectedPiece,
  shakingSlot,
  onSlotSelect,
  onSlotDrop,
}) => {
  const hasSelectedPiece = selectedPiece !== null;
  const orderedPieces = model.pieces.toSorted((a, b) => a.zOrder - b.zOrder);

  return (
    <div className="relative w-full max-w-[min(92vw,48dvh)] sm:max-w-[min(84vw,54dvh)] lg:w-[min(46vw,calc(100dvh-7rem))] lg:max-w-[640px] aspect-[300/320] rounded-[2rem] sm:rounded-[2.5rem] border-4 border-[#FFFDF9] bg-gradient-to-b from-[#FCEBD4] to-[#F3D6AE] shadow-[0_8px_0_#CFA36E,0_18px_28px_rgba(61,38,69,0.14)] p-2 sm:p-3 overflow-hidden shrink-0">
      {/* Vetas sutiles de madera */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(12deg, transparent 0 26px, rgba(182, 128, 70, 0.16) 26px 28px)',
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 300 320"
        className="relative z-10 w-full h-full overflow-visible"
      >
        <defs>
          {/* Hueco tallado en madera */}
          <filter
            id="wood-recess-filter"
            x="-12%"
            y="-12%"
            width="124%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodColor="#D8B384" result="woodBase" />
            <feComposite in="woodBase" in2="SourceAlpha" operator="in" result="sil" />
            <feOffset in="SourceAlpha" dx="0" dy="3.5" result="shifted" />
            <feComposite in="SourceAlpha" in2="shifted" operator="out" result="topEdge" />
            <feFlood floodColor="#9E6E3C" floodOpacity="0.65" result="darkShade" />
            <feComposite in="darkShade" in2="topEdge" operator="in" result="innerShadow" />
            <feGaussianBlur in="innerShadow" stdDeviation="1.4" result="softInnerShadow" />
            <feMerge>
              <feMergeNode in="sil" />
              <feMergeNode in="softInnerShadow" />
            </feMerge>
          </filter>

          {/* Resplandor caléndula cuando hay una pieza en la mano */}
          <filter
            id="wood-recess-glow"
            x="-16%"
            y="-16%"
            width="132%"
            height="132%"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodColor="#FFE7AE" result="glowBase" />
            <feComposite in="glowBase" in2="SourceAlpha" operator="in" result="sil" />
            <feOffset in="SourceAlpha" dx="0" dy="3" result="shifted" />
            <feComposite in="SourceAlpha" in2="shifted" operator="out" result="topEdge" />
            <feFlood floodColor="#C78C26" floodOpacity="0.55" result="warmShade" />
            <feComposite in="warmShade" in2="topEdge" operator="in" result="innerShadow" />
            <feGaussianBlur in="innerShadow" stdDeviation="1.2" result="softInnerShadow" />
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFBE3D" floodOpacity="0.7" />
            <feMerge>
              <feMergeNode in="sil" />
              <feMergeNode in="softInnerShadow" />
            </feMerge>
          </filter>

          {/* Sombra física de la ficha de madera encastrada */}
          <filter
            id="wood-piece-shadow"
            x="-12%"
            y="-12%"
            width="124%"
            height="128%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow dx="0" dy="3" stdDeviation="1.2" floodColor="#3D2645" floodOpacity="0.22" />
          </filter>
        </defs>

        <BoardDecor type={model.boardDecor} />

        {orderedPieces.map((piece) => {
          const isPlaced = placedPieces.includes(piece.id);

          if (isPlaced) {
            return (
              <g
                key={piece.id}
                pointerEvents="none"
                filter="url(#wood-piece-shadow)"
                className="svg-piece-group animate-spring-pop"
              >
                {piece.render()}
              </g>
            );
          }

          const isShaking = shakingSlot === piece.id;

          return (
            <g
              key={piece.id}
              data-slot-id={piece.id}
              role="button"
              tabIndex={hasSelectedPiece ? 0 : -1}
              data-kb-item={hasSelectedPiece ? '' : undefined}
              aria-label={
                hasSelectedPiece
                  ? `Colocar ${piece.name}`
                  : `Hueco para ${piece.name}`
              }
              pointerEvents="painted"
              onClick={() => onSlotSelect(piece.id)}
              onKeyDown={(e) => {
                if (hasSelectedPiece && e.key === 'Enter') {
                  e.preventDefault();
                  onSlotSelect(piece.id);
                } else if (hasSelectedPiece && e.key === ' ') {
                  e.preventDefault();
                }
              }}
              onKeyUp={(e) => {
                if (hasSelectedPiece && e.key === ' ') {
                  e.preventDefault();
                  onSlotSelect(piece.id);
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                const dragged = e.dataTransfer.getData('text/plain');
                if (dragged) {
                  onSlotDrop(piece.id, dragged);
                }
              }}
              className={clsx(
                'svg-piece-group cursor-pointer outline-none',
                hasSelectedPiece && 'svg-piece-slot',
                isShaking && 'animate-shake'
              )}
            >
              <g
                filter={
                  hasSelectedPiece
                    ? 'url(#wood-recess-glow)'
                    : 'url(#wood-recess-filter)'
                }
              >
                {piece.render()}
              </g>

              {/* Clavija guía de madera en el centro del hueco */}
              <circle
                cx={piece.pegPoint.x}
                cy={piece.pegPoint.y}
                r={hasSelectedPiece ? 7 : 5}
                fill={hasSelectedPiece ? '#FFBE3D' : '#C99E6B'}
                stroke={hasSelectedPiece ? '#3D2645' : '#FFF8EE'}
                strokeWidth="2.2"
                pointerEvents="none"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
