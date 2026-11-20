'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export interface RippleState {
  active: boolean;
  targetTheme: Theme;
  origin: { x: number; y: number };
}

interface ThemeContextType {
  theme: Theme;
  rippleState: RippleState | null;
  toggleTheme: (e?: React.MouseEvent) => void;
  setTheme: (theme: Theme, origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [rippleState, setRippleState] = useState<RippleState | null>(null);

  useEffect(() => {
    const isDarkAlready = document.documentElement.classList.contains('dark');
    const savedTheme = localStorage.getItem('mentorlagbe_theme') as Theme | null;
    const initialTheme: Theme = savedTheme || (isDarkAlready ? 'dark' : 'light');
    setThemeState(initialTheme);
  }, []);

  const setTheme = (newTheme: Theme, origin?: { x: number; y: number }) => {
    const x = origin?.x ?? 40;
    const y = origin?.y ?? (typeof window !== 'undefined' ? window.innerHeight - 40 : 800);

    // 1. Immediately apply theme to background DOM & storage with zero delay
    setThemeState(newTheme);
    localStorage.setItem('mentorlagbe_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Concurrently run the high z-index circular expansion wave on top
    setRippleState({
      active: true,
      targetTheme: newTheme,
      origin: { x, y }
    });

    // 3. Remove overlay cleanly when the wave finishes
    setTimeout(() => {
      setRippleState(null);
    }, 650);
  };

  const toggleTheme = (e?: React.MouseEvent) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const origin = e
      ? { x: e.clientX, y: e.clientY }
      : { x: 40, y: typeof window !== 'undefined' ? window.innerHeight - 40 : 800 };
    setTheme(nextTheme, origin);
  };

  return (
    <ThemeContext.Provider value={{ theme, rippleState, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
