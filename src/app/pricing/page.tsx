'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { toast } from 'sonner';
import { CheckCircle2, Sparkles, Zap, Shield, Lock, AlertCircle, ArrowRight } from 'lucide-react';

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

    if (user.role === 'admin') {
      toast.info('Administrator accounts already enjoy full platform access without subscription.');
      return;
    }

    // Role-based subscription authorization guard
    if (user.role === 'student' && planType !== 'pro_student') {
      toast.error('Role Restriction: Student accounts can only purchase the Pro Student Plan ($10).');
      return;
    }

    if (user.role === 'tutor' && planType !== 'pro_tutor') {
      toast.error('Role Restriction: Tutor accounts can only purchase the Pro Tutor Plan ($15).');
      return;
    }

    if (user.plan === 'pro') {
      toast.success('You already have an active Pro Plan! Enjoy your premium privileges.');
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

  const isTutor = user?.role === 'tutor';
  const isStudent = user?.role === 'student';
  const isAdmin = user?.role === 'admin';
  const hasPro = user?.plan === 'pro';

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <Badge variant="pro" className="px-3.5 py-1 text-xs">
          Stripe Powered Plans
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          Upgrade Your MentorLagbe Experience
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Choose the plan designed specifically for your account role. Simple, transparent, and strictly role-protected.
        </p>

        {user && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs font-semibold text-muted-foreground">Logged in as:</span>
            <Badge variant="outline" className="text-xs uppercase font-bold tracking-wider">
              {user.role}
            </Badge>
            {hasPro ? (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Active Pro Membership
              </div>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Free Tier
              </Badge>
            )}
          </div>
        )}

        {/* Pricing Cards with 3D Tilt & Strict Role Access Controls */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 text-left items-stretch">
          {/* 1. TUTOR PRO PLAN CARD */}
          <Tilt3DCard
            tiltMaxAngle={isStudent ? 2 : 6}
            scaleOnHover={isStudent ? 1 : 1.02}
            glareOpacity={isStudent ? 0.05 : 0.15}
            className="h-full rounded-3xl"
          >
            <Card
              className={`flex flex-col justify-between h-full border-2 ${
                isStudent
                  ? 'border-border/60 opacity-75 bg-muted/20'
                  : 'border-primary/50 shadow-2xl bg-card'
              } relative overflow-hidden p-8 rounded-3xl transition-all`}
            >
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[11px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
                Exclusively For Mentors
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
                  Empower your tutoring career. Post unlimited tuition batches and build instant credibility with a verified mentor badge.
                </p>

                {/* Role Warning Banner if Student views Tutor card */}
                {isStudent && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-400">
                    <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tutors Only:</strong> Your account is registered as a Student. You can only subscribe to the Pro Student Plan below.
                    </span>
                  </div>
                )}

                <div className="mt-8 space-y-3.5 text-xs text-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Unlimited Tuition Postings</strong> (Free capped at 2 posts)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Verified Pro Tutor Badge</strong> displayed on listings & profile
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Priority Search Placement</strong> in the Tuitions catalog
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Instant student applicant SMS & direct messaging alerts</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                {!user ? (
                  <Button
                    onClick={() => router.push('/sign-in')}
                    className="w-full font-bold h-12 text-sm shadow-md"
                  >
                    Sign In as Tutor to Upgrade ($15)
                  </Button>
                ) : isAdmin ? (
                  <Button disabled className="w-full font-bold h-12 text-xs opacity-60">
                    Admin Full Access Active
                  </Button>
                ) : isStudent ? (
                  <Button
                    disabled
                    variant="outline"
                    className="w-full font-bold h-12 text-xs opacity-50 cursor-not-allowed"
                  >
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    Restricted (Tutor Role Required)
                  </Button>
                ) : isTutor && hasPro ? (
                  <Button disabled className="w-full font-bold h-12 text-sm bg-emerald-600 text-white opacity-90">
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    Current Plan Active (Pro Tutor)
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubscribe('pro_tutor')}
                    disabled={loadingPlan === 'pro_tutor'}
                    className="w-full font-bold shadow-lg shadow-primary/25 h-12 text-sm"
                  >
                    {loadingPlan === 'pro_tutor'
                      ? 'Redirecting to Stripe...'
                      : 'Upgrade Tutor to Pro ($15)'}
                  </Button>
                )}
              </div>
            </Card>
          </Tilt3DCard>

          {/* 2. STUDENT PRO PLAN CARD */}
          <Tilt3DCard
            tiltMaxAngle={isTutor ? 2 : 6}
            scaleOnHover={isTutor ? 1 : 1.02}
            glareOpacity={isTutor ? 0.05 : 0.15}
            className="h-full rounded-3xl"
          >
            <Card
              className={`flex flex-col justify-between h-full border-2 ${
                isTutor
                  ? 'border-border/60 opacity-75 bg-muted/20'
                  : 'border-secondary/50 shadow-2xl bg-card'
              } relative overflow-hidden p-8 rounded-3xl transition-all`}
            >
              <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[11px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
                Exclusively For Students
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

                {/* Role Warning Banner if Tutor views Student card */}
                {isTutor && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-400">
                    <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Students Only:</strong> Your account is registered as a Tutor. You can only subscribe to the Pro Tutor Plan above.
                    </span>
                  </div>
                )}

                <div className="mt-8 space-y-3.5 text-xs text-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Priority Application Status:</strong> Top of mentor review queue
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
                      <strong>Fast-Track Review:</strong> 2x quicker mentor acceptance times
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Free access to future platform learning resources & test series</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                {!user ? (
                  <Button
                    onClick={() => router.push('/sign-in')}
                    variant="outline"
                    className="w-full font-bold h-12 text-sm shadow-md"
                  >
                    Sign In as Student to Upgrade ($10)
                  </Button>
                ) : isAdmin ? (
                  <Button disabled className="w-full font-bold h-12 text-xs opacity-60">
                    Admin Full Access Active
                  </Button>
                ) : isTutor ? (
                  <Button
                    disabled
                    variant="outline"
                    className="w-full font-bold h-12 text-xs opacity-50 cursor-not-allowed"
                  >
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    Restricted (Student Role Required)
                  </Button>
                ) : isStudent && hasPro ? (
                  <Button disabled className="w-full font-bold h-12 text-sm bg-emerald-600 text-white opacity-90">
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    Current Plan Active (Pro Student)
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubscribe('pro_student')}
                    disabled={loadingPlan === 'pro_student'}
                    variant="default"
                    className="w-full font-bold h-12 text-sm shadow-lg shadow-secondary/25"
                  >
                    {loadingPlan === 'pro_student'
                      ? 'Redirecting to Stripe...'
                      : 'Upgrade Student to Pro ($10)'}
                  </Button>
                )}
              </div>
            </Card>
          </Tilt3DCard>
        </div>
      </div>
    </div>
  );
}
