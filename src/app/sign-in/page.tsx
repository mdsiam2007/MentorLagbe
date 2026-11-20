'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Logo from '@/components/common/Logo';
import { toast } from 'sonner';
import { LogIn, Key, Mail, Sparkles, ArrowRight } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        email: email.trim(),
        password,
      });

      if (res.data.success && res.data.data) {
        const { user, token } = res.data.data;
        login(token, user);
        toast.success(`Welcome back, ${user.name}!`);

        if (user.role === 'admin') router.push('/dashboard/admin');
        else if (user.role === 'tutor') router.push('/dashboard/tutor');
        else router.push('/dashboard/student');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Demo account quick filler for easy assessment
  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    toast.info(`Filled credentials for ${demoEmail}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream/40 dark:bg-[#081612] px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight pt-2">
            Welcome back to MentorLagbe
          </h1>
          <p className="text-xs sm:text-sm text-forest-800/70 dark:text-white/70">
            Sign in to access your tuition dashboard, applications and batches.
          </p>
        </div>

        <Card className="p-8 border border-forest-900/10 dark:border-white/10 shadow-card bg-white dark:bg-[#0F241E] rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-forest-800/40 dark:text-white/40" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-2xl bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-terracotta-500/40 text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                Password
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-forest-800/40 dark:text-white/40" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 rounded-2xl bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-terracotta-500/40 text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="terracotta"
              className="w-full font-bold h-12 rounded-full gap-2 shadow-glow text-sm cursor-pointer mt-2"
            >
              <LogIn className="h-4 w-4" />
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="mt-6 pt-5 border-t border-forest-900/10 dark:border-white/10 space-y-2.5">
            <span className="text-[11px] font-bold text-forest-800/60 dark:text-white/60 uppercase tracking-wider block text-center">
              Quick Test Credentials
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('admin@mentorlagbe.com', 'Admin@12345')}
                className="rounded-full border border-forest-900/15 dark:border-white/15 bg-cream/50 dark:bg-[#153028] p-2 text-center hover:border-terracotta-500 text-[11px] font-bold text-forest-900 dark:text-white transition-all cursor-pointer"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemo('tutor.rahim@mentorlagbe.com', 'Tutor@12345')}
                className="rounded-full border border-forest-900/15 dark:border-white/15 bg-cream/50 dark:bg-[#153028] p-2 text-center hover:border-terracotta-500 text-[11px] font-bold text-forest-900 dark:text-white transition-all cursor-pointer"
              >
                Tutor
              </button>
              <button
                type="button"
                onClick={() => fillDemo('student.siam@mentorlagbe.com', 'Student@12345')}
                className="rounded-full border border-forest-900/15 dark:border-white/15 bg-cream/50 dark:bg-[#153028] p-2 text-center hover:border-terracotta-500 text-[11px] font-bold text-forest-900 dark:text-white transition-all cursor-pointer"
              >
                Student
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-forest-800/70 dark:text-white/70">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-terracotta-500 font-bold hover:underline">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}