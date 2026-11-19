'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      api.get(`/payments/verify-session?sessionId=${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            setPaymentData(res.data.data);
            refreshUser();

            // Confetti celebration
            import('canvas-confetti').then((module) => {
              const confetti = module.default;
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
              });
            }).catch(() => {});
          }
        })
        .catch((err) => {
          console.error('Session verification error:', err);
          setError(err.response?.data?.message || 'Payment verification encountered an issue.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId, refreshUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-lg p-8 sm:p-10 border-2 border-emerald-500/30 shadow-2xl bg-card rounded-3xl text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div>
          <Badge variant="pro" className="mb-2">
            Pro Upgrade Successful
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Thank You for Your Subscription!
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Your payment via Stripe has been verified and your account is now upgraded to Pro status.
          </p>
        </div>

        {paymentData && (
          <div className="rounded-2xl bg-muted/60 border border-border/80 p-4 text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan Activated:</span>
              <strong className="text-foreground">{paymentData.planName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount Paid:</span>
              <strong className="text-foreground">${paymentData.amount} {paymentData.currency}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction Ref:</span>
              <span className="font-mono text-muted-foreground truncate max-w-[200px]">
                {paymentData.transactionId}
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-xs text-destructive bg-destructive/10 p-3 rounded-xl border border-destructive/20">
            {error}
          </p>
        )}

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tuitions">
            <Button variant="outline" className="w-full sm:w-auto font-semibold">
              Browse Tuitions
            </Button>
          </Link>
          <Link href={user?.role === 'tutor' ? '/dashboard/tutor' : '/dashboard/student'}>
            <Button className="w-full sm:w-auto font-bold gap-2">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm">Verifying payment...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
