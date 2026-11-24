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
    <header className="w-full max-w-[98vw] 2xl:max-w-[95vw] mx-auto px-[6px] sm:px-4 pt-[max(6px,env(safe-area-inset-top,0px))] pb-[4px] sticky top-0 z-30">
      <div
        data-header-bar
        className="bg-[#FFFDF9] border-3 border-[#F0DFC8] shadow-[0_4px_0_#E5CEB0] rounded-[24px] sm:rounded-full px-[10px] sm:px-4 py-[6px] sm:py-[8px] flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-[8px] gap-y-[6px] sm:gap-3"
      >
        <button
          type="button"
          onClick={() => navigate(backTo)}
          aria-label={backLabel}
          className="order-1 toy-press flex items-center justify-center gap-1.5 px-[10px] sm:px-4 py-[6px] bg-[#FFF8EE] hover:bg-[#FFF0DC] text-[#3D2645] rounded-full font-bold border-2 border-[#E8D4B8] shadow-[0_3px_0_#D8BE9C] shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-[20px] h-[20px]" aria-hidden="true" />
          <span className="hidden sm:inline text-sm sm:text-base">{backLabel}</span>
        </button>

        <div className="order-2 flex-1 min-w-0 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 text-center px-1">
          <h1
            tabIndex={-1}
            className="text-[clamp(1.15rem,0.95rem+1.2vw,1.85rem)] text-[#3D2645] leading-tight outline-none"
          >
            {title}
          </h1>
          {subtitle && (
            <p className="hidden sm:inline-block text-sm md:text-base font-bold text-[#3D2645] bg-[#FFF3CD] border-2 border-[#FFBE3D] px-3 py-0.5 rounded-full whitespace-nowrap">
              {subtitle}
            </p>
          )}
        </div>

        <div className="order-3 sm:order-4 shrink-0 flex items-center">
          {onRestart ? (
            <button
              type="button"
              onClick={onRestart}
              aria-label="Empezar de nuevo"
              className="toy-press flex items-center justify-center p-[8px] sm:px-3 sm:py-2 bg-[#FFF8EE] hover:bg-[#FFF0DC] text-[#3D2645] rounded-full font-bold border-2 border-[#E8D4B8] shadow-[0_3px_0_#D8BE9C] cursor-pointer"
            >
              <RotateCcw className="w-[20px] h-[20px]" aria-hidden="true" />
            </button>
          ) : (
            <div className="w-[44px] sm:hidden" aria-hidden="true" />
          )}
        </div>

        {(subtitle || progressTotal > 0) && (
          <div className="order-4 basis-full sm:order-3 sm:basis-auto flex flex-wrap items-center justify-center gap-[6px]">
            {subtitle && (
              <p className="sm:hidden text-xs font-bold text-[#3D2645] bg-[#FFF3CD] border-2 border-[#FFBE3D] px-2.5 py-0.5 rounded-full">
                {subtitle}
              </p>
            )}
            {progressTotal > 0 && (
              <div
                role="status"
                aria-label={`${progressCurrent} de ${progressTotal} completados`}
                className="flex flex-wrap items-center justify-center gap-[3px] sm:gap-[5px] bg-[#FFF8EE] px-[8px] sm:px-[12px] py-[4px] rounded-full border-2 border-[#F0DFC8] max-w-full"
              >
                {Array.from({ length: progressTotal }).map((_, i) => {
                  const filled = i < progressCurrent;
                  return (
                    <div key={i} className={filled ? 'animate-spring-pop' : undefined}>
                      <StorybookStar
                        filled={filled}
                        className="w-[16px] h-[16px] sm:w-[22px] sm:h-[22px]"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};