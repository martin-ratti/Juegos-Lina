import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { Star, RefreshCw, Home } from 'lucide-react';

interface WinScreenProps {
  onRestart: () => void;
}

export const WinScreen: React.FC<WinScreenProps> = ({ onRestart }) => {
  const navigate = useNavigate();
  const confettiTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#ff6f00', '#e91e63', '#00bcd4', '#FFD700', '#76FF03']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#ff6f00', '#e91e63', '#00bcd4', '#FFD700', '#76FF03']
      });

      if (Date.now() < end) {
        confettiTimerRef.current = requestAnimationFrame(frame);
      }
    };
    
    frame();

    return () => {
      if (confettiTimerRef.current) {
        cancelAnimationFrame(confettiTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onRestart();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onRestart, navigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 max-w-lg w-full text-center shadow-2xl border-4 sm:border-8 border-yellow-400 animate-pop-in">
        
        {/* Stars row */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-3 sm:mb-5">
          <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <Star className="w-10 h-10 sm:w-14 sm:h-14 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        {/* Celebration emojis */}
        <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 animate-wiggle">🎉🥳🎉</div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-pink-500 mb-2 sm:mb-3 drop-shadow-md">
          ¡Ganaste Lina!
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-purple-700 mb-5 sm:mb-8 font-bold">
          ¡Encontraste todas las parejas! 🌟
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button 
            onClick={onRestart}
            className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-lg sm:text-xl md:text-2xl font-bold rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 border-3 sm:border-4 border-green-300/50"
          >
            <RefreshCw className="w-5 h-5 sm:w-7 sm:h-7" />
            ¡De Nuevo!
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white text-lg sm:text-xl md:text-2xl font-bold rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 border-3 sm:border-4 border-purple-300/50"
          >
            <Home className="w-5 h-5 sm:w-7 sm:h-7" />
            Menú
          </button>
        </div>
        
        <p className="hidden sm:block mt-5 text-xs text-gray-400 font-semibold">
          Enter → jugar de nuevo · Esc → menú
        </p>
      </div>
    </div>
  );
};
