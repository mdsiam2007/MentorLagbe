import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-2xl' },
    lg: { icon: 48, text: 'text-3xl' },
  };

  const { icon, text } = sizeMap[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 font-bold tracking-tight ${className}`}>
      {/* Modern Gradient AI Logo Mark */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-indigo-600 to-secondary p-1.5 shadow-md shadow-primary/20 text-white overflow-hidden"
        style={{ width: icon, height: icon }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-white"
        >
          {/* Graduation Cap */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          {/* Guiding Mentor Star Sparkle */}
          <circle cx="12" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {showText && (
        <span className={`font-extrabold ${text} text-foreground tracking-tight`}>
          Mentor<span className="text-primary font-black">Lagbe</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
