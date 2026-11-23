import React, { useRef, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { MagicalBackground } from '../../components/MagicalBackground';
import { WinScreen } from '../../components/WinScreen';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useViewTransitionNavigate } from '../../hooks/useViewTransitionNavigate';
import { getNextPuzzle, getPuzzleById } from './data/puzzles';
import { useRompecabezasLogic } from './hooks/useRompecabezasLogic';
import { BodySilhouette } from './components/BodySilhouette';
import { PieceBank } from './components/PieceBank';

export const RompecabezasGame: React.FC = () => {
  const { puzzleId } = useParams<{ puzzleId: string }>();
  const navigate = useViewTransitionNavigate();
  const bankRef = useRef<HTMLDivElement>(null);
  const silhouetteSvgRef = useRef<SVGSVGElement>(null);
  const wasKeyboardSelectedRef = useRef(false);

  const model = getPuzzleById(puzzleId);
  const nextPuzzle = model ? getNextPuzzle(model.id) : undefined;

  useDocumentTitle(
    model ? `${model.name} · Rompecabezas · Juegos de Lina` : 'Rompecabezas · Juegos de Lina'
  );

  const {
    placedPieces,
    selectedPiece,
    setSelectedPiece,
    shakingSlot,
    bankHint,
    isWon,
    availablePieces,
    handleBankSelect,
    handleSlotSelect,
    handleRestart,
  } = useRompecabezasLogic(model);

  useKeyboard({
    containerRef: bankRef,
    onEscape: () => navigate('/rompecabezas'),
    isActive: Boolean(model) && !isWon && selectedPiece === null && availablePieces.length > 0,
  });

  useKeyboard({
    containerRef: silhouetteSvgRef,
    onEscape: () => setSelectedPiece(null),
    isActive: Boolean(model) && !isWon && selectedPiece !== null,
  });

  useEffect(() => {
    const active = document.activeElement as (HTMLElement | SVGElement) | null;
    if (selectedPiece !== null && active && bankRef.current?.contains(active)) {
      wasKeyboardSelectedRef.current = active.matches(':focus-visible');
      if (wasKeyboardSelectedRef.current) {
        const firstSlot = silhouetteSvgRef.current?.querySelector<SVGElement>('[data-kb-item]');
        firstSlot?.focus();
      }
    } else if (selectedPiece === null && wasKeyboardSelectedRef.current) {
      wasKeyboardSelectedRef.current = false;
      const firstPiece = bankRef.current?.querySelector<HTMLElement>('[data-kb-item]');
      firstPiece?.focus();
    }
  }, [selectedPiece]);

  if (!model) {
    return <Navigate to="/rompecabezas" replace />;
  }

  const selectedPieceObj = model.pieces.find((p) => p.id === selectedPiece);
  const subtitleText = selectedPieceObj
    ? `Poné: ${selectedPieceObj.name}`
    : 'Elegí una pieza';

  return (
    <div className="relative min-h-dvh flex flex-col">
      <MagicalBackground variant="meadow" />
      <Header
        title={model.shortName}
        subtitle={subtitleText}
        backTo="/rompecabezas"
        backLabel="Dibujos"
        progressCurrent={placedPieces.length}
        progressTotal={model.pieces.length}
        onRestart={handleRestart}
      />

      <main className="flex-1 w-full max-w-[98vw] 2xl:max-w-[95vw] mx-auto flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-5 lg:gap-8 p-2 sm:p-4 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]">
        <BodySilhouette
          svgRef={silhouetteSvgRef}
          model={model}
          placedPieces={placedPieces}
          selectedPiece={selectedPiece}
          shakingSlot={shakingSlot}
          onSlotSelect={(targetId) => handleSlotSelect(targetId)}
          onSlotDrop={(targetId, droppedId) => handleSlotSelect(targetId, droppedId)}
        />

        {availablePieces.length > 0 && (
          <PieceBank
            containerRef={bankRef}
            availablePieces={availablePieces}
            selectedPiece={selectedPiece}
            bankHint={bankHint}
            onSelectPiece={handleBankSelect}
          />
        )}
      </main>

      {isWon && (
        <WinScreen
          onRestart={handleRestart}
          onMenu={() => navigate('/rompecabezas')}
          menuLabel="Otros dibujos"
          onNext={
            nextPuzzle
              ? () => navigate(`/rompecabezas/jugar/${nextPuzzle.id}`)
              : undefined
          }
          nextLabel={nextPuzzle ? `Siguiente: ${nextPuzzle.shortName}` : undefined}
          title={`¡Armaste ${model.shortName}!`}
          message="¡Pusiste todas las piezas en su lugar!"
        />
      )}
    </div>
  );
};
