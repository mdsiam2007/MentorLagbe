import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-md p-8 sm:p-10 border border-border shadow-xl bg-card rounded-3xl text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-amber-500/15 text-amber-600 mx-auto flex items-center justify-center">
          <XCircle className="h-10 w-10" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Checkout Cancelled
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            No charges were made to your account. You can retry the upgrade whenever you are ready.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto font-semibold gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
          <Link href="/pricing">
            <Button className="w-full sm:w-auto font-bold gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
