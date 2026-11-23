import type { PuzzleLevel, PuzzleModel } from '../types';
import { LEVEL_1_MODELS } from './modelsLevel1';
import { LEVEL_2_MODELS } from './modelsLevel2';
import { LEVEL_3_MODELS } from './modelsLevel3';

export const PUZZLE_MODELS: PuzzleModel[] = [
  ...LEVEL_1_MODELS,
  ...LEVEL_2_MODELS,
  ...LEVEL_3_MODELS,
];

export const PUZZLE_LEVELS: {
  level: PuzzleLevel;
  title: string;
  subtitle: string;
  badgeColor: string;
}[] = [
  {
    level: 1,
    title: 'Nivel 1',
    subtitle: '4 piezas grandes para empezar',
    badgeColor: 'bg-[#6BCB9F] text-[#1D3B2C]',
  },
  {
    level: 2,
    title: 'Nivel 2',
    subtitle: '5 piezas mágicas',
    badgeColor: 'bg-[#5BC0EB] text-[#15394A]',
  },
  {
    level: 3,
    title: 'Nivel 3',
    subtitle: '6 y 7 piezas para expertas',
    badgeColor: 'bg-[#FFBE3D] text-[#3D2645]',
  },
];

export function getPuzzleById(id: string | undefined): PuzzleModel | undefined {
  return PUZZLE_MODELS.find((m) => m.id === id);
}

export function getNextPuzzle(currentId: string): PuzzleModel | undefined {
  const idx = PUZZLE_MODELS.findIndex((m) => m.id === currentId);
  if (idx === -1) return undefined;
  return PUZZLE_MODELS[(idx + 1) % PUZZLE_MODELS.length];
}
