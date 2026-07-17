import { useState, useEffect, useRef } from 'react';

interface UseKeyboardProps {
  gridColumns: number;
  totalItems: number;
  onEnter: (index: number) => void;
  onEscape?: () => void;
  isActive: boolean;
}

export const useKeyboard = ({ gridColumns, totalItems, onEnter, onEscape, isActive }: UseKeyboardProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Use refs for callbacks to avoid re-registering the listener every time they change
  const onEnterRef = useRef(onEnter);
  const onEscapeRef = useRef(onEscape);
  const focusedRef = useRef(focusedIndex);

  useEffect(() => { onEnterRef.current = onEnter; }, [onEnter]);
  useEffect(() => { onEscapeRef.current = onEscape; }, [onEscape]);
  useEffect(() => { focusedRef.current = focusedIndex; }, [focusedIndex]);

  useEffect(() => {
    if (!isActive || totalItems === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscapeRef.current) {
        onEscapeRef.current();
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onEnterRef.current(focusedRef.current);
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
            next = Math.min(prev + gridColumns, totalItems - 1);
            break;
          case 'ArrowUp':
            next = Math.max(prev - gridColumns, 0);
            break;
          default:
            return prev;
        }
        e.preventDefault();
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gridColumns, totalItems, isActive]);

  // Reset focus when totalItems changes (e.g., new game)
  useEffect(() => {
    setFocusedIndex(0);
  }, [totalItems]);

  return { focusedIndex, setFocusedIndex };
};
