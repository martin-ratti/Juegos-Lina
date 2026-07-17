export type ThemeId = 'mickey' | 'barbie' | 'princesas' | 'familia';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  color: string;
  images: string[];
  comingSoon?: boolean;
}

export interface CardItem {
  id: string; // unique id per card instance
  imageId: string; // id to match pairs
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: CardItem[];
  moves: number;
  matches: number;
  isWon: boolean;
}
