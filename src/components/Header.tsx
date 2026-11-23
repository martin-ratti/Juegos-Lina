import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { StorybookStar } from './PlayroomDecor';
import { useViewTransitionNavigate } from '../hooks/useViewTransitionNavigate';

interface HeaderProps {
  title: string;
  subtitle?: string;
  backTo: string;
  backLabel?: string;
  progressCurrent: number;
  progressTotal: number;
  onRestart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  backTo,
  backLabel = 'Atrás',
  progressCurrent,
  progressTotal,
  onRestart,
}) => {
  const navigate = useViewTransitionNavigate();

  return (
    <header className="w-full max-w-[98vw] 2xl:max-w-[95vw] mx-auto px-2 sm:px-4 pt-[max(0.35rem,env(safe-area-inset-top,0px))] pb-1 sticky top-0 z-30">
      <div className="bg-[#FFFDF9] border-3 border-[#F0DFC8] shadow-[0_4px_0_#E5CEB0] rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-3">
        <button
          type="button"
          onClick={() => navigate(backTo)}
          aria-label={backLabel}
          className="toy-press flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 bg-[#FFF8EE] hover:bg-[#FFF0DC] text-[#3D2645] rounded-full font-bold border-2 border-[#E8D4B8] shadow-[0_3px_0_#D8BE9C] shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline text-sm sm:text-base">{backLabel}</span>
        </button>

        <div className="flex-1 min-w-0 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 text-center">
          <h1
            tabIndex={-1}
            className="text-[clamp(1.15rem,0.95rem+1.2vw,1.9rem)] text-[#3D2645] leading-tight outline-none"
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] sm:text-sm md:text-base font-bold text-[#3D2645] bg-[#FFF3CD] border-2 border-[#FFBE3D] px-2.5 sm:px-3 py-0.5 rounded-full whitespace-nowrap">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {progressTotal > 0 && (
            <div
              role="status"
              aria-label={`${progressCurrent} de ${progressTotal} completados`}
              className="flex items-center gap-0.5 sm:gap-1 bg-[#FFF8EE] px-1.5 sm:px-3 py-1 rounded-full border-2 border-[#F0DFC8]"
            >
              {Array.from({ length: progressTotal }).map((_, i) => {
                const filled = i < progressCurrent;
                return (
                  <div key={i} className={filled ? 'animate-spring-pop' : undefined}>
                    <StorybookStar filled={filled} className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                );
              })}
            </div>
          )}

          {onRestart && (
            <button
              type="button"
              onClick={onRestart}
              aria-label="Empezar de nuevo"
              className="toy-press flex items-center justify-center p-2 sm:px-3 sm:py-2 bg-[#FFF8EE] hover:bg-[#FFF0DC] text-[#3D2645] rounded-full font-bold border-2 border-[#E8D4B8] shadow-[0_3px_0_#D8BE9C] cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
