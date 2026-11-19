'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { CheckCircle2, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planType: 'pro_tutor' | 'pro_student') => {
    if (!user) {
      toast.info('Please sign in first to upgrade your account.');
      router.push('/sign-in');
      return;
    }

    if (user.plan === 'pro') {
      toast.success('You already have an active Pro Plan! Enjoy premium privileges.');
      return;
    }

    setLoadingPlan(planType);
    try {
      const res = await api.post('/payments/create-checkout-session', { planType });
      if (res.data.success && res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Failed to initiate Stripe session.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      toast.error(err.response?.data?.message || 'Failed to start Stripe checkout.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <Badge variant="pro" className="px-3 py-1 text-xs">
          Stripe Powered Plans
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          Upgrade Your MentorLagbe Experience
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Choose the right plan to expand your tuition reach or accelerate your academic bookings.
          Simple, transparent, zero hidden charges.
        </p>

        {user?.plan === 'pro' && (
          <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-5 py-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-4">
            <Sparkles className="h-4 w-4" />
            Active Pro Member Account ({user.role.toUpperCase()})
          </div>
        )}

        {/* Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 text-left items-stretch">
          {/* Tutor Pro Plan */}
          <Card className="flex flex-col justify-between border-2 border-primary/50 shadow-2xl relative overflow-hidden bg-card p-8 rounded-3xl">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
              Popular for Mentors
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold uppercase text-primary tracking-wider">
                  Pro Tutor Subscription
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-5xl font-black text-foreground">$15</span>
                <span className="text-sm text-muted-foreground font-medium">USD one-time / lifetime</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Empower your tutoring career. Post unlimited batches and build instant credibility with a
                verified mentor badge.
              </p>

              <div className="mt-8 space-y-3.5 text-xs text-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Unlimited Tuition Postings</strong> (Free Plan capped at 2 posts)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Verified Pro Tutor Badge</strong> displayed on cards and profile
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Priority Search Placement</strong> in the Browse Tuitions catalog
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Instant student applicant notification & direct scheduling</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Button
                onClick={() => handleSubscribe('pro_tutor')}
                disabled={loadingPlan === 'pro_tutor' || user?.plan === 'pro'}
                className="w-full font-bold shadow-lg shadow-primary/25 h-12 text-sm"
              >
                {loadingPlan === 'pro_tutor'
                  ? 'Redirecting to Stripe...'
                  : user?.plan === 'pro'
                  ? 'Current Plan Active'
                  : 'Upgrade Tutor to Pro ($15)'}
              </Button>
            </div>
          </Card>

          {/* Student Pro Plan */}
          <Card className="flex flex-col justify-between border border-border shadow-md relative overflow-hidden bg-card p-8 rounded-3xl">
            <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
              For Students
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary" />
                <span className="text-xs font-bold uppercase text-secondary tracking-wider">
                  Pro Student Subscription
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-5xl font-black text-foreground">$10</span>
                <span className="text-sm text-muted-foreground font-medium">USD one-time / lifetime</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Get first priority in competitive batches and access direct academic mentoring privileges.
              </p>

              <div className="mt-8 space-y-3.5 text-xs text-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Priority Application Status:</strong> Top of tutor applicant review list
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pro Student Verified Badge:</strong> Stand out to premium mentors
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fast-Track Acceptance:</strong> 2x quicker review response times
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Free access to future platform learning resources</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => handleSubscribe('pro_student')}
                disabled={loadingPlan === 'pro_student' || user?.plan === 'pro'}
                className="w-full font-bold h-12 text-sm"
              >
                {loadingPlan === 'pro_student'
                  ? 'Redirecting to Stripe...'
                  : user?.plan === 'pro'
                  ? 'Current Plan Active'
                  : 'Upgrade Student to Pro ($10)'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
