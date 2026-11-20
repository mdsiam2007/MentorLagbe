'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all border select-none',
  {
    variants: {
      variant: {
        default:
          'border-forest-900/15 bg-forest-900/10 text-forest-900 dark:text-[#F5F2EB] dark:bg-white/10 dark:border-white/15',
        secondary:
          'border-forest-900/10 bg-cream text-forest-800 dark:bg-forest-900/40 dark:text-cream dark:border-white/10',
        terracotta:
          'border-terracotta-500/20 bg-terracotta-50 text-terracotta-600 dark:bg-terracotta-500/20 dark:text-terracotta-100',
        destructive: 'border-destructive/40 bg-destructive/10 text-destructive',
        outline:
          'border-forest-900/15 text-forest-900 dark:border-white/15 dark:text-[#F5F2EB]',
        success:
          'border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
        warning:
          'border-amber-500/30 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
        pro:
          'border-amberwarm-500/30 bg-amberwarm-100 text-amberwarm-500 dark:bg-amberwarm-500/20 dark:text-amberwarm-100 font-black uppercase tracking-wider',
        flat:
          'border-transparent bg-forest-900/5 text-forest-800 dark:bg-white/5 dark:text-white/80',
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
