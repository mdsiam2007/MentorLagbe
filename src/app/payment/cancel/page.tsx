import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream/40 dark:bg-[#081612] px-4 py-16 transition-colors duration-300">
      <Card className="w-full max-w-md p-8 sm:p-10 border border-forest-900/10 dark:border-white/10 shadow-card bg-white dark:bg-[#0F241E] rounded-3xl text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-amberwarm-100 dark:bg-amberwarm-500/20 text-amberwarm-600 dark:text-amberwarm-300 mx-auto flex items-center justify-center shadow-soft">
          <XCircle className="h-10 w-10" />
        </div>

        <div>
          <h1 className="font-serif text-2xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
            Checkout Cancelled
          </h1>
          <p className="text-xs sm:text-sm text-forest-800/70 dark:text-white/70 mt-2">
            No charges were made to your account. You can retry the upgrade whenever you are ready.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto font-semibold gap-2 rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="terracotta" className="w-full sm:w-auto font-bold gap-2 rounded-full shadow-glow cursor-pointer">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}