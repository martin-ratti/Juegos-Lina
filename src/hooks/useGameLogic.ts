import { useState, useEffect, useCallback } from 'react';
import type { CardItem, Theme } from '../types';

export const useGameLogic = (theme: Theme | undefined) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // indices of flipped cards
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = useCallback(() => {
    if (!theme) return;
    
    // Create pairs and shuffle
    const pairedImages = [...theme.images, ...theme.images];
    const shuffledCards = pairedImages
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: `${index}-${Math.random()}`,
        imageId: image, // Use the image URL as the matching ID for now
        image,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setIsLocked(false);
  }, [theme]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (index: number) => {
    // Prevent clicking if board is locked, card is already matched, or card is already flipped
    if (isLocked || cards[index].isMatched || flippedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);
    
    // Update card to be flipped visually
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
        setMatches(m => m + 1);
        setCards(prev => {
          const newCards = [...prev];
          newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
          newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
          return newCards;
        });
        setFlippedCards([]);
        setIsLocked(false);
      } else {
        // Longer timeout for a 3 year old to see the cards
        setTimeout(() => {
          setCards(prev => {
            const newCards = [...prev];
            newCards[firstIndex] = { ...newCards[firstIndex], isFlipped: false };
            newCards[secondIndex] = { ...newCards[secondIndex], isFlipped: false };
            return newCards;
          });
          setFlippedCards([]);
          setIsLocked(false);
        }, 1500);
      }
    }
  };

  const isWon = matches === 6 && cards.length > 0; // 6 pairs for our 3x4 grid

  return {
    cards,
    moves,
    matches,
    isWon,
    handleCardClick,
    initializeGame,
  };
};
