import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Game } from './games/memotest/pages/MemotestGame';
import { MemoHome } from './games/memotest/pages/MemoHome';
import { RompecabezasHome } from './games/rompecabezas/pages/RompecabezasHome';
import { RompecabezasGame } from './games/rompecabezas/RompecabezasGame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/memotest" element={<MemoHome />} />
      <Route path="/memotest/jugar/:themeId" element={<Game />} />
      <Route path="/rompecabezas" element={<RompecabezasHome />} />
      <Route path="/rompecabezas/jugar/:puzzleId" element={<RompecabezasGame />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
