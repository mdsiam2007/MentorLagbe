'use client';

import React from 'react';
import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'forest' | 'terracotta' | 'white';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  variant = 'forest',
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-lg', badge: 'text-[9px]' },
    md: { box: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xl', badge: 'text-[10px]' },
    lg: { box: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-2xl sm:text-3xl', badge: 'text-xs' },
  };

  const { box, icon, text } = sizeMap[size];

  const iconBg =
    variant === 'terracotta'
      ? 'bg-terracotta-500 text-white'
      : variant === 'white'
      ? 'bg-white text-forest-900'
      : 'bg-forest-900 text-terracotta-500 dark:bg-white dark:text-forest-900';

  const textColor =
    variant === 'white'
      ? 'text-white'
      : 'text-forest-900 dark:text-white';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group select-none transition-transform active:scale-95 ${className}`}
    >
      <div
        className={`${box} rounded-full ${iconBg} flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-sm`}
      >
        <HeartHandshake className={`${icon} transition-transform group-hover:scale-110`} />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif font-bold ${text} tracking-tight ${textColor} transition-colors`}>
            Mentor<span className="text-terracotta-500">Lagbe</span>
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
