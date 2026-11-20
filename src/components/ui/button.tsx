'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-forest-900 text-white hover:bg-forest-800 shadow-soft active:scale-[0.98] dark:bg-white dark:text-forest-900 dark:hover:bg-cream',
        terracotta:
          'bg-terracotta-500 text-white hover:bg-terracotta-600 shadow-glow active:scale-[0.98]',
        secondary:
          'bg-cream text-forest-900 border border-forest-900/10 hover:bg-forest-900/5 active:scale-[0.98] dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/15',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm active:scale-[0.98]',
        outline:
          'border border-forest-900/15 dark:border-white/15 bg-transparent text-forest-900 dark:text-white hover:bg-forest-900/5 dark:hover:bg-white/5 active:scale-[0.98]',
        neo:
          'bg-forest-900 text-white border-2 border-forest-900 shadow-[3px_3px_0_0_#0F2922] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1',
        ghost:
          'border border-transparent text-forest-900 dark:text-white hover:bg-forest-900/5 dark:hover:bg-white/5 active:bg-forest-900/10',
        link: 'text-terracotta-500 underline-offset-4 hover:underline p-0 h-auto font-semibold',
      },
      size: {
        default: 'h-11 px-6 rounded-full',
        sm: 'h-9 px-4 rounded-full text-xs',
        lg: 'h-13 px-8 rounded-full text-sm sm:text-base font-extrabold',
        icon: 'h-11 w-11 rounded-full p-0',
        pill: 'h-11 px-6 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
