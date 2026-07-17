
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Game } from './games/memotest/pages/MemotestGame';
import { MemoHome } from './games/memotest/pages/MemoHome';
import { GlobosGame } from './games/globos/GlobosGame';

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
