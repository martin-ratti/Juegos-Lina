import type React from 'react';

export type PuzzleLevel = 1 | 2 | 3;

export interface PuzzlePieceDef {
  id: string;
  name: string;
  /** ViewBox exacto para recortar y centrar esta pieza en el banco */
  cropBox: string;
  /** Punto guía donde se dibuja el botoncito de madera cuando el hueco espera pieza */
  pegPoint: { x: number; y: number };
  /** Orden de apilado en el lienzo unificado 300x320 */
  zOrder: number;
  render: () => React.ReactNode;
}

export type BoardDecorType = 'meadow' | 'sunny' | 'sky';

export interface PuzzleModel {
  id: string;
  name: string;
  shortName: string;
  level: PuzzleLevel;
  cardBg: string;
  lipClass: string;
  boardDecor: BoardDecorType;
  pieces: PuzzlePieceDef[];
}
