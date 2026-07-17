import type { Theme } from '../types';

// Placeholder images for now (they will be replaced with real ones or AI generated)
export const THEMES: Theme[] = [
  {
    id: 'mickey',
    name: 'Mickey Mouse',
    description: '¡Encuentra a Mickey y sus amigos!',
    color: 'from-blue-400 to-blue-600',
    images: [
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mickey',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Minnie',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Donald',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Daisy',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Goofy',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Pluto',
    ],
  },
  {
    id: 'barbie',
    name: 'Barbie',
    description: '¡El mundo mágico de Barbie!',
    color: 'from-pink-400 to-pink-600',
    images: [
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Barbie1',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Barbie2',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Barbie3',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Barbie4',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Barbie5',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Barbie6',
    ],
  },
  {
    id: 'princesas',
    name: 'Princesas',
    description: '¡Princesas Disney!',
    color: 'from-yellow-400 to-amber-600',
    images: [
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Elsa',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ariel',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Bella',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cenicienta',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rapunzel',
      'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Moana',
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
