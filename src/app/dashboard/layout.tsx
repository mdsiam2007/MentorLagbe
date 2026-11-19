'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/common/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  CheckSquare,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
  FileText,
  Sparkles,
  ChevronRight,
  Bookmark,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Role-based navigation items
  const studentNav = [
    { name: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
    { name: 'My Applications', href: '/dashboard/student/my-applications', icon: FileText },
    { name: 'Saved Tuitions', href: '/dashboard/student/saved-tuitions', icon: Bookmark },
  ];

  const tutorNav = [
    { name: 'Overview', href: '/dashboard/tutor', icon: LayoutDashboard },
    { name: 'Post a Tuition', href: '/dashboard/tutor/post-tuition', icon: PlusCircle },
    { name: 'My Created Tuitions', href: '/dashboard/tutor/my-tuitions', icon: BookOpen },
    { name: 'Manage Applicants', href: '/dashboard/tutor/applicants', icon: Users },
  ];

  const adminNav = [
    { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'User Management', href: '/dashboard/admin/users', icon: Users },
    { name: 'Tuition Moderation', href: '/dashboard/admin/tuitions', icon: CheckSquare },
    { name: 'Stripe Transactions', href: '/dashboard/admin/transactions', icon: CreditCard },
  ];

  const currentNav =
    user.role === 'admin' ? adminNav : user.role === 'tutor' ? tutorNav : studentNav;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card p-5 transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div>
          {/* Header & User Badge */}
          <div className="flex items-center justify-between pb-6 border-b border-border/70">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                Dashboard
              </span>
              <h2 className="text-lg font-black text-foreground capitalize">{user.role} Portal</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Preview */}
          <div className="mt-5 p-3 rounded-2xl bg-muted/50 border border-border/60 flex items-center gap-3">
            <img
              src={user.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={user.name}
              className="h-10 w-10 rounded-xl object-cover border border-border"
            />
            <div className="truncate flex-1">
              <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge
                  variant={user.role === 'admin' ? 'destructive' : user.role === 'tutor' ? 'secondary' : 'outline'}
                  className="text-[9px] px-1.5 py-0 capitalize"
                >
                  {user.role}
                </Badge>
                {user.plan === 'pro' && (
                  <Badge variant="pro" className="text-[9px] px-1.5 py-0">
                    PRO
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 space-y-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3">
              Main Menu
            </span>
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-border/60">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                Account
              </span>
              <Link
                href="/dashboard/profile"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold mt-1 transition-all ${
                  pathname === '/dashboard/profile'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <User className="h-4 w-4 shrink-0" />
                <span>My Profile</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Upgrade or Sign Out */}
        <div className="space-y-3 pt-4 border-t border-border/70">
          {user.plan !== 'pro' && user.role !== 'admin' && (
            <Link href="/pricing" className="block">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 to-primary/15 border border-amber-500/30 text-left hover:border-amber-500/60 transition-all">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Upgrade to Pro
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Unlock unlimited posts and priority matching.
                </p>
              </div>
            </Link>
          )}

          <button
            onClick={logout}
            className="flex w-full items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Topbar */}
        <div className="h-16 border-b border-border bg-card/60 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-foreground rounded-lg border border-border"
              aria-label="Open Sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs text-muted-foreground">Portal Navigation / </span>
              <span className="text-xs font-bold text-foreground capitalize">
                {pathname.split('/').pop()?.replace(/-/g, ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/tuitions" className="text-xs font-semibold text-primary hover:underline hidden sm:block">
              Browse Tuitions
            </Link>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <Link href="/dashboard/profile" className="flex items-center gap-2">
              <img
                src={user.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover border border-border"
              />
              <span className="text-xs font-bold text-foreground hidden sm:block">
                {user.name.split(' ')[0]}
              </span>
            </Link>
          </div>
        </div>

        {/* Sub-page Render */}
        <div className="p-4 sm:p-8 flex-1">{children}</div>
      </div>
    </div>
  );
}
