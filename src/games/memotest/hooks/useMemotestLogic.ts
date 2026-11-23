import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import type { CardItem, Theme } from '../../../types';
import { shuffle } from '../../../utils/shuffle';

export const useGameLogic = (theme: Theme | undefined) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [shakingCards, setShakingCards] = useState<number[]>([]);
  const timersRef = useRef<number[]>([]);

  const totalPairs = theme?.cards.length ?? 0;

  const clearAllTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  const scheduleTimeout = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((t) => t !== id);
      fn();
    }, delayMs);
    timersRef.current.push(id);
    return id;
  }, []);

  const initializeGame = useCallback(() => {
    clearAllTimers();
    if (!theme || theme.cards.length === 0) return;

    const pairedCards = [...theme.cards, ...theme.cards];
    const shuffledCards = shuffle(pairedCards).map((item, index) => ({
      id: `${index}-${Date.now()}-${Math.random()}`,
      imageId: item.image,
      image: item.image,
      label: item.label,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setIsLocked(false);
    setShakingCards([]);
  }, [theme, clearAllTimers]);

  useEffect(() => {
    initializeGame();
    return () => clearAllTimers();
  }, [initializeGame, clearAllTimers]);

  // Precarga de imágenes para transiciones suaves
  useEffect(() => {
    const cardBack = new Image();
    cardBack.src = '/images/lina.jpg';
    if (theme?.cards) {
      theme.cards.forEach((item) => {
        const img = new Image();
        img.src = item.image;
      });
    }
  }, [theme]);

  const handleCardClick = useCallback(
    (index: number) => {
      const target = cards[index];
      if (isLocked || !target || target.isMatched || flippedCards.includes(index)) {
        return;
      }

      const newFlipped = [...flippedCards, index];
      setFlippedCards(newFlipped);

      setCards((prev) => {
        const newCards = [...prev];
        if (newCards[index]) {
          newCards[index] = { ...newCards[index], isFlipped: true };
        }
        return newCards;
      });

      if (newFlipped.length === 2) {
        setIsLocked(true);
        setMoves((m) => m + 1);

        const [firstIndex, secondIndex] = newFlipped;
        const match = cards[firstIndex]?.imageId === cards[secondIndex]?.imageId;

        if (match) {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FF8C00', '#FF1493', '#00E5FF', '#76FF03'],
            gravity: 0.85,
            disableForReducedMotion: true,
          });

          scheduleTimeout(() => {
            setMatches((m) => m + 1);
            setCards((prev) => {
              const newCards = [...prev];
              if (newCards[firstIndex]) {
                newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
              }
              if (newCards[secondIndex]) {
                newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
              }
              return newCards;
            });
            setFlippedCards([]);
            setIsLocked(false);
          }, 380);
        } else {
          scheduleTimeout(() => {
            setShakingCards([firstIndex, secondIndex]);
          }, 700);

          scheduleTimeout(() => {
            setCards((prev) => {
              const newCards = [...prev];
              if (newCards[firstIndex]) {
                newCards[firstIndex] = { ...newCards[firstIndex], isFlipped: false };
              }
              if (newCards[secondIndex]) {
                newCards[secondIndex] = { ...newCards[secondIndex], isFlipped: false };
              }
              return newCards;
            });
            setFlippedCards([]);
            setIsLocked(false);
            setShakingCards([]);
          }, 1550);
        }
      }
    },
    [isLocked, cards, flippedCards, scheduleTimeout]
  );

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
