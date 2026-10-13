import type { PieceId, PieceInfo } from '../types';

export const PIECES: PieceInfo[] = [
  { id: 'hair', name: 'Pelo' },
  { id: 'head', name: 'Cara' },
  { id: 'leftArm', name: 'Brazo Izq.' },
  { id: 'torso', name: 'Cuerpo' },
  { id: 'rightArm', name: 'Brazo Der.' },
  { id: 'leftLeg', name: 'Pierna Izq.' },
  { id: 'rightLeg', name: 'Pierna Der.' },
];

export const BOARD_SLOTS: PieceId[] = [
  'hair',
  'head',
  'leftArm',
  'torso',
  'rightArm',
  'leftLeg',
  'rightLeg',
];
