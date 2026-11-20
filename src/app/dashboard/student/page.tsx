'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCardSkeleton } from '@/components/ui/skeleton';
import {
  FileText,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
} from 'lucide-react';

export default function StudentOverviewPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/dashboard-stats')
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.data);
        }
      })
      .catch((err) => console.error('Failed to load stats:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-forest-900/10 via-terracotta-500/10 to-amberwarm-500/10 border border-forest-900/15 dark:border-white/10 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
                Hello, {user?.name.split(' ')[0]}! 👋
              </h1>
              {user?.plan === 'pro' && (
                <Badge variant="pro" className="text-[10px]">
                  PRO STUDENT
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Track your pending tuition applications, accepted batches, and academic progress here.
            </p>
          </div>

          <Link href="/tuitions" className="shrink-0">
            <Button variant="terracotta" className="font-bold gap-2 rounded-full shadow-glow">
              <Search className="h-4 w-4" />
              Find More Tuitions
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Applied */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Total Applied</span>
              <div className="h-9 w-9 rounded-2xl bg-forest-900/10 dark:bg-white/10 text-forest-900 dark:text-cream flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-foreground">
                {stats?.totalApplied || 0}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Submitted applications</p>
            </div>
          </Card>

          {/* Accepted */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Accepted</span>
              <div className="h-9 w-9 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-emerald-600 dark:text-emerald-400">
                {stats?.accepted || 0}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Confirmed tuition batches</p>
            </div>
          </Card>

          {/* Pending */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Pending Review</span>
              <div className="h-9 w-9 rounded-2xl bg-amberwarm-500/15 text-amberwarm-500 flex items-center justify-center">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-amberwarm-500">
                {stats?.pending || 0}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Awaiting tutor decision</p>
            </div>
          </Card>

          {/* Current Plan */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Current Plan</span>
              <div className="h-9 w-9 rounded-2xl bg-terracotta-500/15 text-terracotta-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-2xl sm:text-3xl font-serif font-black text-foreground uppercase tracking-tight">
                {stats?.plan || user?.plan || 'FREE'}
              </p>
              {stats?.plan === 'pro' || user?.plan === 'pro' ? (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                  Priority Application Active
                </p>
              ) : (
                <Link
                  href="/pricing"
                  className="text-[11px] text-terracotta-500 font-bold hover:underline mt-1 block"
                >
                  Upgrade to Pro ($10) →
                </Link>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Quick Navigation Card */}
      <Card className="p-6 sm:p-7 border border-forest-900/10 dark:border-white/10 shadow-card bg-card rounded-3xl space-y-4">
        <h3 className="text-base sm:text-lg font-serif font-bold text-foreground">
          Quick Action Center
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/student/my-applications"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-forest-900/10 dark:border-white/10 bg-cream/50 dark:bg-white/5 hover:border-terracotta-500/50 hover:shadow-soft transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-forest-900/10 dark:bg-white/10 text-forest-900 dark:text-cream flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground font-sans">View My Applications</p>
                <p className="text-xs text-muted-foreground mt-0.5">Check status, cancel pending requests</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-terracotta-500 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-forest-900/10 dark:border-white/10 bg-cream/50 dark:bg-white/5 hover:border-terracotta-500/50 hover:shadow-soft transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-terracotta-500/15 text-terracotta-500 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground font-sans">Update Profile Details</p>
                <p className="text-xs text-muted-foreground mt-0.5">Keep contact information updated</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-terracotta-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
