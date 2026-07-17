import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { clsx } from 'clsx';
import { WinScreen } from '../memotest/components/WinScreen';
import { useKeyboard } from '../../hooks/useKeyboard';

type PieceId = 'head' | 'torso' | 'leftArm' | 'rightArm' | 'legs';

interface PieceInfo {
  id: PieceId;
  name: string;
}

const PIECES: PieceInfo[] = [
  { id: 'head', name: 'Cabeza' },
  { id: 'leftArm', name: 'Brazo Izquierdo' },
  { id: 'torso', name: 'Cuerpo' },
  { id: 'rightArm', name: 'Brazo Derecho' },
  { id: 'legs', name: 'Piernas' },
];

const HeadRenderer = ({ isPlaceholder }: { isPlaceholder?: boolean }) => (
  <div className={clsx("w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center relative shadow-sm transition-all duration-300", isPlaceholder ? "bg-white/30 border-4 border-dashed border-white/50" : "bg-[#ffcc99]")}>
    {!isPlaceholder && (
      <>
        <div className="absolute top-7 left-5 sm:top-8 sm:left-6 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-800 rounded-full animate-bounce-slight" style={{ animationDelay: '200ms' }}></div>
        <div className="absolute top-7 right-5 sm:top-8 sm:right-6 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-800 rounded-full animate-bounce-slight" style={{ animationDelay: '400ms' }}></div>
        <div className="absolute bottom-5 sm:bottom-6 w-6 h-2.5 sm:w-8 sm:h-3 border-b-4 border-gray-800 rounded-full"></div>
      </>
    )}
  </div>
);

const TorsoRenderer = ({ isPlaceholder }: { isPlaceholder?: boolean }) => (
  <div className={clsx("w-24 h-28 sm:w-28 sm:h-32 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300", isPlaceholder ? "bg-white/30 border-4 border-dashed border-white/50" : "bg-pink-400 border-2 border-pink-500")}>
    {!isPlaceholder && <span className="text-3xl sm:text-4xl animate-pulse">⭐</span>}
  </div>
);

const ArmRenderer = ({ isPlaceholder, rotateClass }: { isPlaceholder?: boolean, rotateClass?: string }) => (
  <div className={clsx("w-7 h-20 sm:w-8 sm:h-24 rounded-full shadow-sm transition-all duration-300", rotateClass, isPlaceholder ? "bg-white/30 border-4 border-dashed border-white/50" : "bg-[#ffcc99]")}></div>
);

const LegsRenderer = ({ isPlaceholder }: { isPlaceholder?: boolean }) => (
  <div className={clsx("w-24 h-24 sm:w-28 sm:h-28 rounded-t-xl rounded-b-md flex justify-between shadow-sm transition-all duration-300", isPlaceholder ? "" : "")}>
    <div className={clsx("w-[42%] h-full rounded-b-md", isPlaceholder ? "bg-white/30 border-4 border-dashed border-white/50" : "bg-blue-500 border-b-4 border-blue-600")}></div>
    <div className={clsx("w-[42%] h-full rounded-b-md", isPlaceholder ? "bg-white/30 border-4 border-dashed border-white/50" : "bg-blue-500 border-b-4 border-blue-600")}></div>
  </div>
);

const PieceComponent = ({ id, isPlaceholder = false }: { id: PieceId, isPlaceholder?: boolean }) => {
  switch (id) {
    case 'head': return <HeadRenderer isPlaceholder={isPlaceholder} />;
    case 'torso': return <TorsoRenderer isPlaceholder={isPlaceholder} />;
    case 'leftArm': return <ArmRenderer isPlaceholder={isPlaceholder} rotateClass={!isPlaceholder ? "-rotate-12" : ""} />;
    case 'rightArm': return <ArmRenderer isPlaceholder={isPlaceholder} rotateClass={!isPlaceholder ? "rotate-12" : ""} />;
    case 'legs': return <LegsRenderer isPlaceholder={isPlaceholder} />;
    default: return null;
  }
};

