import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#0F241E] px-4 py-2 text-sm text-forest-900 dark:text-[#F5F2EB] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-forest-800/40 dark:placeholder:text-[#F5F2EB]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/40 focus-visible:border-terracotta-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
