import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-cream/40 dark:bg-[#081612] transition-colors duration-300">
      <div className="h-20 w-20 rounded-full bg-terracotta-50 dark:bg-terracotta-500/20 border border-terracotta-500/20 text-terracotta-500 flex items-center justify-center mb-6 shadow-soft">
        <Compass className="h-10 w-10 animate-spin-slow" />
      </div>

      <Badge variant="terracotta" className="mb-2 rounded-full font-bold uppercase tracking-wider text-xs">
        404 Error
      </Badge>
      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight mt-2">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 max-w-md mx-auto mt-3 leading-relaxed">
        Sorry, the page you are looking for doesn&apos;t exist, has been moved, or is temporarily
        unavailable.
      </p>

      <div className="mt-8">
        <Link href="/">
          <Button variant="terracotta" className="font-bold gap-2 rounded-full shadow-glow cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}