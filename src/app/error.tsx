'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Client Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="h-20 w-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6">
        <AlertTriangle className="h-10 w-10" />
      </div>

      <span className="text-sm font-bold uppercase tracking-wider text-destructive">Application Error</span>
      <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mt-2">
        Something went wrong
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mt-3 leading-relaxed">
        An unexpected error occurred while rendering this page. You can try refreshing or navigate back to the home page.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Button variant="outline" onClick={() => reset()} className="gap-2 font-semibold">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button className="font-bold gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
