import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Home, RefreshCw } from 'lucide-react';
import { PlayroomBunting, ScallopedMedallion, StorybookStar } from './PlayroomDecor';

interface WinScreenProps {
  onRestart: () => void;
  onMenu: () => void;
  menuLabel?: string;
  onNext?: () => void;
  nextLabel?: string;
  title?: string;
  message?: string;
}

export const WinScreen: React.FC<WinScreenProps> = ({
  onRestart,
  onMenu,
  menuLabel = 'Elegir otro',
  onNext,
  nextLabel,
  title = '¡Muy bien, Lina!',
  message = '¡Encontraste todas las parejas!',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const fireConfetti = confetti.create(canvas, {
      resize: true,
      disableForReducedMotion: true,
    });

    const colors = ['#F25C78', '#FFBE3D', '#5BC0EB', '#6BCB9F', '#C8A2F6'];

    fireConfetti({
      particleCount: 65,
      spread: 90,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.55 },
      colors,
    });

    const duration = 3000;
    const end = Date.now() + duration;
    let frameId = 0;

    const frame = () => {
      fireConfetti({
        particleCount: 4,
        angle: 60,
        spread: 62,
        startVelocity: 55,
        origin: { x: 0.05, y: 0.68 },
        colors,
      });
      fireConfetti({
        particleCount: 4,
        angle: 120,
        spread: 62,
        startVelocity: 55,
        origin: { x: 0.95, y: 0.68 },
        colors,
      });

      if (Date.now() < end) {
        frameId = requestAnimationFrame(frame);
      }
    };

    frame();

    return () => {
      cancelAnimationFrame(frameId);
      fireConfetti.reset();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="win-dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onMenu();
      }}
      className="win-dialog overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 w-full h-full z-20"
      />

      <div className="win-dialog-card relative z-10 w-full max-w-xl bg-[#FFFDF8] rounded-[2.5rem] overflow-hidden text-center border-4 border-[#FFBE3D] shadow-[0_12px_0_#D99216,0_24px_48px_rgba(61,38,69,0.28)]">
        <PlayroomBunting variant="card" />

        <div className="px-6 sm:px-8 pb-7 sm:pb-9 pt-2">
          <div className="flex items-center justify-center gap-3 mb-3">
            <StorybookStar filled className="w-8 h-8 -rotate-12" />
            <ScallopedMedallion src="/images/lina.jpg" alt="" showCrown size="md" />
            <StorybookStar filled className="w-8 h-8 rotate-12" />
          </div>

          <h1
            id="win-dialog-title"
            className="sticker-title text-3xl sm:text-5xl text-[#F25C78] mb-2"
          >
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#3D2645] mb-6 font-bold">
            {message}
          </p>

          <div className="flex flex-col gap-3">
            {onNext && nextLabel && (
              <button
                type="button"
                autoFocus
                onClick={onNext}
                className="toy-press flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#FFBE3D] text-[#3D2645] text-lg sm:text-xl font-bold rounded-full border-3 border-[#3D2645] shadow-[0_6px_0_#D99216] cursor-pointer"
              >
                <span>{nextLabel}</span>
                <ArrowRight className="w-6 h-6" aria-hidden="true" />
              </button>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                autoFocus={!onNext}
                onClick={onRestart}
                className="toy-press flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#6BCB9F] text-[#3D2645] text-base sm:text-lg font-bold whitespace-nowrap rounded-full border-3 border-[#3D2645] shadow-[0_5px_0_#3EA376] cursor-pointer"
              >
                <RefreshCw className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Jugar otra vez</span>
              </button>

              <button
                type="button"
                onClick={onMenu}
                className="toy-press flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#FFF8EE] text-[#3D2645] text-base sm:text-lg font-bold whitespace-nowrap rounded-full border-3 border-[#F25C78] shadow-[0_5px_0_#C93B58] cursor-pointer"
              >
                <Home className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{menuLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};
