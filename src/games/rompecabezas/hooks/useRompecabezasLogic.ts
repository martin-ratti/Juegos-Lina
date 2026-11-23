import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { shuffle } from '../../../utils/shuffle';
import type { PuzzleModel, PuzzlePieceDef } from '../types';
import { markPuzzleCompleted } from '../utils/progress';

export const useRompecabezasLogic = (model: PuzzleModel | undefined) => {
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [shakingSlot, setShakingSlot] = useState<string | null>(null);
  const [bankHint, setBankHint] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [shuffledBank, setShuffledBank] = useState<PuzzlePieceDef[]>([]);
  const timersRef = useRef<number[]>([]);

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
    setPlacedPieces([]);
    setSelectedPiece(null);
    setShakingSlot(null);
    setBankHint(false);
    setIsWon(false);
    setShuffledBank(model ? shuffle(model.pieces) : []);
  }, [model, clearAllTimers]);

  useEffect(() => {
    initializeGame();
    return () => clearAllTimers();
  }, [initializeGame, clearAllTimers]);

  const availablePieces = shuffledBank.filter((p) => !placedPieces.includes(p.id));

  const handleBankSelect = useCallback((id: string) => {
    setBankHint(false);
    setSelectedPiece((prev) => (prev === id ? null : id));
  }, []);

  const handleSlotSelect = useCallback(
    (targetId: string, pieceOverride?: string) => {
      if (!model || placedPieces.includes(targetId)) {
        return;
      }

      const activePiece = pieceOverride ?? selectedPiece;

      if (!activePiece) {
        setBankHint(true);
        scheduleTimeout(() => setBankHint(false), 600);
        return;
      }

      if (activePiece === targetId) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F25C78', '#FFBE3D', '#5BC0EB', '#6BCB9F', '#C8A2F6'],
          disableForReducedMotion: true,
        });

        const newPlaced = [...placedPieces, targetId];
        setPlacedPieces(newPlaced);
        setSelectedPiece(null);

        if (newPlaced.length === model.pieces.length) {
          markPuzzleCompleted(model.id);
          scheduleTimeout(() => setIsWon(true), 600);
        }
      } else {
        setShakingSlot(targetId);
        scheduleTimeout(() => setShakingSlot(null), 480);
      }
    },
    [model, selectedPiece, placedPieces, scheduleTimeout]
  );

  return {
    placedPieces,
    selectedPiece,
    setSelectedPiece,
    shakingSlot,
    bankHint,
    isWon,
    availablePieces,
    handleBankSelect,
    handleSlotSelect,
    handleRestart: initializeGame,
  };
};
