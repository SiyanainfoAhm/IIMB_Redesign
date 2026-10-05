import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "iimb_saved_events";

export interface SavedEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  time: string;
  venue: string;
  category: string;
}

interface SavedEventsContextValue {
  saved: SavedEvent[];
  toggle: (event: SavedEvent) => void;
  save: (event: SavedEvent) => void;
  remove: (id: string) => void;
  clear: () => void;
  isSaved: (id: string) => boolean;
  /** Increments each time an event is newly saved, so the page can nudge. */
  saveSignal: number;
}

const SavedEventsContext = createContext<SavedEventsContextValue | undefined>(undefined);

const isSavedEvent = (value: unknown): value is SavedEvent => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === "string" && typeof candidate.title === "string";
};

const readStored = (): SavedEvent[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedEvent);
  } catch {
    return [];
  }
};

export function SavedEventsProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<SavedEvent[]>(readStored);
  const [saveSignal, setSaveSignal] = useState(0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // Storage may be unavailable; the list simply won't persist.
    }
  }, [saved]);

  const save = useCallback((event: SavedEvent) => {
    setSaved((prev) => {
      if (prev.some((item) => item.id === event.id)) return prev;
      setSaveSignal((count) => count + 1);
      return [...prev, event];
    });
  }, []);

  const toggle = useCallback((event: SavedEvent) => {
    setSaved((prev) => {
      if (prev.some((item) => item.id === event.id)) {
        return prev.filter((item) => item.id !== event.id);
      }
      setSaveSignal((count) => count + 1);
      return [...prev, event];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setSaved([]), []);

  const value = useMemo<SavedEventsContextValue>(
    () => ({
      saved,
      toggle,
      save,
      remove,
      clear,
      isSaved: (id: string) => saved.some((item) => item.id === id),
      saveSignal,
    }),
    [saved, toggle, save, remove, clear, saveSignal],
  );

  return <SavedEventsContext.Provider value={value}>{children}</SavedEventsContext.Provider>;
}

export function useSavedEvents(): SavedEventsContextValue {
  const context = useContext(SavedEventsContext);
  if (!context) {
    throw new Error("useSavedEvents must be used within a SavedEventsProvider");
  }
  return context;
}