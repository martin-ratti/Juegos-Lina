import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface UseKeyboardProps {
  containerRef: RefObject<HTMLElement | SVGElement | null>;
  onEscape?: () => void;
  isActive: boolean;
}

export const useKeyboard = ({ containerRef, onEscape, isActive }: UseKeyboardProps) => {
  const onEscapeRef = useRef(onEscape);

  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.querySelector('dialog[open]')) {
        return;
      }

      if (e.key === 'Escape' && onEscapeRef.current) {
        onEscapeRef.current();
        return;
      }

      if (
        e.key !== 'ArrowRight' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowDown' &&
        e.key !== 'ArrowUp'
      ) {
        return;
      }

      const container = containerRef.current;
      if (!container) return;

      const items = Array.from(
        container.querySelectorAll<HTMLElement | SVGElement>('[data-kb-item]:not(:disabled)')
      );
      if (items.length === 0) return;

      e.preventDefault();

      const activeElement = document.activeElement as HTMLElement | SVGElement | null;
      const currentIndex = activeElement ? items.indexOf(activeElement) : -1;

      if (currentIndex === -1) {
        items[0].focus();
        return;
      }

      if (e.key === 'ArrowRight') {
        items[(currentIndex + 1) % items.length].focus();
        return;
      }

      if (e.key === 'ArrowLeft') {
        items[(currentIndex - 1 + items.length) % items.length].focus();
        return;
      }

      const currentRect = items[currentIndex].getBoundingClientRect();
      const currentCenterX = currentRect.left + currentRect.width / 2;

      const candidates = items
        .map((el) => ({ el, rect: el.getBoundingClientRect() }))
        .filter(({ rect }) =>
          e.key === 'ArrowDown'
            ? rect.top >= currentRect.bottom - 8
            : rect.bottom <= currentRect.top + 8
        );

      if (candidates.length === 0) return;

      const targetRowY =
        e.key === 'ArrowDown'
          ? Math.min(...candidates.map((c) => c.rect.top))
          : Math.max(...candidates.map((c) => c.rect.bottom));

      const sameRow = candidates.filter((c) =>
        e.key === 'ArrowDown'
          ? Math.abs(c.rect.top - targetRowY) < 28
          : Math.abs(c.rect.bottom - targetRowY) < 28
      );

      let best = sameRow[0] ?? candidates[0];
      let bestDist = Infinity;

      for (const candidate of sameRow) {
        const centerX = candidate.rect.left + candidate.rect.width / 2;
        const dist = Math.abs(centerX - currentCenterX);
        if (dist < bestDist) {
          bestDist = dist;
          best = candidate;
        }
      }

      best.el.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, isActive]);
};
