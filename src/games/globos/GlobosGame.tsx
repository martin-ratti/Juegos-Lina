import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { clsx } from 'clsx';

interface Balloon {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100 (100 is bottom, 0 is top)
  color: string;
  speed: number;
}

const BALLOON_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400', 
  'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-cyan-500'
];

export const GlobosGame: React.FC = () => {
  const navigate = useNavigate();
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Spawn new balloon
  const spawnBalloon = useCallback(() => {
    const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
    const newBalloon: Balloon = {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 80 + 10, // 10% to 90%
      y: 110, // start below screen
      color,
      speed: Math.random() * 0.05 + 0.03, // Speed between 0.03 and 0.08 units per ms
    };
    setBalloons((prev) => [...prev, newBalloon]);
  }, []);

  // Animation loop for moving balloons up
  const updateBalloons = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current;
      
      setBalloons((prev) => {
        const next = prev
          .map((b) => ({ ...b, y: b.y - b.speed * deltaTime }))
          .filter((b) => b.y > -20); // Remove balloons that went off top
        return next;
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(updateBalloons);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateBalloons);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updateBalloons]);

  // Periodic spawning
  useEffect(() => {
    // Initial balloons
    for (let i = 0; i < 3; i++) spawnBalloon();

    const intervalId = setInterval(() => {
      setBalloons(prev => {
        if (prev.length < 8) {
          spawnBalloon();
        }
        return prev;
      });
    }, 1500);
    return () => clearInterval(intervalId);
  }, [spawnBalloon]);

  // Handle balloon pop
  const popBalloon = (id: string, x: number, y: number) => {
    // Play a small confetti at the balloon position
    if (containerRef.current) {
      const originX = (x / 100);
      const originY = (y / 100);
      
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { x: originX, y: originY },
        colors: ['#FFD700', '#FF8C00', '#FF1493', '#00E5FF', '#76FF03'],
        ticks: 50,
        gravity: 1.5,
        scalar: 0.8
      });
    }

    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
    
    // Immediately spawn a new one to keep it fun
    setTimeout(() => {
      spawnBalloon();
    }, 300);
  };

  // Keyboard "any key" logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
        return;
      }
      
      // On any other key, pop the lowest balloon!
      setBalloons(prev => {
        if (prev.length === 0) return prev;
        
        // Find balloon closest to top (lowest y)
        const sorted = [...prev].sort((a, b) => a.y - b.y);
        const toPop = sorted[0];
        
        if (toPop) {
          popBalloon(toPop.id, toPop.x, toPop.y);
        }
        return prev;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="relative min-h-dvh flex flex-col bg-gradient-to-b from-sky-300 via-sky-200 to-green-200 overflow-hidden" ref={containerRef}>
      {/* Header */}
      <header className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between bg-white/70 backdrop-blur-lg sticky top-0 z-30 shadow-md border-b border-white/50">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-red-50 text-red-500 rounded-full font-extrabold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-red-200 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm">Volver</span>
        </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl text-center text-red-600 flex-1 px-2 font-extrabold drop-shadow-sm truncate">
          🎈 Explota Globos 🎈
        </h1>

        <div className="bg-white/90 px-4 py-1.5 sm:py-2 rounded-full shadow-md border border-orange-200 shrink-0 font-black text-orange-500 text-lg sm:text-xl">
          {score} 💥
        </div>
      </header>

      {/* Game Area */}
      <main className="flex-1 relative w-full h-full overflow-hidden" onClick={() => {
        // If clicking background, pop a balloon too just to make it easy for toddlers
        setBalloons(prev => {
          if (prev.length === 0) return prev;
          const toPop = [...prev].sort((a, b) => a.y - b.y)[0];
          if (toPop) popBalloon(toPop.id, toPop.x, toPop.y);
          return prev;
        });
      }}>
        {/* Clouds background */}
        <div className="absolute top-10 left-10 text-white/50 text-8xl blur-sm select-none">☁️</div>
        <div className="absolute top-32 right-20 text-white/40 text-9xl blur-sm select-none">☁️</div>
        <div className="absolute top-60 left-1/3 text-white/60 text-7xl blur-[2px] select-none">☁️</div>

        {/* Instruction overlay */}
        {score === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-fade-in">
            <div className="bg-white/60 backdrop-blur-md px-6 py-4 rounded-3xl text-center shadow-xl border-4 border-white animate-bounce-slight">
              <p className="text-3xl sm:text-4xl text-purple-700 font-black mb-2">¡Tocá cualquier tecla!</p>
              <p className="text-xl text-purple-500 font-bold">o tocá los globos con el dedo 👆</p>
            </div>
          </div>
        )}

        {/* Balloons */}
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            onClick={(e) => {
              e.stopPropagation();
              popBalloon(balloon.id, balloon.x, balloon.y);
            }}
            className={clsx(
              'absolute w-24 h-32 sm:w-32 sm:h-40 rounded-[50%] cursor-crosshair transform-gpu transition-transform',
              'flex flex-col items-center justify-start shadow-inner border-2 border-white/30',
              balloon.color,
              'hover:scale-110 active:scale-95'
            )}
            style={{
              left: `${balloon.x}%`,
              top: `${balloon.y}%`,
              // Add a slight wiggle based on x position to make it look floaty
              transform: `translateX(-50%) rotate(${Math.sin(balloon.y / 10) * 10}deg)`,
              // Create the classic balloon shape (wider top, narrower bottom)
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
              boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.1), inset 10px 10px 20px rgba(255,255,255,0.4)',
            }}
          >
            {/* Balloon knot */}
            <div className="absolute -bottom-3 w-4 h-4 rounded-sm rotate-45 border-r border-b border-black/10" style={{ backgroundColor: 'inherit' }}></div>
            {/* Balloon string */}
            <div className="absolute -bottom-12 w-0.5 h-12 bg-gray-400/50 rounded-full animate-wiggle"></div>
            {/* Shine effect */}
            <div className="absolute top-3 left-4 w-4 h-8 sm:w-6 sm:h-12 bg-white/40 rounded-[50%] rotate-12 blur-[1px]"></div>
          </div>
        ))}
      </main>
    </div>
  );
};
