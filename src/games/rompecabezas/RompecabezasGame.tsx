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
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
    {/* Hair back */}
    <circle cx="50" cy="50" r="45" fill="#A28089" />
    {/* Face */}
    <circle cx="50" cy="55" r="40" fill="#FFD3B6" />
    {/* Bangs */}
    <path d="M 15 45 Q 50 10 85 45 Q 50 30 15 45" fill="#A28089" />
    {/* Eyes */}
    <circle cx="35" cy="55" r="5" fill="#333" />
    <circle cx="65" cy="55" r="5" fill="#333" />
    {/* Sparkles in eyes */}
    <circle cx="33" cy="53" r="1.5" fill="#FFF" />
    <circle cx="63" cy="53" r="1.5" fill="#FFF" />
    {/* Cheeks */}
    <circle cx="25" cy="62" r="6" fill="#FF9EBB" opacity="0.5" />
    <circle cx="75" cy="62" r="6" fill="#FF9EBB" opacity="0.5" />
    {/* Smile */}
    <path d="M 42 68 Q 50 75 58 68" fill="transparent" stroke="#333" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const SvgTorso = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
    {/* Neck */}
    <rect x="40" y="0" width="20" height="15" fill="#FFD3B6" rx="5" />
    {/* Shirt */}
    <path d="M 20 10 L 80 10 Q 95 10 95 30 L 90 90 Q 90 100 50 100 Q 10 100 10 90 L 5 30 Q 5 10 20 10 Z" fill="#FF8BA7" />
    {/* Star on shirt */}
    <path d="M 50 40 L 55 55 L 70 55 L 58 65 L 62 80 L 50 70 L 38 80 L 42 65 L 30 55 L 45 55 Z" fill="#FFD700" />
    {/* Collar */}
    <path d="M 35 10 Q 50 25 65 10" fill="transparent" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const SvgArmLeft = () => (
  <svg viewBox="0 0 50 100" className="w-full h-full drop-shadow-md overflow-visible">
    {/* Hand */}
    <circle cx="25" cy="85" r="15" fill="#FFD3B6" />
    {/* Sleeve */}
    <path d="M 40 5 L 10 10 Q 0 40 10 70 L 40 75 Q 50 40 40 5 Z" fill="#FF8BA7" />
  </svg>
);

const SvgArmRight = () => (
  <svg viewBox="0 0 50 100" className="w-full h-full drop-shadow-md overflow-visible">
    {/* Hand */}
    <circle cx="25" cy="85" r="15" fill="#FFD3B6" />
    {/* Sleeve */}
    <path d="M 10 5 L 40 10 Q 50 40 40 70 L 10 75 Q 0 40 10 5 Z" fill="#FF8BA7" />
  </svg>
);

const SvgLegLeft = () => (
  <svg viewBox="0 0 60 100" className="w-full h-full drop-shadow-md overflow-visible">
    {/* Shoe */}
    <path d="M 5 80 Q 5 100 30 100 Q 55 100 55 80 Q 55 70 30 70 Q 5 70 5 80 Z" fill="#FFC6FF" />
    {/* Leg */}
    <rect x="20" y="40" width="20" height="40" fill="#FFD3B6" />
    {/* Shorts */}
    <path d="M 10 0 L 50 0 L 45 50 Q 30 60 15 50 Z" fill="#333333" />
  </svg>
);

const SvgLegRight = () => (
  <svg viewBox="0 0 60 100" className="w-full h-full drop-shadow-md overflow-visible">
    {/* Shoe */}
    <path d="M 5 80 Q 5 100 30 100 Q 55 100 55 80 Q 55 70 30 70 Q 5 70 5 80 Z" fill="#FFC6FF" />
    {/* Leg */}
    <rect x="20" y="40" width="20" height="40" fill="#FFD3B6" />
    {/* Shorts */}
    <path d="M 10 0 L 50 0 L 45 50 Q 30 60 15 50 Z" fill="#333333" />
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

const SlotRenderer = ({ isTarget }: { isTarget?: boolean }) => (
  <div className={clsx(
    "w-full h-full border-4 border-dashed rounded-[30%] transition-all duration-300 flex items-center justify-center",
    isTarget ? "border-yellow-400 bg-yellow-400/20 shadow-[0_0_15px_rgba(253,224,71,0.5)] animate-pulse" : "border-white/40 bg-white/10"
  )}>
    <div className="w-2 h-2 rounded-full bg-white/40"></div>
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
             <div className="w-full h-full p-2"><SlotRenderer isTarget={missingSlots[boardFocusedIndex] === 'head' && selectedPiece !== null} /></div>}
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
             <div className="w-full h-full"><SlotRenderer isTarget={missingSlots[boardFocusedIndex] === 'leftArm' && selectedPiece !== null} /></div>}
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
             <div className="w-full h-full"><SlotRenderer isTarget={missingSlots[boardFocusedIndex] === 'rightArm' && selectedPiece !== null} /></div>}
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
             <div className="w-full h-full p-2"><SlotRenderer isTarget={missingSlots[boardFocusedIndex] === 'torso' && selectedPiece !== null} /></div>}
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
             <div className="w-full h-full p-1"><SlotRenderer isTarget={missingSlots[boardFocusedIndex] === 'leftLeg' && selectedPiece !== null} /></div>}
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
             <div className="w-full h-full p-1"><SlotRenderer isTarget={missingSlots[boardFocusedIndex] === 'rightLeg' && selectedPiece !== null} /></div>}
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
