import { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

export const useViewTransitionNavigate = () => {
  const navigate = useNavigate();

  return useCallback(
    (to: string) => {
      const focusHeading = () => {
        const heading = document.querySelector<HTMLElement>('h1[tabindex="-1"]');
        heading?.focus({ preventScroll: true });
      };

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!document.startViewTransition || prefersReducedMotion) {
        navigate(to);
        requestAnimationFrame(focusHeading);
        return;
      }

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          navigate(to);
        });
      });

      transition.finished.finally(() => {
        focusHeading();
      });
    },
    [navigate]
  );
};
