import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { Star, RefreshCw, Home } from 'lucide-react';

interface WinScreenProps {
  onRestart: () => void;
}

export const WinScreen: React.FC<WinScreenProps> = ({ onRestart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6f00', '#e91e63', '#00bcd4', '#FFD700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6f00', '#e91e63', '#00bcd4', '#FFD700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);

  // Keyboard support for win screen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onRestart();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onRestart, navigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="bg-white rounded-[3rem] p-8 max-w-lg w-full text-center shadow-2xl border-8 border-yellow-400 transform transition-all animate-in zoom-in-90 duration-500">
        
        <div className="flex justify-center gap-2 mb-6">
          <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <Star className="w-16 h-16 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        <h2 className="text-5xl sm:text-6xl text-pink-500 mb-4 drop-shadow-md">
          ¡Ganaste Lina!
        </h2>
        
        <p className="text-xl sm:text-2xl text-purple-700 mb-8 font-bold">
          ¡Encontraste todas las parejas!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 border-4 border-green-300"
          >
            <RefreshCw className="w-8 h-8" />
            De Nuevo
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white text-2xl font-bold rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 border-4 border-purple-300"
          >
            <Home className="w-8 h-8" />
            Salir
          </button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          (Presiona Enter para jugar de nuevo)
        </p>
      </div>
    </div>
  );
};
