'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center rounded-xl border border-border/80 bg-card p-2 text-foreground hover:bg-muted/80 hover:border-primary/50 transition-all duration-300 active:scale-90 focus:outline-none focus:ring-2 focus:ring-primary/20 overflow-hidden ${className}`}
      aria-label="Toggle Dark / Light Theme"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      <div className="relative h-4 w-4 flex items-center justify-center">
        {/* Sun Icon for Dark Mode (showing Sun means clicking will bring Light) */}
        <Sun
          className={`h-4 w-4 text-amber-400 absolute inset-0 transition-all duration-500 ease-out transform ${
            theme === 'dark'
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0 pointer-events-none'
          }`}
        />

        {/* Moon Icon for Light Mode (showing Moon means clicking will bring Dark) */}
        <Moon
          className={`h-4 w-4 text-slate-700 dark:text-slate-200 absolute inset-0 transition-all duration-500 ease-out transform ${
            theme === 'dark'
              ? '-rotate-90 scale-0 opacity-0 pointer-events-none'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold capitalize">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
