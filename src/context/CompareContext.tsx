import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export const COMPARE_MAX = 3;
const STORAGE_KEY = "iimb_programme_shortlist";

interface CompareContextValue {
  selected: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  isFull: boolean;
  max: number;
  /** Increments each time a programme is newly added to the shortlist. */
  addSignal: number;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

const readStored = (): string[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === "string")
      .slice(0, COMPARE_MAX);
  } catch {
    return [];
  }
};

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>(readStored);
  const [addSignal, setAddSignal] = useState(0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      // Storage may be unavailable; the shortlist simply won't persist.
    }
  }, [selected]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= COMPARE_MAX) return prev;
      setAddSignal((count) => count + 1);
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSelected((prev) => prev.filter((item) => item !== id));
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const value = useMemo<CompareContextValue>(
    () => ({
      selected,
      toggle,
      remove,
      clear,
      isSelected: (id: string) => selected.includes(id),
      isFull: selected.length >= COMPARE_MAX,
      max: COMPARE_MAX,
      addSignal,
    }),
    [selected, toggle, remove, clear, addSignal],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare(): CompareContextValue {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}