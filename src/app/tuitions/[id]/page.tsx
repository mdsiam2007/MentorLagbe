'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Send,
  X,
  ArrowLeft,
  DollarSign,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export default function TuitionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tuitionId = resolvedParams.id;
  const router = useRouter();
  const { user } = useAuth();

  const [tuition, setTuition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Application form fields
  const [studentPhone, setStudentPhone] = useState('');
  const [preferredSchedule, setPreferredSchedule] = useState('');
  const [studentNote, setStudentNote] = useState('');

  useEffect(() => {
    if (user?.phone) {
      setStudentPhone(user.phone);
    }

    api.get(`/tuitions/${tuitionId}`)
      .then((res) => {
        if (res.data.success) {
          setTuition(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch tuition details:', err);
        toast.error('Failed to load tuition details.');
      })
      .finally(() => setLoading(false));
  }, [tuitionId, user]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in as a student to apply.');
      router.push('/sign-in');
      return;
    }

    if (user.role !== 'student') {
      toast.error('Only registered students can apply for tuitions.');
      return;
    }

    if (!studentPhone.trim() || !preferredSchedule.trim()) {
      toast.error('Please provide your contact phone and preferred schedule.');
      return;
    }

    setApplying(true);
    try {
      const res = await api.post('/applications/apply', {
        tuitionId,
        studentPhone: studentPhone.trim(),
        preferredSchedule: preferredSchedule.trim(),
        studentNote: studentNote.trim(),
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Application submitted successfully!');
        setModalOpen(false);
        router.push('/dashboard/student/my-applications');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to submit application.';
      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-6">
        <Skeleton className="h-96 w-full rounded-3xl" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center space-y-4">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold text-foreground">Tuition Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The tuition posting you are looking for may have been removed or closed.
        </p>
        <Link href="/tuitions">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Browse Tuitions
          </Button>
        </Link>
      </div>
    );
  }

  const isStudent = user?.role === 'student';
  const isTutorOrAdmin = user && (user.role === 'tutor' || user.role === 'admin');

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/tuitions" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to all listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Tuition Details (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Banner Image */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-3xl border border-border shadow-md bg-muted">
              <img
                src={tuition.bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'}
                alt={tuition.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant={tuition.mode === 'Online' ? 'default' : 'secondary'} className="shadow-lg backdrop-blur-md px-3 py-1 font-bold">
                  {tuition.mode} Mode
                </Badge>
                <Badge variant="outline" className="bg-background/90 text-foreground shadow-sm">
                  {tuition.subject}
                </Badge>
              </div>
            </div>

            {/* Title & Core Meta */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {tuition.classLevel}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                {tuition.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {tuition.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {tuition.daysPerWeek} Days / Week
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  {formatCurrency(tuition.monthlyFee)} / Month
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-foreground">Tuition Overview & Syllabus</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {tuition.description}
              </p>
            </div>

            {/* Tutor Information Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-foreground">About the Tutor</h3>
              <div className="flex items-start gap-4">
                <img
                  src={tuition.tutor?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                  alt={tuition.tutorName}
                  className="h-14 w-14 rounded-2xl object-cover border border-border shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-foreground">{tuition.tutorName}</h4>
                    {tuition.tutor?.plan === 'pro' && (
                      <Badge variant="pro" className="text-[10px]">
                        Verified Mentor
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{tuition.tutorEmail}</p>
                  <p className="text-xs text-muted-foreground pt-1">
                    {tuition.tutor?.bio || 'Experienced educator committed to student conceptual excellence.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking & Application Action Card (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border-2 border-primary/30 shadow-xl bg-card space-y-5 sticky top-24">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Monthly Tuition Fee
                </span>
                <p className="text-3xl font-black text-foreground">
                  {formatCurrency(tuition.monthlyFee)}
                </p>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground border-y border-border/60 py-3">
                <div className="flex justify-between">
                  <span>Class Mode:</span>
                  <strong className="text-foreground">{tuition.mode}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <strong className="text-foreground">{tuition.daysPerWeek} Days / Week</strong>
                </div>
                <div className="flex justify-between">
                  <span>Target Class:</span>
                  <strong className="text-foreground">{tuition.classLevel}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <strong className="text-foreground truncate max-w-[150px]">{tuition.location}</strong>
                </div>
              </div>

              {/* Role Restricted Actions */}
              {!user ? (
                <div className="space-y-2">
                  <Link href="/sign-in" className="w-full block">
                    <Button className="w-full font-bold">Sign In to Apply</Button>
                  </Link>
                  <p className="text-[11px] text-center text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/sign-up" className="text-primary font-semibold hover:underline">
                      Sign Up as Student
                    </Link>
                  </p>
                </div>
              ) : isStudent ? (
                <div>
                  <Button
                    onClick={() => setModalOpen(true)}
                    className="w-full font-bold shadow-lg shadow-primary/25 gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Apply for this Tuition
                  </Button>
                  <p className="text-[11px] text-center text-muted-foreground mt-2">
                    Free booking application. The tutor will contact you once accepted.
                  </p>
                </div>
              ) : isTutorOrAdmin ? (
                <div className="rounded-xl bg-muted/60 p-3.5 text-center border border-border/60 space-y-1">
                  <p className="text-xs font-semibold text-foreground">
                    Role Restriction Notice
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    You are logged in as a <strong>{user.role}</strong>. Applications are reserved
                    exclusively for student accounts.
                  </p>
                  <Button disabled className="w-full mt-2 opacity-50 cursor-not-allowed text-xs">
                    Apply Now (Disabled for {user.role})
                  </Button>
                </div>
              ) : null}
            </Card>
          </div>
        </div>
      </div>

      {/* Student Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <Badge variant="secondary" className="mb-1">
                Student Application
              </Badge>
              <h3 className="text-xl font-bold text-foreground">
                Apply for {tuition.subject} Batch
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Mentor: <strong className="text-foreground">{tuition.tutorName}</strong> •{' '}
                {formatCurrency(tuition.monthlyFee)}/month
              </p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Your Contact Phone Number *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. +880 1700 000000"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Preferred Class Schedule / Timings *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Mon, Wed, Fri (6:00 PM - 7:30 PM)"
                  value={preferredSchedule}
                  onChange={(e) => setPreferredSchedule(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Learning Goals or Special Notes (Optional)
                </label>
                <Textarea
                  placeholder="Tell the mentor about your current grade, specific weak chapters, or goals..."
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  disabled={applying}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={applying} className="font-bold gap-2">
                  {applying ? 'Submitting...' : 'Confirm Application'}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
