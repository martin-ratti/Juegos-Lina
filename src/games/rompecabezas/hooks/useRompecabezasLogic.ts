import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { shuffle } from '../../../utils/shuffle';
import { PIECES } from '../data/pieces';
import type { PieceId, PieceInfo } from '../types';

export const useRompecabezasLogic = () => {
  const [placedPieces, setPlacedPieces] = useState<PieceId[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<PieceId | null>(null);
  const [shakingSlot, setShakingSlot] = useState<PieceId | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [shuffledBank, setShuffledBank] = useState<PieceInfo[]>([]);

  const initializeGame = useCallback(() => {
    setPlacedPieces([]);
    setSelectedPiece(null);
    setShakingSlot(null);
    setIsWon(false);
    setShuffledBank(shuffle(PIECES));
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const availablePieces = shuffledBank.filter((p) => !placedPieces.includes(p.id));

  const handleBankSelect = useCallback((id: PieceId) => {
    setSelectedPiece((prev) => (prev === id ? null : id));
  }, []);

  const handleSlotSelect = useCallback(
    (targetId: PieceId) => {
      if (!selectedPiece) return;

      if (selectedPiece === targetId) {
        // Correct piece!
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF8BA7', '#FFD3B6', '#FFC6FF'],
        });

        const newPlaced = [...placedPieces, targetId];
        setPlacedPieces(newPlaced);
        setSelectedPiece(null);

        if (newPlaced.length === PIECES.length) {
          setTimeout(() => setIsWon(true), 600);
        }
      } else {
        // Wrong slot
        setShakingSlot(targetId);
        setTimeout(() => setShakingSlot(null), 500);
        setSelectedPiece(null);
      }
    },
    [selectedPiece, placedPieces]
  );

  return {
    placedPieces,
    selectedPiece,
    setSelectedPiece,
    shakingSlot,
    isWon,
    availablePieces,
    handleBankSelect,
    handleSlotSelect,
    handleRestart: initializeGame,
  };
};
