'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all border-2 select-none',
  {
    variants: {
      variant: {
        default: 'border-primary/30 bg-primary/10 text-primary',
        secondary: 'border-secondary/40 bg-secondary/10 text-secondary',
        destructive: 'border-destructive/40 bg-destructive/10 text-destructive',
        outline: 'border-border bg-card text-foreground',
        success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        warning: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400',
        pro: 'border-amber-500/50 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-black uppercase tracking-wider',
        flat: 'border-border/60 bg-muted/60 text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
