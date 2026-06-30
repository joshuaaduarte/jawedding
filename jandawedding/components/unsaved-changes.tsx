"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";

type UnsavedChangesContextValue = {
  /** Register whether the current page has unsaved edits. */
  setDirty: (dirty: boolean) => void;
  /** Returns true if it's safe to navigate (clean, or the user confirmed). */
  confirmIfDirty: () => boolean;
};

const UnsavedChangesContext =
  createContext<UnsavedChangesContextValue | null>(null);

export function UnsavedChangesProvider({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) {
  // A ref keeps dirty state out of render so toggling it never re-renders
  // the whole portal — only the form that owns the state re-renders.
  const dirtyRef = useRef(false);

  const setDirty = useCallback((dirty: boolean) => {
    dirtyRef.current = dirty;
  }, []);

  const confirmIfDirty = useCallback(() => {
    if (!dirtyRef.current) return true;
    return window.confirm(message);
  }, [message]);

  return (
    <UnsavedChangesContext.Provider value={{ setDirty, confirmIfDirty }}>
      {children}
    </UnsavedChangesContext.Provider>
  );
}

export function useUnsavedChanges() {
  return useContext(UnsavedChangesContext);
}
