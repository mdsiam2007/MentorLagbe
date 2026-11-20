'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeRippleOverlay: React.FC = () => {
  const { rippleState } = useTheme();

  if (!rippleState?.active) return null;

  const isDark = rippleState.targetTheme === 'dark';
  const { x, y } = rippleState.origin;

  return (
    <div
      className="theme-ripple-overlay"
      aria-hidden="true"
      style={{
        zIndex: 2147483646,
      }}
    >
      <div
        className={`theme-ripple-wave ${
          isDark ? 'bg-[#081612]' : 'bg-[#FAF8F5]'
        }`}
        style={{
          ['--ripple-x' as any]: `${x}px`,
          ['--ripple-y' as any]: `${y}px`,
        }}
      />
    </div>
  );
};

export default ThemeRippleOverlay;
