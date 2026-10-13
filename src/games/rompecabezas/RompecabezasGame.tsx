import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { WinScreen } from '../../components/WinScreen';
import { useKeyboard } from '../../hooks/useKeyboard';
import { BOARD_SLOTS } from './data/pieces';
import { useRompecabezasLogic } from './hooks/useRompecabezasLogic';
import { BodySilhouette } from './components/BodySilhouette';
import { PieceBank } from './components/PieceBank';

export const RompecabezasGame: React.FC = () => {
  const navigate = useNavigate();

  const {
    placedPieces,
    selectedPiece,
    setSelectedPiece,
    shakingSlot,
    isWon,
    availablePieces,
    handleBankSelect,
    handleSlotSelect,
    handleRestart,
  } = useRompecabezasLogic();

  // Keyboard controls for bank
  const { focusedIndex: bankFocusedIndex, setFocusedIndex: setBankFocusedIndex } = useKeyboard({
    gridColumns: 3,
    totalItems: availablePieces.length,
    onEnter: (index: number) => {
      const piece = availablePieces[index];
      if (piece) handleBankSelect(piece.id);
    },
    onEscape: () => navigate('/'),
    isActive: !isWon && selectedPiece === null && availablePieces.length > 0,
  });

  // For board slots keyboard navigation
  const missingSlots = BOARD_SLOTS.filter((id) => !placedPieces.includes(id));

  const { focusedIndex: boardFocusedIndex } = useKeyboard({
    gridColumns: 2,
    totalItems: missingSlots.length,
    onEnter: (index: number) => {
      const targetId = missingSlots[index];
      if (targetId) handleSlotSelect(targetId);
    },
    onEscape: () => setSelectedPiece(null),
    isActive: !isWon && selectedPiece !== null,
  });

  return (
    <div className="relative min-h-dvh flex flex-col bg-gradient-to-b from-teal-200 via-cyan-100 to-blue-100 overflow-hidden">
      {/* Header */}
      <header className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between bg-white/95 sticky top-0 z-30 shadow-md border-b border-white/50">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-cyan-50 text-cyan-600 rounded-full font-extrabold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-cyan-200 shrink-0 cursor-pointer"
          aria-label="Volver al menú principal"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm">Volver</span>
        </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl text-center text-cyan-700 flex-1 px-2 font-extrabold drop-shadow-sm truncate">
          {selectedPiece ? '👇 ¡Tocá dónde va!' : '👆 ¡Elegí una pieza!'}
        </h1>

        <div className="w-20 shrink-0" />
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:gap-12 py-2 sm:py-6 px-2 sm:px-4">
        {/* Silhouette Center */}
        <BodySilhouette
          placedPieces={placedPieces}
          selectedPiece={selectedPiece}
          shakingSlot={shakingSlot}
          targetSlotId={missingSlots[boardFocusedIndex]}
          onSlotSelect={handleSlotSelect}
        />

        {/* Scattered Pieces Bank */}
        <PieceBank
          availablePieces={availablePieces}
          selectedPiece={selectedPiece}
          focusedIndex={bankFocusedIndex}
          onSelectPiece={handleBankSelect}
          onHoverPiece={(idx) => {
            if (selectedPiece === null) setBankFocusedIndex(idx);
          }}
        />
      </main>

      {isWon && (
        <WinScreen
          onRestart={handleRestart}
          title="¡Armaste el cuerpo!"
          message="¡Pusiste todas las piezas en su lugar! 🧑"
        />
      )}
    </div>
  );
};
