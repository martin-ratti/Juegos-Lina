import type { Theme } from '../types';

export const THEMES: Theme[] = [
  {
    id: 'mickey',
    name: 'Mickey Mouse',
    description: '¡Encuentra a Mickey y sus amigos!',
    color: 'from-red-400 to-red-600',
    images: [
      '/images/mickey/1.png', // Mickey
      '/images/mickey/2.png', // Minnie
      '/images/mickey/3.png', // Donald
      '/images/mickey/4.png', // Daisy
      '/images/mickey/5.png', // Goofy
      '/images/mickey/6.png', // Pluto
    ],
  },
  {
    id: 'barbie',
    name: 'Barbie',
    description: '¡El mundo mágico de Barbie!',
    color: 'from-pink-400 to-fuchsia-500',
    images: [
      '/images/barbie/1.png', // Barbie Baila
      '/images/barbie/2.png', // Barbie Fashion
      '/images/barbie/3.png', // Barbie Frio
      '/images/barbie/4.png', // Barbie Logo
      '/images/barbie/5.png', // Barbie Perro
      '/images/barbie/6.png', // Barbie Surf
    ],
  },
  {
    id: 'princesas',
    name: 'Princesas',
    description: '¡Princesas Disney!',
    color: 'from-purple-400 to-indigo-500',
    images: [
      '/images/princesas/1.png', // Elsa
      '/images/princesas/2.png', // Ariel
      '/images/princesas/3.png', // Bella
      '/images/princesas/4.png', // Cenicienta
      '/images/princesas/5.png', // Rapunzel
      '/images/princesas/6.png', // Blancanieves
    ],
  },
  {
    id: 'familia',
    name: 'Familia',
    description: '¡Próximamente fotos de la familia!',
    color: 'from-green-400 to-emerald-500',
    images: [],
    comingSoon: true,
  },
];
