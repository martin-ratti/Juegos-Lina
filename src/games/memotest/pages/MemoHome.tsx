import { ThemeSelector } from '../components/ThemeSelector';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const MemoHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh flex flex-col items-center pt-6 sm:pt-10 md:pt-14 px-3 sm:px-4">
      {/* Back button */}
      <div className="w-full max-w-4xl mb-2 sm:mb-4 animate-fade-in">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/70 hover:bg-white text-purple-600 rounded-full font-extrabold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-purple-200 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm">Volver</span>
        </button>
      </div>

      {/* Title */}
      <div className="text-center mb-2 sm:mb-4 relative animate-slide-up">
        <Sparkles className="absolute -top-3 -left-4 sm:-top-4 sm:-left-6 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute -top-1 -right-4 sm:-top-2 sm:-right-6 w-5 h-5 sm:w-7 sm:h-7 text-pink-400 animate-pulse" style={{ animationDelay: '500ms' }} />

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 p-2 leading-tight">
          🧠 Memotest
        </h1>
        <p className="mt-1 sm:mt-2 text-base sm:text-lg md:text-xl text-purple-700 font-bold bg-white/50 backdrop-blur-sm inline-block px-4 sm:px-6 py-1.5 rounded-full shadow-sm border border-white/60">
          ¡Elegí un tema!
        </p>
      </div>

      {/* Theme selector */}
      <ThemeSelector />
      
      <div className="sm:hidden h-6" />
    </div>
  );
};
