'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
  {
    variants: {
      variant: {
        // Uiverse Flat Solid (tactile flat with 3px flat bottom-border shadow)
        default:
          'bg-primary text-primary-foreground border-2 border-primary/20 shadow-[0_4px_0_0_hsl(var(--primary)/0.6)] hover:shadow-[0_2px_0_0_hsl(var(--primary)/0.6)] hover:translate-y-0.5 active:translate-y-1 active:shadow-none',
        // Uiverse Flat Secondary (emerald / secondary accent)
        secondary:
          'bg-secondary text-secondary-foreground border-2 border-secondary/30 shadow-[0_4px_0_0_hsl(var(--secondary)/0.6)] hover:shadow-[0_2px_0_0_hsl(var(--secondary)/0.6)] hover:translate-y-0.5 active:translate-y-1 active:shadow-none',
        // Uiverse Flat Destructive
        destructive:
          'bg-destructive text-destructive-foreground border-2 border-destructive/30 shadow-[0_4px_0_0_hsl(var(--destructive)/0.6)] hover:shadow-[0_2px_0_0_hsl(var(--destructive)/0.6)] hover:translate-y-0.5 active:translate-y-1 active:shadow-none',
        // Uiverse Flat Outline (crisp flat border with tactile lift)
        outline:
          'border-2 border-border bg-card text-foreground shadow-[0_3px_0_0_hsl(var(--border))] hover:border-primary/50 hover:bg-muted/40 hover:translate-y-0.5 active:translate-y-1 active:shadow-none',
        // Uiverse Flat Neo (solid dark flat border & flat offset)
        neo:
          'bg-primary text-white border-2 border-foreground shadow-[3px_3px_0_0_hsl(var(--foreground))] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_hsl(var(--foreground))] active:translate-x-1 active:translate-y-1 active:shadow-none',
        // Uiverse Flat Ghost
        ghost:
          'border-2 border-transparent text-foreground hover:bg-muted/60 hover:text-foreground active:bg-muted',
        // Link
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto font-semibold',
      },
      size: {
        default: 'h-11 px-5 rounded-2xl',
        sm: 'h-9 px-3.5 rounded-xl text-xs',
        lg: 'h-13 px-8 rounded-2xl text-sm sm:text-base font-extrabold',
        icon: 'h-11 w-11 rounded-2xl p-0',
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
