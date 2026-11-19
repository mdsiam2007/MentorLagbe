'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-primary/15 via-indigo-500/10 to-secondary/15 border border-primary/20 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                Hello, {user?.name.split(' ')[0]}! 👋
              </h1>
              {user?.plan === 'pro' && (
                <Badge variant="pro" className="text-[10px]">
                  PRO STUDENT
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Track your pending tuition applications, accepted batches, and academic progress here.
            </p>
          </div>

          <Link href="/tuitions">
            <Button className="font-bold gap-2 shrink-0">
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
          <Card className="p-6 border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold">Total Applied</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-foreground">{stats?.totalApplied || 0}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Submitted applications</p>
            </div>
          </Card>

          {/* Accepted */}
          <Card className="p-6 border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold">Accepted</span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-emerald-600">{stats?.accepted || 0}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Confirmed tuition batches</p>
            </div>
          </Card>

          {/* Pending */}
          <Card className="p-6 border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold">Pending Review</span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-amber-600">{stats?.pending || 0}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Awaiting tutor decision</p>
            </div>
          </Card>

          {/* Current Plan */}
          <Card className="p-6 border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold">Current Plan</span>
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-black text-foreground uppercase">
                {stats?.plan || user?.plan || 'FREE'}
              </p>
              {stats?.plan === 'pro' || user?.plan === 'pro' ? (
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  Priority Application Active
                </p>
              ) : (
                <Link
                  href="/pricing"
                  className="text-[11px] text-primary font-bold hover:underline mt-1 block"
                >
                  Upgrade to Pro ($10) →
                </Link>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Quick Navigation Card */}
      <Card className="p-6 border border-border/80 shadow-sm bg-card space-y-4">
        <h3 className="text-base font-bold text-foreground">Quick Action Center</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/student/my-applications"
            className="flex items-center justify-between p-4 rounded-2xl border border-border bg-muted/30 hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">View My Applications</p>
                <p className="text-xs text-muted-foreground">Check status, cancel pending requests</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center justify-between p-4 rounded-2xl border border-border bg-muted/30 hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Update Profile Details</p>
                <p className="text-xs text-muted-foreground">Keep contact information updated</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
