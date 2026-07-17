
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { MemoHome } from './pages/MemoHome';
import { GlobosGame } from './pages/GlobosGame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/memotest" element={<MemoHome />} />
      <Route path="/memotest/jugar/:themeId" element={<Game />} />
      <Route path="/globos" element={<GlobosGame />} />
    </Routes>
  );
}

export default App;
