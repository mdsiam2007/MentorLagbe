import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
        <Compass className="h-10 w-10 animate-spin-slow" />
      </div>

      <span className="text-sm font-bold uppercase tracking-wider text-primary">404 Error</span>
      <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight mt-2">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mt-3 leading-relaxed">
        Sorry, the page you are looking for doesn&apos;t exist, has been moved, or is temporarily
        unavailable.
      </p>

      <div className="mt-8">
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
