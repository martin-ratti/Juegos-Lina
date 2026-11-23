export type ThemeId = 'mickey' | 'barbie' | 'princesas' | 'familia';

export interface ThemeCardSource {
  image: string;
  label: string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  cardBg: string;
  tileBg: string;
  lipColor: string;
  cards: ThemeCardSource[];
  comingSoon?: boolean;
}

export interface CardItem {
  id: string;
  imageId: string;
  image: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}
