"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PreloaderContextType {
  isComplete: boolean;
  setComplete: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState(false);

  // Fallback to ensure everything shows up eventually even if something fails
  useEffect(() => {
    if (!isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 10000); // 10s absolute maximum fallback
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <PreloaderContext.Provider value={{ isComplete, setComplete: setIsComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
}
