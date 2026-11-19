'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCardSkeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  ShieldCheck,
  BookOpen,
  DollarSign,
  CheckSquare,
  CreditCard,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function AdminOverviewPage() {
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
      .catch((err) => console.error('Failed to load admin stats:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Admin Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-destructive/15 via-primary/10 to-indigo-500/15 border border-destructive/20 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                Platform Administration 🛡️
              </h1>
              <Badge variant="destructive" className="text-[10px]">
                SUPER ADMIN
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Moderate tuition listings, govern user roles, and monitor Stripe subscription revenue.
            </p>
          </div>

          <Link href="/dashboard/admin/tuitions">
            <Button className="font-bold gap-2 shrink-0">
              <CheckSquare className="h-4 w-4" />
              Review Pending Tuitions
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
          {/* Total Users */}
          <Card className="p-6 border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold">Total Registered Users</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-foreground">{stats?.totalUsers || 0}</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {stats?.totalStudents || 0} Students • {stats?.totalTutors || 0} Tutors
              </p>
            </div>
          </Card>

          {/* Pending Tuitions */}
          <Card className="p-6 border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold">Pending Approvals</span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-amber-600">{stats?.pendingTuitions || 0}</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {stats?.approvedTuitions || 0} batches currently live
              </p>
            </div>
          </Card>

          {/* Active Tutors */}
          <Card className="p-6 border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold">Total Tutors</span>
              <div className="h-8 w-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-secondary">{stats?.totalTutors || 0}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Teachers offering mentorship</p>
            </div>
          </Card>

          {/* Stripe Revenue */}
          <Card className="p-6 border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold">Total Stripe Revenue</span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-emerald-600">
                ${stats?.totalRevenue || 0} <span className="text-xs font-bold text-muted-foreground">USD</span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">From Pro subscriptions</p>
            </div>
          </Card>
        </div>
      )}

      {/* Admin Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          href="/dashboard/admin/users"
          className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 shadow-sm transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">User Management</p>
              <p className="text-[11px] text-muted-foreground">Promote or change user roles</p>
            </div>
          </div>
          <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Manage Users <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/admin/tuitions"
          className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 shadow-sm transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Tuition Moderation</p>
              <p className="text-[11px] text-muted-foreground">Approve or reject tutor posts</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Review Posts <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/admin/transactions"
          className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 shadow-sm transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Stripe Transactions</p>
              <p className="text-[11px] text-muted-foreground">View all customer payments</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Ledger <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
