import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { clsx } from 'clsx';
import { WinScreen } from '../memotest/components/WinScreen';
import { useKeyboard } from '../../hooks/useKeyboard';

type PieceId = 'head' | 'torso' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg';

interface PieceInfo {
  id: PieceId;
  name: string;
}

const PIECES: PieceInfo[] = [
  { id: 'head', name: 'Cabeza' },
  { id: 'leftArm', name: 'Brazo Izq.' },
  { id: 'torso', name: 'Cuerpo' },
  { id: 'rightArm', name: 'Brazo Der.' },
  { id: 'leftLeg', name: 'Pierna Izq.' },
  { id: 'rightLeg', name: 'Pierna Der.' },
];

// --- CUTE SVG COMPONENTS ---
// Skin tone: #FFD3B6, Shirt: #FF8BA7, Pants: #333333, Shoes: #FFC6FF, Hair: #A28089

const SvgHead = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Back hair */}
    <path d="M 20 50 Q 10 80 30 90 Q 50 100 70 90 Q 90 80 80 50 Z" fill="#6B4423" />
    {/* Ears */}
    <circle cx="15" cy="55" r="8" fill="#FFCBA4" />
    <circle cx="85" cy="55" r="8" fill="#FFCBA4" />
    {/* Inner ears */}
    <circle cx="15" cy="55" r="4" fill="#E8A598" />
    <circle cx="85" cy="55" r="4" fill="#E8A598" />
    {/* Face */}
    <rect x="20" y="20" width="60" height="70" rx="30" fill="#FFD3B6" />
    {/* Hair front */}
    <path d="M 15 40 Q 30 10 50 20 Q 70 10 85 40 Q 50 20 15 40 Z" fill="#8B5A2B" />
    <path d="M 20 25 Q 50 0 80 25 Q 50 15 20 25 Z" fill="#6B4423" />
    {/* Big cute eyes */}
    <circle cx="35" cy="55" r="7" fill="#4A3018" />
    <circle cx="65" cy="55" r="7" fill="#4A3018" />
    {/* Sparkles */}
    <circle cx="33" cy="53" r="2.5" fill="#FFF" />
    <circle cx="36" cy="56" r="1" fill="#FFF" />
    <circle cx="63" cy="53" r="2.5" fill="#FFF" />
    <circle cx="66" cy="56" r="1" fill="#FFF" />
    {/* Blush */}
    <ellipse cx="25" cy="65" rx="6" ry="4" fill="#FF9EBB" opacity="0.6" />
    <ellipse cx="75" cy="65" rx="6" ry="4" fill="#FF9EBB" opacity="0.6" />
    {/* Cute nose */}
    <path d="M 48 62 Q 50 65 52 62" fill="transparent" stroke="#E8A598" strokeWidth="2" strokeLinecap="round" />
    {/* Happy Smile */}
    <path d="M 40 70 Q 50 80 60 70" fill="transparent" stroke="#4A3018" strokeWidth="3" strokeLinecap="round" />
    <path d="M 45 74 Q 50 78 55 74" fill="#FF9EBB" />
  </svg>
);

const SvgTorso = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Neck */}
    <rect x="40" y="0" width="20" height="20" fill="#FFCBA4" rx="5" />
    {/* Shadow under neck */}
    <rect x="40" y="15" width="20" height="5" fill="#E8A598" />
    {/* Hoodie / Shirt */}
    <path d="M 25 15 L 75 15 Q 95 20 90 40 L 85 90 Q 80 100 50 100 Q 20 100 15 90 L 10 40 Q 5 20 25 15 Z" fill="#FF6B6B" />
    {/* Hoodie pocket */}
    <path d="M 30 60 L 70 60 L 80 90 L 20 90 Z" fill="#FF5252" rx="5" />
    {/* Hoodie strings */}
    <path d="M 45 20 L 45 40" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M 55 20 L 55 40" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    <circle cx="45" cy="40" r="2" fill="#FFF" />
    <circle cx="55" cy="40" r="2" fill="#FFF" />
    {/* Collar */}
    <path d="M 35 15 Q 50 30 65 15" fill="#FF5252" />
  </svg>
);

const SvgArmLeft = () => (
  <svg viewBox="0 0 50 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Hand */}
    <circle cx="25" cy="85" r="16" fill="#FFD3B6" />
    {/* Fingers */}
    <circle cx="12" cy="80" r="5" fill="#FFCBA4" />
    <circle cx="15" cy="92" r="5" fill="#FFCBA4" />
    {/* Sleeve */}
    <path d="M 40 5 L 15 15 Q 5 40 10 70 L 40 75 Q 50 40 40 5 Z" fill="#FF6B6B" />
    <path d="M 10 70 L 40 75 L 42 65 L 12 60 Z" fill="#FF5252" />
  </svg>
);

