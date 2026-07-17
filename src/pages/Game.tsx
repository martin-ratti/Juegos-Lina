import { useParams, Navigate } from 'react-router-dom';
import { THEMES } from '../data/themes';
import { useGameLogic } from '../hooks/useGameLogic';
import { Header } from '../components/Header';
import { GameBoard } from '../components/GameBoard';
import { WinScreen } from '../components/WinScreen';
import type { ThemeId } from '../types';

export const Game: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  
  // Find the selected theme
  const theme = THEMES.find(t => t.id === themeId as ThemeId);
  
  const {
    cards,
    matches,
    isWon,
    handleCardClick,
    initializeGame
  } = useGameLogic(theme);

  // If theme is invalid or coming soon, redirect to home
  if (!theme || theme.comingSoon) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${theme.color} bg-opacity-10`}>
      <Header 
        theme={theme} 
        matches={matches} 
        totalPairs={6} // 6 pairs for the 3x4 grid 
      />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <GameBoard 
          cards={cards} 
          theme={theme} 
          onCardClick={handleCardClick}
          isWon={isWon}
        />
      </main>

      {isWon && (
        <WinScreen onRestart={initializeGame} />
      )}
    </div>
  );
};
