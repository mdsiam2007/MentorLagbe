'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
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
  ShieldCheck,
  Star,
  Clock,
  BookOpen,
  Award,
  ExternalLink,
  ChevronRight,
  Flame,
  Bookmark,
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
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

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

    // Check bookmark status for student
    if (user && user.role === 'student') {
      api.get('/users/bookmarks')
        .then((res) => {
          const bookmarks = res.data?.data || (Array.isArray(res.data) ? res.data : []);
          const isSaved = bookmarks.some((b: any) =>
            typeof b === 'string' ? b === tuitionId : b._id === tuitionId
          );
          setBookmarked(isSaved);
        })
        .catch(() => {});
    }
  }, [tuitionId, user]);

  const handleToggleBookmark = async () => {
    if (!user || user.role !== 'student') {
      toast.info('Sign in as a student to bookmark tuitions.');
      return;
    }

    setBookmarkLoading(true);
    try {
      const res = await api.post(`/users/bookmarks/${tuitionId}`);
      const nextState = !bookmarked;
      setBookmarked(nextState);
      toast.success(res.data?.message || (nextState ? 'Tuition saved to bookmarks!' : 'Bookmark removed!'));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update bookmark.');
    } finally {
      setBookmarkLoading(false);
    }
  };

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
      <div className="container mx-auto max-w-6xl px-4 py-12 space-y-8">
        <Skeleton className="h-80 sm:h-96 w-full rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <Skeleton className="h-10 w-3/4 rounded-xl" />
            <Skeleton className="h-6 w-1/2 rounded-lg" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-24 text-center space-y-5">
        <AlertCircle className="mx-auto h-16 w-16 text-destructive animate-bounce" />
        <h2 className="text-3xl font-black text-foreground">Tuition Not Found</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          The tuition posting you are looking for may have been removed, filled, or is temporarily private.
        </p>
        <div className="pt-2">
          <Link href="/tuitions">
            <Button variant="default" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Browse Tuitions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isStudent = user?.role === 'student';
  const isTutorOrAdmin = user && (user.role === 'tutor' || user.role === 'admin');

  // Resolved Tutor Profile Link
  const tutorId = tuition.tutor?._id || tuition.tutorId;
  const tutorProfileHref = tutorId
    ? `/tutors/${tutorId}`
    : `/tutors?search=${encodeURIComponent(tuition.tutorName || '')}`;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* BREADCRUMB & TOP CONTROLS */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Link
              href="/tuitions"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>All Tuitions</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className="text-foreground">{tuition.subject}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            {/* Tutor Name in Breadcrumb */}
            <Link
              href={tutorProfileHref}
              className="text-primary hover:underline flex items-center gap-1"
              title={`View ${tuition.tutorName}'s Profile`}
            >
              {tuition.tutorName}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-card text-[11px] font-bold">
              ID: {tuitionId.slice(-6).toUpperCase()}
            </Badge>
            <Badge variant="success" className="text-[11px]">
              <CheckCircle2 className="h-3 w-3" />
              Verified Listing
            </Badge>
          </div>
        </motion.div>

        {/* 3D HERO BANNER */}
        <Tilt3DCard
          tiltMaxAngle={6}
          scaleOnHover={1.01}
          glareOpacity={0.15}
          className="rounded-3xl"
        >
          <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-3xl border-2 border-border/80 bg-muted shadow-lg">
            <img
              src={
                tuition.bannerImage ||
                'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80'
              }
              alt={tuition.title}
              className="h-full w-full object-cover object-center"
            />
            {/* Ambient Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-2.5 [transform:translateZ(30px)]">
              <Badge
                variant={tuition.mode === 'Online' ? 'default' : 'secondary'}
                className="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 shadow-xl backdrop-blur-md"
              >
                {tuition.mode} Mode
              </Badge>
              <Badge
                variant="outline"
                className="bg-black/60 text-white border-white/20 text-xs font-bold backdrop-blur-md px-3 py-1 shadow-md"
              >
                {tuition.subject}
              </Badge>
              <Badge
                variant="pro"
                className="text-xs font-bold shadow-lg backdrop-blur-md"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Featured Batch
              </Badge>
            </div>

            {/* Top Right Floating Bookmark Button */}
            <button
              type="button"
              onClick={handleToggleBookmark}
              disabled={bookmarkLoading}
              className={`absolute top-5 right-5 z-20 flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-md transition-all duration-200 shadow-xl border [transform:translateZ(30px)] ${
                bookmarked
                  ? 'bg-primary text-primary-foreground border-primary scale-105'
                  : 'bg-black/60 hover:bg-black/80 text-white border-white/20 hover:scale-105'
              }`}
              title={bookmarked ? 'Remove from Saved' : 'Save Tuition'}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
              <span className="text-xs font-bold">{bookmarked ? 'Saved' : 'Save Tuition'}</span>
            </button>

            {/* Bottom Floating Title Strip */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 [transform:translateZ(25px)]">
              <span className="text-xs font-black uppercase tracking-widest text-primary-foreground/90 bg-primary/80 px-2.5 py-1 rounded-md">
                {tuition.classLevel}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-md max-w-3xl leading-snug">
                {tuition.title}
              </h1>
            </div>
          </div>
        </Tilt3DCard>

        {/* MAIN TWO-COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: SYLLABUS, HIGHLIGHTS & TUTOR SPOTLIGHT (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3.5"
            >
              <div className="rounded-2xl border-2 border-border/80 bg-card p-4 text-center space-y-1 shadow-sm">
                <MapPin className="h-5 w-5 mx-auto text-primary" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  Location
                </span>
                <p className="text-xs sm:text-sm font-black text-foreground truncate">
                  {tuition.location}
                </p>
              </div>

              <div className="rounded-2xl border-2 border-border/80 bg-card p-4 text-center space-y-1 shadow-sm">
                <Calendar className="h-5 w-5 mx-auto text-secondary" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  Frequency
                </span>
                <p className="text-xs sm:text-sm font-black text-foreground">
                  {tuition.daysPerWeek} Days / Week
                </p>
              </div>

              <div className="rounded-2xl border-2 border-border/80 bg-card p-4 text-center space-y-1 shadow-sm">
                <DollarSign className="h-5 w-5 mx-auto text-emerald-500" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  Tuition Fee
                </span>
                <p className="text-xs sm:text-sm font-black text-foreground">
                  {formatCurrency(tuition.monthlyFee)}
                </p>
              </div>

              <div className="rounded-2xl border-2 border-border/80 bg-card p-4 text-center space-y-1 shadow-sm">
                <GraduationCap className="h-5 w-5 mx-auto text-indigo-500" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  Grade / Target
                </span>
                <p className="text-xs sm:text-sm font-black text-foreground truncate">
                  {tuition.classLevel}
                </p>
              </div>
            </motion.div>

            {/* Course Overview & Syllabus */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl border-2 border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-2.5 border-b-2 border-border/60 pb-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-black text-foreground">
                  Tuition Overview & Curriculum
                </h2>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {tuition.description}
              </p>

              {/* What You'll Learn Highlights */}
              <div className="mt-6 pt-6 border-t-2 border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-start gap-3 rounded-2xl bg-muted/40 p-3.5 border border-border/60">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Deep Concept Clarification</h4>
                    <p className="text-[11px] text-muted-foreground">
                      Structured step-by-step lectures designed for board exams & admission tests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-muted/40 p-3.5 border border-border/60">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Weekly Practice & Mock Tests</h4>
                    <p className="text-[11px] text-muted-foreground">
                      Regular assessments with individual feedback and progress tracking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-muted/40 p-3.5 border border-border/60">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Doubt-Clearing Support</h4>
                    <p className="text-[11px] text-muted-foreground">
                      Dedicated Q&A support after classes to address student problem sets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-muted/40 p-3.5 border border-border/60">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Curated Lecture Notes</h4>
                    <p className="text-[11px] text-muted-foreground">
                      Comprehensive chapter summaries and problem-solving formula sheets.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3D TUTOR SPOTLIGHT CARD (HIGHLIGHTED WITH DIRECT PROFILE LINK) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tilt3DCard
                tiltMaxAngle={6}
                scaleOnHover={1.015}
                glareOpacity={0.12}
                className="rounded-3xl"
              >
                <div className="rounded-3xl border-2 border-primary/40 bg-card p-6 sm:p-8 shadow-md relative overflow-hidden group">
                  {/* Subtle Accent Glow */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between border-b-2 border-border/60 pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-black text-foreground">About the Lead Mentor</h3>
                    </div>

                    <Link
                      href={tutorProfileHref}
                      className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 group/btn"
                    >
                      <span>View Full Profile</span>
                      <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    {/* Avatar with Verified Ring */}
                    <Link
                      href={tutorProfileHref}
                      className="relative block shrink-0 group/avatar [transform:translateZ(20px)]"
                    >
                      <img
                        src={
                          tuition.tutor?.image ||
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
                        }
                        alt={tuition.tutorName}
                        className="h-20 w-20 rounded-2xl object-cover border-2 border-primary/40 group-hover/avatar:border-primary group-hover/avatar:scale-105 transition-all shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                    </Link>

                    {/* Tutor Details */}
                    <div className="space-y-2 flex-1 [transform:translateZ(15px)]">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Clickable Tutor Name Linking to Profile */}
                        <Link
                          href={tutorProfileHref}
                          className="text-lg sm:text-xl font-black text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                        >
                          {tuition.tutorName}
                        </Link>
                        {tuition.tutor?.plan === 'pro' && (
                          <Badge variant="pro" className="text-[10px]">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Verified Pro Mentor
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{tuition.tutorEmail}</span>
                        <span>•</span>
                        <span className="flex items-center text-amber-500 font-bold">
                          <Star className="h-3.5 w-3.5 fill-amber-500 mr-0.5" />
                          4.9 / 5.0 Rating
                        </span>
                      </p>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                        {tuition.tutor?.bio ||
                          'Passionate educator committed to simplifying complex concepts, building intuition, and mentoring students to achieve top academic results.'}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        <Link href={tutorProfileHref}>
                          <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 h-8">
                            <UserCheck className="h-3.5 w-3.5 text-primary" />
                            Explore Tutor&apos;s Batches & Credentials
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            </motion.div>

            {/* STUDENT REVIEWS & ACADEMIC FEEDBACK */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-3xl border-2 border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border/60 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border-2 border-amber-500/20 flex items-center justify-center text-amber-500 shadow-sm">
                    <Star className="h-5 w-5 fill-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-foreground">
                      Student Reviews & Academic Feedback
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Verified feedback and ratings from enrolled students.
                    </p>
                  </div>
                </div>

                {tuition.averageRating || (tuition.reviews && tuition.reviews.length > 0) ? (
                  <div className="flex items-center gap-2.5 bg-muted/60 border border-border/80 px-4 py-2 rounded-2xl">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-amber-500 mr-1" />
                      <span className="text-lg font-black text-foreground">
                        {tuition.averageRating
                          ? Number(tuition.averageRating).toFixed(1)
                          : (
                              tuition.reviews.reduce(
                                (acc: number, r: any) => acc + (r.rating || 5),
                                0
                              ) / tuition.reviews.length
                            ).toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold ml-0.5">/ 5.0</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs font-bold text-muted-foreground">
                      {tuition.totalReviews || tuition.reviews?.length || 0}{' '}
                      {(tuition.totalReviews || tuition.reviews?.length) === 1 ? 'Review' : 'Reviews'}
                    </span>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-xs text-muted-foreground font-bold">
                    No Ratings Yet
                  </Badge>
                )}
              </div>

              {/* Reviews List or Empty State */}
              {tuition.reviews && tuition.reviews.length > 0 ? (
                <div className="space-y-4">
                  {tuition.reviews.map((rev: any, idx: number) => {
                    const reviewerName =
                      rev.studentName || rev.studentEmail?.split('@')[0] || 'Enrolled Student';
                    const initials =
                      reviewerName
                        .split(' ')
                        .map((n: string) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase() || 'S';
                    const reviewDate = rev.createdAt
                      ? new Date(rev.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Recently';

                    return (
                      <div
                        key={rev._id || idx}
                        className="rounded-2xl border border-border/80 bg-muted/20 p-5 space-y-3 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {rev.studentImage ? (
                              <img
                                src={rev.studentImage}
                                alt={reviewerName}
                                className="h-10 w-10 rounded-full object-cover border border-border"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary border-2 border-primary/20 flex items-center justify-center font-bold text-xs shrink-0">
                                {initials}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-foreground">
                                  {reviewerName}
                                </span>
                                <Badge variant="success" className="text-[10px] px-1.5 py-0">
                                  <ShieldCheck className="h-3 w-3 mr-0.5" />
                                  Verified Student
                                </Badge>
                              </div>
                              <span className="text-[11px] text-muted-foreground">{reviewDate}</span>
                            </div>
                          </div>

                          {/* Stars */}
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`h-3.5 w-3.5 ${
                                  (rev.rating || 5) >= s
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-muted-foreground/30'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pl-13">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-8 text-center space-y-2">
                  <Star className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                  <h4 className="text-sm font-bold text-foreground">No reviews yet</h4>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    No reviews yet. Be the first enrolled student to share feedback once your tuition begins!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Safety & Trust Assurance Card */}
            <div className="rounded-3xl border-2 border-border/80 bg-muted/30 p-6 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                MentorLagbe Student Protection Guarantee
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                MentorLagbe does not charge any upfront agency or broker fees to students. You apply directly to your chosen verified tutor, discuss course schedules freely, and settle payment upon mutual satisfaction.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D STICKY BOOKING / APPLICATION CARD (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="sticky top-24"
            >
              <Tilt3DCard
                tiltMaxAngle={6}
                scaleOnHover={1.02}
                glareOpacity={0.15}
                className="rounded-3xl"
              >
                <Card className="p-6 sm:p-7 border-2 border-primary/50 shadow-2xl bg-card space-y-6 rounded-3xl relative overflow-hidden">
                  {/* Popular Batch Tag */}
                  <div className="flex items-center justify-between [transform:translateZ(15px)]">
                    <span className="text-[11px] text-muted-foreground font-black uppercase tracking-wider">
                      Tuition Honorarium
                    </span>
                    <Badge variant="default" className="text-[10px] font-black uppercase tracking-wider">
                      <Flame className="h-3 w-3 mr-1" />
                      Open for Admission
                    </Badge>
                  </div>

                  {/* Price Block */}
                  <div className="space-y-1 [transform:translateZ(20px)]">
                    <div className="flex items-baseline gap-1">
                      <p className="text-4xl font-black text-foreground tracking-tight">
                        {formatCurrency(tuition.monthlyFee)}
                      </p>
                      <span className="text-xs font-semibold text-muted-foreground">/ month</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Calculates to approx.{' '}
                      <strong className="text-foreground">
                        {formatCurrency(Math.round(tuition.monthlyFee / ((tuition.daysPerWeek || 3) * 4)))}
                      </strong>{' '}
                      per class session.
                    </p>
                  </div>

                  {/* Specifications Summary */}
                  <div className="space-y-3 text-xs text-muted-foreground border-y-2 border-border/60 py-4 [transform:translateZ(12px)]">
                    <div className="flex justify-between items-center">
                      <span>Delivery Mode:</span>
                      <strong className="text-foreground bg-muted/80 px-2 py-0.5 rounded-lg border border-border">
                        {tuition.mode}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Class Schedule:</span>
                      <strong className="text-foreground">
                        {tuition.daysPerWeek} Days / Week
                      </strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Target Level:</span>
                      <strong className="text-foreground">{tuition.classLevel}</strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Subject:</span>
                      <strong className="text-foreground">{tuition.subject}</strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Location:</span>
                      <strong className="text-foreground truncate max-w-[150px]">
                        {tuition.location}
                      </strong>
                    </div>
                  </div>

                  {/* Application Actions with Role Guidance */}
                  <div className="space-y-3 [transform:translateZ(25px)]">
                    {!user ? (
                      <div className="space-y-2.5">
                        <Link href="/sign-in" className="w-full block">
                          <Button className="w-full font-bold h-12 shadow-lg shadow-primary/20">
                            Sign In to Apply
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleToggleBookmark}
                          disabled={bookmarkLoading}
                          className="w-full font-bold h-11 text-xs gap-2 border-2 hover:bg-muted"
                        >
                          <Bookmark className="h-4 w-4" />
                          Save Tuition to Bookmarks
                        </Button>
                        <p className="text-[11px] text-center text-muted-foreground">
                          Don&apos;t have an account?{' '}
                          <Link href="/sign-up" className="text-primary font-bold hover:underline">
                            Register as Student
                          </Link>
                        </p>
                      </div>
                    ) : isStudent ? (
                      <div className="space-y-2.5">
                        <Button
                          onClick={() => setModalOpen(true)}
                          className="w-full font-black h-12 shadow-xl shadow-primary/30 text-sm gap-2"
                        >
                          <Send className="h-4 w-4" />
                          Apply for this Batch
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleToggleBookmark}
                          disabled={bookmarkLoading}
                          className={`w-full font-bold h-11 text-xs gap-2 border-2 transition-all ${
                            bookmarked
                              ? 'border-primary text-primary bg-primary/10 hover:bg-primary/20'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                          {bookmarked ? 'Saved in Your Bookmarks' : 'Save Tuition to Bookmarks'}
                        </Button>
                        <p className="text-[11px] text-center text-muted-foreground mt-2.5 flex items-center justify-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          100% Free Application • No Middleman Cut
                        </p>
                      </div>
                    ) : isTutorOrAdmin ? (
                      <div className="rounded-2xl bg-muted/60 p-4 text-center border-2 border-border/80 space-y-2">
                        <p className="text-xs font-bold text-foreground">
                          Student Role Required
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          You are currently signed in as an{' '}
                          <span className="capitalize font-bold text-foreground">{user.role}</span>. Student applications are restricted to student accounts.
                        </p>
                        <Button
                          disabled
                          className="w-full opacity-60 cursor-not-allowed text-xs font-bold"
                        >
                          Application Restricted
                        </Button>
                      </div>
                    ) : null}
                  </div>

                  {/* Direct Tutor Profile Link at bottom of card */}
                  <div className="pt-2 text-center border-t-2 border-border/40 [transform:translateZ(10px)]">
                    <Link
                      href={tutorProfileHref}
                      className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      <span>Questions? Visit {tuition.tutorName}&apos;s Profile</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </Card>
              </Tilt3DCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* STUDENT APPLICATION MODAL WITH FRAMER-MOTION */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg rounded-3xl border-2 border-border bg-card p-6 sm:p-8 shadow-2xl space-y-5 z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-border/60 bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <Badge variant="secondary" className="mb-1.5 text-[11px] font-bold">
                  Direct Student Application
                </Badge>
                <h3 className="text-xl sm:text-2xl font-black text-foreground">
                  Apply for {tuition.subject} Batch
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Mentor:{' '}
                  <Link
                    href={tutorProfileHref}
                    className="text-primary font-bold hover:underline"
                    target="_blank"
                  >
                    {tuition.tutorName}
                  </Link>{' '}
                  • Fee: <strong className="text-foreground">{formatCurrency(tuition.monthlyFee)}/mo</strong>
                </p>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Your Contact Phone Number *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. +880 1700 000000"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    required
                    className="h-11 rounded-xl text-xs sm:text-sm"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    The mentor will contact you on this phone number after reviewing your request.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Preferred Class Schedule / Timing *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Mon, Wed, Fri (6:00 PM - 7:30 PM)"
                    value={preferredSchedule}
                    onChange={(e) => setPreferredSchedule(e.target.value)}
                    required
                    className="h-11 rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Learning Goals or Specific Chapters (Optional)
                  </label>
                  <Textarea
                    placeholder="Briefly state your current grade, syllabus focus, or specific topics you need help with..."
                    value={studentNote}
                    onChange={(e) => setStudentNote(e.target.value)}
                    rows={3}
                    className="rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setModalOpen(false)}
                    disabled={applying}
                    className="text-xs font-bold h-11"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={applying}
                    className="font-black gap-2 text-xs h-11 px-5 shadow-lg shadow-primary/25"
                  >
                    {applying ? 'Submitting...' : 'Confirm & Send Application'}
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
