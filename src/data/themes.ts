import type { Theme } from '../types';

export const THEMES: Theme[] = [
  {
    id: 'mickey',
    name: 'Mickey Mouse',
    description: '¡Encuentra a Mickey y sus amigos!',
    color: 'from-blue-400 to-blue-600',
    images: [
      '/images/mickey/1.png',
      '/images/mickey/2.png',
      '/images/mickey/3.png',
      '/images/mickey/4.png',
      '/images/mickey/5.png',
      '/images/mickey/6.png',
    ],
  },
  {
    id: 'barbie',
    name: 'Barbie',
    description: '¡El mundo mágico de Barbie!',
    color: 'from-pink-400 to-pink-600',
    images: [
      '/images/barbie/1.png',
      '/images/barbie/2.png',
      '/images/barbie/3.png',
      '/images/barbie/4.png',
      '/images/barbie/5.png',
      '/images/barbie/6.png',
    ],
  },
  {
    id: 'princesas',
    name: 'Princesas',
    description: '¡Princesas Disney!',
    color: 'from-yellow-400 to-amber-600',
    images: [
      '/images/princesas/1.png',
      '/images/princesas/2.png',
      '/images/princesas/3.png',
      '/images/princesas/4.png',
      '/images/princesas/5.png',
      '/images/princesas/6.png',
    ],
  },
  {
    id: 'familia',
    name: 'Familia',
    description: '¡Próximamente fotos de la familia!',
    color: 'from-green-400 to-green-600',
    images: [],
    comingSoon: true,
  },
];
