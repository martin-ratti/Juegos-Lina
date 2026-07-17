import { useState, useEffect } from 'react';

interface UseKeyboardProps {
  gridColumns: number;
  totalItems: number;
  onEnter: (index: number) => void;
  onEscape?: () => void;
  isActive: boolean;
}

export const useKeyboard = ({ gridColumns, totalItems, onEnter, onEscape, isActive }: UseKeyboardProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // prevent scrolling with space
        onEnter(focusedIndex);
        return;
      }

      setFocusedIndex((prev) => {
        let next = prev;
        switch (e.key) {
          case 'ArrowRight':
            next = (prev + 1) % totalItems;
            break;
          case 'ArrowLeft':
            next = (prev - 1 + totalItems) % totalItems;
            break;
          case 'ArrowDown':
            next = (prev + gridColumns) % totalItems;
            break;
          case 'ArrowUp':
            next = (prev - gridColumns + totalItems) % totalItems;
            break;
          default:
            return prev;
        }
        e.preventDefault(); // prevent scrolling
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gridColumns, totalItems, onEnter, onEscape, focusedIndex, isActive]);

  return { focusedIndex, setFocusedIndex };
};
