'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeMap = {
    sm: { icon: 30, text: 'text-lg', badge: 'text-[9px]' },
    md: { icon: 38, text: 'text-2xl', badge: 'text-[10px]' },
    lg: { icon: 48, text: 'text-3xl', badge: 'text-xs' },
  };

  const { icon, text } = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight group select-none transition-transform active:scale-95 ${className}`}
    >
      {/* AI Generated Brand Logo Icon from /public/logo-icon.jpg */}
      <div
        className="relative flex items-center justify-center rounded-xl overflow-hidden border border-border shadow-sm group-hover:border-primary/60 group-hover:shadow-md transition-all duration-300 bg-card"
        style={{ width: icon, height: icon }}
      >
        <img
          src="/logo-icon.jpg"
          alt="MentorLagbe Brand Logo"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-black ${text} text-foreground tracking-tight transition-colors group-hover:text-primary`}>
            Mentor<span className="text-primary font-black">Lagbe</span>
          </span>
          <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest">
            Tuition Platform
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
