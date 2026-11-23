import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { THEMES } from '../../../data/themes';
import { useGameLogic } from '../hooks/useMemotestLogic';
import { Header } from '../../../components/Header';
import { MagicalBackground } from '../../../components/MagicalBackground';
import { GameBoard } from '../components/GameBoard';
import { WinScreen } from '../../../components/WinScreen';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { useViewTransitionNavigate } from '../../../hooks/useViewTransitionNavigate';
import type { ThemeId } from '../../../types';

export const Game: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useViewTransitionNavigate();

  const theme = THEMES.find((t) => t.id === (themeId as ThemeId));

  useDocumentTitle(theme ? `${theme.name} · Memotest · Juegos de Lina` : 'Memotest · Juegos de Lina');

  const {
    cards,
    moves,
    matches,
    totalPairs,
    isWon,
    shakingCards,
    handleCardClick,
    initializeGame,
  } = useGameLogic(theme);

  if (!theme || theme.comingSoon) {
    return <Navigate to="/memotest" replace />;
  }

  return (
    <div className="min-h-dvh flex flex-col relative">
      <MagicalBackground variant="fairy" />
      <Header
        title={theme.name}
        backTo="/memotest"
        backLabel="Dibujos"
        progressCurrent={matches}
        progressTotal={totalPairs}
        onRestart={initializeGame}
      />

      <main className="flex-1 flex items-center justify-center p-2 sm:p-3 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]">
        <GameBoard
          cards={cards}
          theme={theme}
          onCardClick={handleCardClick}
          isWon={isWon}
          shakingCards={shakingCards}
        />
      </main>

      {isWon && (
        <WinScreen
          onRestart={initializeGame}
          onMenu={() => navigate('/memotest')}
          menuLabel="Otros dibujos"
          title="¡Muy bien, Lina!"
          message={`¡Encontraste todas las parejas en ${moves} intentos!`}
        />
      )}
    </div>
  );
};
