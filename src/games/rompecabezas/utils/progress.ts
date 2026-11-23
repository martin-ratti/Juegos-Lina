const STORAGE_KEY = 'juegos-lina-completed-puzzles-v1';

export function getCompletedPuzzles(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

export function markPuzzleCompleted(puzzleId: string): string[] {
  const current = getCompletedPuzzles();
  if (current.includes(puzzleId)) {
    return current;
  }
  const updated = [...current, puzzleId];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignorar errores de almacenamiento privado
  }
  return updated;
}
