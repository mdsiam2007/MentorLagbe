'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  X,
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Tuitions', href: '/tuitions' },
    { name: 'Find Tutors', href: '/tutors' },
    { name: 'Become a Tutor', href: '/become-a-tutor' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const getDashboardLink = () => {
    if (!user) return '/sign-in';
    if (user.role === 'admin') return '/dashboard/admin';
    if (user.role === 'tutor') return '/dashboard/tutor';
    return '/dashboard/student';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Auth Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark / Light Theme Switcher */}
          <ThemeToggle />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 rounded-full border-2 border-border bg-card p-1 pr-3 text-sm font-medium hover:border-primary transition-all focus:outline-none"
              >
                <img
                  src={user.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-border"
                />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-foreground text-xs leading-none">
                      {user.name.split(' ')[0]}
                    </span>
                    {user.plan === 'pro' && (
                      <Badge variant="pro" className="px-1.5 py-0 h-4 text-[9px] font-black uppercase">
                        PRO
                      </Badge>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground capitalize font-semibold leading-tight">
                    {user.role}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-1" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl border-2 border-border bg-card p-2 shadow-[0_4px_0_0_hsl(var(--border))] animate-in fade-in zoom-in-95 duration-150 z-50"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b-2 border-border/60">
                    <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Badge variant="secondary" className="capitalize text-[10px] h-5">
                        {user.role}
                      </Badge>
                      {user.plan === 'pro' && (
                        <Badge variant="pro" className="text-[10px] h-5">
                          Pro Member
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href={getDashboardLink()}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-primary" />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <UserIcon className="h-4 w-4 text-secondary" />
                      Update Profile
                    </Link>

                    {user.plan !== 'pro' && (
                      <Link
                        href="/pricing"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
                      >
                        <Sparkles className="h-4 w-4" />
                        Upgrade to Pro
                      </Link>
                    )}
                  </div>

                  <div className="pt-1 border-t border-border/60">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle & Theme */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-foreground focus:outline-none rounded-xl border border-border/80 bg-card hover:bg-muted transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Enhanced Animated Slide-in Sheet Drawer (Mobile) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Sheet Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-card border-l-2 border-border shadow-2xl flex flex-col justify-between z-50 overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <Logo size="sm" />
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 text-foreground rounded-xl border border-border hover:bg-muted transition-colors"
                      aria-label="Close Navigation Menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Nav Links */}
                <nav className="p-4 space-y-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <ArrowRight className="h-4 w-4" />}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer User Actions / Footer */}
              <div className="p-4 border-t border-border bg-muted/20">
                {user ? (
                  <div className="space-y-4">
                    {/* User Profile Card */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border-2 border-border">
                      <img
                        src={user.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover border border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                          {user.plan === 'pro' && (
                            <Badge variant="pro" className="px-1.5 py-0 h-4 text-[9px] font-black uppercase">
                              PRO
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        <Badge variant="secondary" className="capitalize text-[10px] h-4 mt-1">
                          {user.role}
                        </Badge>
                      </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="space-y-1.5">
                      <Link
                        href={getDashboardLink()}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-foreground bg-card border border-border hover:border-primary transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-primary" />
                        Go to Dashboard
                      </Link>

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-foreground bg-card border border-border hover:border-secondary transition-colors"
                      >
                        <UserIcon className="h-4 w-4 text-secondary" />
                        Profile Settings
                      </Link>

                      {user.plan !== 'pro' && (
                        <Link
                          href="/pricing"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                        >
                          <Sparkles className="h-4 w-4" />
                          Upgrade to Pro
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-destructive bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button variant="default" size="sm" className="w-full justify-center">
                        Sign Up Free
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
