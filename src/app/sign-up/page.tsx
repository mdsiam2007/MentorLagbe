'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Logo from '@/components/common/Logo';
import { toast } from 'sonner';
import { User, Mail, Key, UserCheck, GraduationCap, BookOpen } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });

      if (res.data.success && res.data.data) {
        const { user, token } = res.data.data;
        login(token, user);
        toast.success(`Welcome to MentorLagbe, ${user.name}!`);

        if (user.role === 'tutor') router.push('/dashboard/tutor');
        else router.push('/dashboard/student');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream/40 dark:bg-[#081612] px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight pt-2">
            Join MentorLagbe
          </h1>
          <p className="text-xs sm:text-sm text-forest-800/70 dark:text-white/70">
            Sign up as a student or tutor to start booking and mentoring.
          </p>
        </div>

        <Card className="p-8 border border-forest-900/10 dark:border-white/10 shadow-card bg-white dark:bg-[#0F241E] rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-full bg-cream/70 dark:bg-[#153028] border border-forest-900/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    role === 'student'
                      ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-soft'
                      : 'text-forest-800/70 dark:text-white/70 hover:text-forest-900'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  Student
                </button>

                <button
                  type="button"
                  onClick={() => setRole('tutor')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    role === 'tutor'
                      ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-soft'
                      : 'text-forest-800/70 dark:text-white/70 hover:text-forest-900'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  Tutor / Mentor
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-forest-800/40 dark:text-white/40" />
                <Input
                  type="text"
                  placeholder="e.g. Siam Ahmed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11 rounded-2xl bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-terracotta-500/40 text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                Email Address *
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
                Password *
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-forest-800/40 dark:text-white/40" />
                <Input
                  type="password"
                  placeholder="At least 6 characters"
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
              <UserCheck className="h-4 w-4" />
              {loading ? 'Creating Account...' : `Register as ${role === 'student' ? 'Student' : 'Tutor'}`}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-forest-800/70 dark:text-white/70">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-terracotta-500 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}