const SvgArmRight = () => (
  <svg viewBox="0 0 50 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Hand */}
    <circle cx="25" cy="85" r="16" fill="#FFD3B6" />
    {/* Fingers */}
    <circle cx="38" cy="80" r="5" fill="#FFCBA4" />
    <circle cx="35" cy="92" r="5" fill="#FFCBA4" />
    {/* Sleeve */}
    <path d="M 10 5 L 35 15 Q 45 40 40 70 L 10 75 Q 0 40 10 5 Z" fill="#FF6B6B" />
    <path d="M 40 70 L 10 75 L 8 65 L 38 60 Z" fill="#FF5252" />
  </svg>
);

const SvgLegLeft = () => (
  <svg viewBox="0 0 60 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Leg */}
    <rect x="22" y="30" width="20" height="50" fill="#4ECDC4" />
    {/* Shorts */}
    <path d="M 15 0 L 50 0 L 48 40 Q 32 45 18 40 Z" fill="#45B7D1" />
    {/* Sock */}
    <rect x="22" y="70" width="20" height="15" fill="#FFF" />
    <rect x="22" y="72" width="20" height="3" fill="#FF6B6B" />
    <rect x="22" y="78" width="20" height="3" fill="#4ECDC4" />
    {/* Shoe */}
    <path d="M 10 85 Q 10 100 32 100 Q 55 100 50 85 Q 45 75 32 75 Q 10 75 10 85 Z" fill="#FFE66D" />
    <path d="M 15 100 L 45 100" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const SvgLegRight = () => (
  <svg viewBox="0 0 60 100" className="w-full h-full drop-shadow-lg overflow-visible">
    {/* Leg */}
    <rect x="18" y="30" width="20" height="50" fill="#4ECDC4" />
    {/* Shorts */}
    <path d="M 10 0 L 45 0 L 42 40 Q 28 45 12 40 Z" fill="#45B7D1" />
    {/* Sock */}
    <rect x="18" y="70" width="20" height="15" fill="#FFF" />
    <rect x="18" y="72" width="20" height="3" fill="#FF6B6B" />
    <rect x="18" y="78" width="20" height="3" fill="#4ECDC4" />
    {/* Shoe */}
    <path d="M 10 85 Q 5 100 28 100 Q 50 100 50 85 Q 50 75 28 75 Q 15 75 10 85 Z" fill="#FFE66D" />
    <path d="M 15 100 L 45 100" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const PieceRenderer = ({ id }: { id: PieceId }) => {
  switch (id) {
    case 'head': return <SvgHead />;
    case 'torso': return <SvgTorso />;
    case 'leftArm': return <SvgArmLeft />;
    case 'rightArm': return <SvgArmRight />;
    case 'leftLeg': return <SvgLegLeft />;
    case 'rightLeg': return <SvgLegRight />;
    default: return null;
  }
};

const SlotRenderer = ({ isTarget, id }: { isTarget?: boolean, id: PieceId }) => (
  <div className={clsx(
    "w-full h-full border-4 border-dashed rounded-[30%] transition-all duration-300 flex items-center justify-center overflow-visible relative",
    isTarget ? "border-yellow-400 bg-yellow-400/20 shadow-[0_0_15px_rgba(253,224,71,0.5)] animate-pulse z-10 scale-105" : "border-white/40 bg-white/10"
  )}>
    <div className="absolute inset-0 p-1 opacity-25 grayscale brightness-50 flex items-center justify-center pointer-events-none">
      <PieceRenderer id={id} />
    </div>
  </div>
);

export const RompecabezasGame: React.FC = () => {
  const navigate = useNavigate();
  
  // Game State
  const [placedPieces, setPlacedPieces] = useState<PieceId[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<PieceId | null>(null);
  const [shakingSlot, setShakingSlot] = useState<PieceId | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [shuffledBank, setShuffledBank] = useState<PieceInfo[]>([]);

  useEffect(() => {
    setShuffledBank([...PIECES].sort(() => Math.random() - 0.5));
  }, []);

  const availablePieces = shuffledBank.filter(p => !placedPieces.includes(p.id));

  const handleBankSelect = (id: PieceId) => {
    if (selectedPiece === id) {
      setSelectedPiece(null); // Deselect
    } else {
      setSelectedPiece(id);
    }
  };

  const handleSlotSelect = (targetId: PieceId) => {
    if (!selectedPiece) return;

    if (selectedPiece === targetId) {
      // Correct!
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF8BA7', '#FFD3B6', '#FFC6FF']
      });

      const newPlaced = [...placedPieces, targetId];
      setPlacedPieces(newPlaced);
      setSelectedPiece(null);

      if (newPlaced.length === PIECES.length) {
        setTimeout(() => setIsWon(true), 600);
      }
    } else {
      // Wrong slot
      setShakingSlot(targetId);
      setTimeout(() => setShakingSlot(null), 500);
      setSelectedPiece(null); // Force them to pick again
    }
  };

  const handleRestart = () => {
    setPlacedPieces([]);
    setSelectedPiece(null);
    setIsWon(false);
    setShuffledBank([...PIECES].sort(() => Math.random() - 0.5));
  };

  // Keyboard controls for BANK
  const { focusedIndex: bankFocusedIndex, setFocusedIndex: setBankFocusedIndex } = useKeyboard({
    gridColumns: 3,
    totalItems: availablePieces.length,
    onEnter: (index: number) => {
      const piece = availablePieces[index];
      if (piece) handleBankSelect(piece.id);
    },
    onEscape: () => navigate('/'),
    isActive: !isWon && selectedPiece === null && availablePieces.length > 0
  });

  // For board slots, we map them in a fixed logical order for keyboard navigation
  const BOARD_SLOTS: PieceId[] = ['head', 'leftArm', 'torso', 'rightArm', 'leftLeg', 'rightLeg'];
  const missingSlots = BOARD_SLOTS.filter(id => !placedPieces.includes(id));

  // Keyboard controls for BOARD
  const { focusedIndex: boardFocusedIndex } = useKeyboard({
    gridColumns: 2,
    totalItems: missingSlots.length,
    onEnter: (index: number) => {
      const targetId = missingSlots[index];
      if (targetId) handleSlotSelect(targetId);
    },
    onEscape: () => setSelectedPiece(null), // cancel selection
    isActive: !isWon && selectedPiece !== null
  });

  return (
    <div className="relative min-h-dvh flex flex-col bg-gradient-to-b from-teal-200 via-cyan-100 to-blue-100 overflow-hidden">
      {/* Header */}
      <header className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between bg-white/95 sticky top-0 z-30 shadow-md border-b border-white/50">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-cyan-50 text-cyan-600 rounded-full font-extrabold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-cyan-200 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm">Volver</span>
        </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl text-center text-cyan-700 flex-1 px-2 font-extrabold drop-shadow-sm truncate">
          {selectedPiece ? '¡Tocá dónde va!' : '¡Elegí una pieza!'}
        </h1>
        
        <div className="w-20 shrink-0"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-between py-2 sm:py-6 px-2 sm:px-4">
        
        {/* Silhouette Center */}
        <div className="relative w-[300px] h-[400px] sm:w-[350px] sm:h-[480px] mt-2 sm:mt-6 bg-white/90 rounded-[3rem] border-4 border-white/70 shadow-2xl flex flex-col items-center p-6 animate-fade-in">
          
          {/* Helper overlay when piece is selected */}
          {selectedPiece && (
            <div className="absolute inset-0 bg-cyan-900/10 rounded-[3rem] pointer-events-none z-0"></div>
          )}

          {/* HEAD */}
          <div 
            onClick={() => handleSlotSelect('head')}
            className={clsx(
              "absolute top-4 sm:top-6 w-24 h-24 sm:w-28 sm:h-28 z-30 transition-transform",
              !placedPieces.includes('head') && selectedPiece && "cursor-pointer hover:scale-110",
              shakingSlot === 'head' && "animate-shake"
            )}
          >
            {placedPieces.includes('head') ? <PieceRenderer id="head" /> : 
             <div className="w-full h-full p-2"><SlotRenderer id="head" isTarget={missingSlots[boardFocusedIndex] === 'head' && selectedPiece !== null} /></div>}
          </div>
          
          {/* LEFT ARM */}
          <div 
            onClick={() => handleSlotSelect('leftArm')}
            className={clsx(
              "absolute top-[6.5rem] sm:top-36 left-8 sm:left-10 w-12 h-24 sm:w-14 sm:h-28 z-10 transition-transform",
              !placedPieces.includes('leftArm') && selectedPiece && "cursor-pointer hover:scale-110",
              shakingSlot === 'leftArm' && "animate-shake"
            )}
          >
            {placedPieces.includes('leftArm') ? <PieceRenderer id="leftArm" /> : 
             <div className="w-full h-full"><SlotRenderer id="leftArm" isTarget={missingSlots[boardFocusedIndex] === 'leftArm' && selectedPiece !== null} /></div>}
          </div>
          
          {/* RIGHT ARM */}
          <div 
            onClick={() => handleSlotSelect('rightArm')}
            className={clsx(
              "absolute top-[6.5rem] sm:top-36 right-8 sm:right-10 w-12 h-24 sm:w-14 sm:h-28 z-10 transition-transform",
              !placedPieces.includes('rightArm') && selectedPiece && "cursor-pointer hover:scale-110",
              shakingSlot === 'rightArm' && "animate-shake"
            )}
          >
            {placedPieces.includes('rightArm') ? <PieceRenderer id="rightArm" /> : 
             <div className="w-full h-full"><SlotRenderer id="rightArm" isTarget={missingSlots[boardFocusedIndex] === 'rightArm' && selectedPiece !== null} /></div>}
          </div>
          
          {/* TORSO */}
          <div 
            onClick={() => handleSlotSelect('torso')}
            className={clsx(
              "absolute top-[6rem] sm:top-32 w-28 h-32 sm:w-32 sm:h-36 z-20 transition-transform",
              !placedPieces.includes('torso') && selectedPiece && "cursor-pointer hover:scale-110",
              shakingSlot === 'torso' && "animate-shake"
            )}
          >
            {placedPieces.includes('torso') ? <PieceRenderer id="torso" /> : 
             <div className="w-full h-full p-2"><SlotRenderer id="torso" isTarget={missingSlots[boardFocusedIndex] === 'torso' && selectedPiece !== null} /></div>}
          </div>
          
          {/* LEFT LEG */}
          <div 
            onClick={() => handleSlotSelect('leftLeg')}
            className={clsx(
              "absolute top-[13.5rem] sm:top-[20rem] left-[4.5rem] sm:left-[5.5rem] w-14 h-24 sm:w-16 sm:h-28 z-10 transition-transform",
              !placedPieces.includes('leftLeg') && selectedPiece && "cursor-pointer hover:scale-110",
              shakingSlot === 'leftLeg' && "animate-shake"
            )}
          >
            {placedPieces.includes('leftLeg') ? <PieceRenderer id="leftLeg" /> : 
             <div className="w-full h-full p-1"><SlotRenderer id="leftLeg" isTarget={missingSlots[boardFocusedIndex] === 'leftLeg' && selectedPiece !== null} /></div>}
          </div>

          {/* RIGHT LEG */}
          <div 
            onClick={() => handleSlotSelect('rightLeg')}
            className={clsx(
              "absolute top-[13.5rem] sm:top-[20rem] right-[4.5rem] sm:right-[5.5rem] w-14 h-24 sm:w-16 sm:h-28 z-10 transition-transform",
              !placedPieces.includes('rightLeg') && selectedPiece && "cursor-pointer hover:scale-110",
              shakingSlot === 'rightLeg' && "animate-shake"
            )}
          >
            {placedPieces.includes('rightLeg') ? <PieceRenderer id="rightLeg" /> : 
             <div className="w-full h-full p-1"><SlotRenderer id="rightLeg" isTarget={missingSlots[boardFocusedIndex] === 'rightLeg' && selectedPiece !== null} /></div>}
          </div>
          
        </div>

        {/* Scattered Pieces Bank */}
        <div className={clsx(
          "w-full max-w-2xl mt-4 sm:mt-8 mb-4 p-4 rounded-3xl transition-all duration-500",
          selectedPiece ? "opacity-50 grayscale-[30%] pointer-events-none" : "opacity-100 bg-white/20"
        )}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 min-h-[120px]">
            {availablePieces.map((piece, index) => {
              const isFocused = bankFocusedIndex === index && selectedPiece === null;
              
              return (
                <button
                  key={piece.id}
                  onMouseEnter={() => selectedPiece === null && setBankFocusedIndex(index)}
                  onClick={() => handleBankSelect(piece.id)}
                  className={clsx(
                    "flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-2xl transition-all duration-300 animate-pop-in",
                    isFocused ? "scale-110 bg-white shadow-xl ring-4 ring-cyan-400 ring-offset-2" : "hover:scale-105 bg-white/70 shadow-md hover:bg-white"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center pointer-events-none">
                    <PieceRenderer id={piece.id} />
                  </div>
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