export const RompecabezasGame: React.FC = () => {
  const navigate = useNavigate();
  const [placedPieces, setPlacedPieces] = useState<PieceId[]>([]);
  const [isWon, setIsWon] = useState(false);

  const availablePieces = PIECES.filter(p => !placedPieces.includes(p.id));

  const placePiece = (id: PieceId) => {
    if (placedPieces.includes(id)) return;
    
    // Mini confetti on placement
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF8C00', '#FF1493', '#00E5FF', '#76FF03']
    });

    const newPlaced = [...placedPieces, id];
    setPlacedPieces(newPlaced);

    if (newPlaced.length === PIECES.length) {
      setTimeout(() => setIsWon(true), 500);
    }
  };

  const { focusedIndex, setFocusedIndex } = useKeyboard({
    gridColumns: 3, // For the scattered pieces
    totalItems: availablePieces.length,
    onEnter: (index: number) => {
      const piece = availablePieces[index];
      if (piece) placePiece(piece.id);
    },
    onEscape: () => navigate('/'),
    isActive: !isWon && availablePieces.length > 0
  });

  // Shuffle pieces initially so they aren't in body order
  const [shuffledPieces, setShuffledPieces] = useState<PieceInfo[]>([]);
  useEffect(() => {
    setShuffledPieces([...PIECES].sort(() => Math.random() - 0.5));
  }, []);

  const currentAvailable = shuffledPieces.filter(p => !placedPieces.includes(p.id));

  const handleRestart = () => {
    setPlacedPieces([]);
    setIsWon(false);
    setShuffledPieces([...PIECES].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="relative min-h-dvh flex flex-col bg-gradient-to-b from-purple-300 via-pink-200 to-orange-100 overflow-hidden">
      {/* Header */}
      <header className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between bg-white/70 backdrop-blur-lg sticky top-0 z-30 shadow-md border-b border-white/50">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-purple-50 text-purple-600 rounded-full font-extrabold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-purple-200 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm">Volver</span>
        </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl text-center text-purple-600 flex-1 px-2 font-extrabold drop-shadow-sm truncate">
          🧩 Rompecabezas 🧩
        </h1>
        
        <div className="w-20 shrink-0"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 flex flex-col items-center justify-between py-6 px-4">
        
        {/* Silhouette Center */}
        <div className="relative w-64 h-80 sm:w-72 sm:h-96 mt-4 sm:mt-8 bg-white/20 backdrop-blur-sm rounded-[3rem] border-4 border-white/50 shadow-inner flex flex-col items-center p-6 animate-fade-in">
          
          {/* Head */}
          <div className="absolute top-4 sm:top-6 z-30">
            {placedPieces.includes('head') ? <PieceComponent id="head" /> : <PieceComponent id="head" isPlaceholder />}
          </div>
          
          {/* Left Arm */}
          <div className="absolute top-28 sm:top-32 left-10 sm:left-12 z-10 origin-top rotate-12">
            {placedPieces.includes('leftArm') ? <PieceComponent id="leftArm" /> : <PieceComponent id="leftArm" isPlaceholder />}
          </div>
          
          {/* Right Arm */}
          <div className="absolute top-28 sm:top-32 right-10 sm:right-12 z-10 origin-top -rotate-12">
            {placedPieces.includes('rightArm') ? <PieceComponent id="rightArm" /> : <PieceComponent id="rightArm" isPlaceholder />}
          </div>
          
          {/* Torso */}
          <div className="absolute top-[5.5rem] sm:top-28 z-20">
            {placedPieces.includes('torso') ? <PieceComponent id="torso" /> : <PieceComponent id="torso" isPlaceholder />}
          </div>
          
          {/* Legs */}
          <div className="absolute top-[12rem] sm:top-[13.5rem] z-10">
            {placedPieces.includes('legs') ? <PieceComponent id="legs" /> : <PieceComponent id="legs" isPlaceholder />}
          </div>
          
        </div>

        {/* Scattered Pieces Bank */}
        <div className="w-full max-w-2xl mt-8 mb-4">
          <p className="text-center text-purple-800 font-bold mb-4 bg-white/50 inline-block px-6 py-2 rounded-full mx-auto shadow-sm border border-white/60">
            {currentAvailable.length > 0 ? "¡Elegí una pieza para armar el cuerpo!" : "¡Terminaste!"}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 min-h-[140px]">
            {currentAvailable.map((piece, index) => {
              const isFocused = focusedIndex === index;
              
              return (
                <button
                  key={piece.id}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onClick={() => placePiece(piece.id)}
                  className={clsx(
                    "flex flex-col items-center gap-2 p-2 sm:p-3 rounded-2xl transition-all duration-300 animate-pop-in",
                    isFocused ? "scale-110 bg-white/60 shadow-xl ring-4 ring-yellow-400 ring-offset-2" : "hover:scale-105 bg-white/40 shadow-md hover:bg-white/50"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center pointer-events-none transform scale-[0.6] sm:scale-75 origin-center">
                    <PieceComponent id={piece.id} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-purple-700">{piece.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </main>

      {isWon && <WinScreen onRestart={handleRestart} />}
    </div>
  );
};
