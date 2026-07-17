import { useState, useEffect, useCallback } from 'react';
import type { CardItem, Theme } from '../../../types';
import confetti from 'canvas-confetti';

// Fisher-Yates shuffle — correct uniform distribution
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const useGameLogic = (theme: Theme | undefined) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [shakingCards, setShakingCards] = useState<number[]>([]);
  const totalPairs = theme?.images.length ?? 0;

  const initializeGame = useCallback(() => {
    if (!theme || theme.images.length === 0) return;
    
    const pairedImages = [...theme.images, ...theme.images];
    const shuffledCards = shuffle(pairedImages).map((image, index) => ({
      id: `${index}-${Date.now()}-${Math.random()}`,
      imageId: image,
      image,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setIsLocked(false);
    setShakingCards([]);
  }, [theme]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isMatched || flippedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);
    
    setCards(prev => {
      const newCards = [...prev];
      newCards[index] = { ...newCards[index], isFlipped: true };
      return newCards;
    });

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);

      const [firstIndex, secondIndex] = newFlipped;
      const match = cards[firstIndex].imageId === cards[secondIndex].imageId;

      if (match) {
        // Mini confetti burst for each match
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF8C00', '#FF1493', '#00E5FF', '#76FF03'],
          gravity: 0.8,
        });

        // Small delay so the player sees both cards before marking as matched
        setTimeout(() => {
          setMatches(m => m + 1);
          setCards(prev => {
            const newCards = [...prev];
            newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
            newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
            return newCards;
          });
          setFlippedCards([]);
          setIsLocked(false);
        }, 400);
      } else {
        // Shake animation on mismatch
        setTimeout(() => {
          setShakingCards([firstIndex, secondIndex]);
        }, 800);

        // Flip cards back after showing them
        setTimeout(() => {
          setCards(prev => {
            const newCards = [...prev];
            newCards[firstIndex] = { ...newCards[firstIndex], isFlipped: false };
            newCards[secondIndex] = { ...newCards[secondIndex], isFlipped: false };
            return newCards;
          });
          setFlippedCards([]);
          setIsLocked(false);
          setShakingCards([]);
        }, 1800);
      }
    }
  };

  const isWon = totalPairs > 0 && matches === totalPairs && cards.length > 0;

  return {
    cards,
    moves,
    matches,
    totalPairs,
    isWon,
    shakingCards,
    handleCardClick,
    initializeGame,
  };
};
