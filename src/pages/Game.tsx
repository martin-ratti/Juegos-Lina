import { useParams, Navigate } from 'react-router-dom';
import { THEMES } from '../data/themes';
import { useGameLogic } from '../hooks/useGameLogic';
import { Header } from '../components/Header';
import { GameBoard } from '../components/GameBoard';
import { WinScreen } from '../components/WinScreen';
import type { ThemeId } from '../types';

export const Game: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  
  const theme = THEMES.find(t => t.id === themeId as ThemeId);
  
  const {
    cards,
    matches,
    totalPairs,
    isWon,
    shakingCards,
    handleCardClick,
    initializeGame
  } = useGameLogic(theme);

  if (!theme || theme.comingSoon) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Header 
        theme={theme} 
        matches={matches} 
        totalPairs={totalPairs}
      />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <GameBoard 
          cards={cards} 
          theme={theme} 
          onCardClick={handleCardClick}
          isWon={isWon}
          shakingCards={shakingCards}
        />
      </main>

      {isWon && (
        <WinScreen onRestart={initializeGame} />
      )}
    </div>
  );
};
