'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import {
  Search,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Star,
  Award,
  Users,
  GraduationCap,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

const subjectOptions = [
  'All',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Programming',
  'English',
  'ICT',
  'Accounting',
  'General Science',
  'Bangla',
];

const classLevelOptions = [
  'All',
  'Class 9-10 (SSC)',
  'Class 11-12 (HSC)',
  'Admission & HSC',
  'O/A Level (Cambridge/Edexcel)',
  'All Levels',
  'Class 6-10',
  'Undergraduate / Adults',
];

const modeOptions = ['All', 'Online', 'Offline'];

export const HeroSection: React.FC = () => {
  const router = useRouter();

  // Search Widget State (Synchronized with /tuitions page parameters)
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [classLevel, setClassLevel] = useState('All');
  const [mode, setMode] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (search.trim()) queryParams.set('search', search.trim());
    if (subject && subject !== 'All') queryParams.set('subject', subject);
    if (classLevel && classLevel !== 'All') queryParams.set('classLevel', classLevel);
    if (mode && mode !== 'All') queryParams.set('mode', mode);
    router.push(`/tuitions?${queryParams.toString()}`);
  };

  const handleReset = () => {
    setSearch('');
    setSubject('All');
    setClassLevel('All');
    setMode('All');
  };

  return (
    <>
      {/* Primary Hero Section */}
      <section className="relative overflow-hidden bg-background py-16 sm:py-24 border-b-2 border-border/80">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Search Widget */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="default" className="text-xs font-black px-3.5 py-1.5 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Bangladesh&apos;s #1 Smart Tuition & Mentorship Platform
                </Badge>
              </motion.div>

              {/* Line-by-Line Reveal Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.12]">
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Find Your Ideal{' '}
                    <span className="text-primary underline decoration-primary/40 underline-offset-4">
                      Tutor
                    </span>
                  </motion.div>
                </div>
                <div className="overflow-hidden mt-1">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    or Mentorship Batch
                  </motion.div>
                </div>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
              >
                Connect with verified mentors from BUET, DMC, DU and top institutions for subject-wise
                tuition batches and 1-on-1 personalized guidance in both Online and Offline modes.
              </motion.p>

              {/* Multi-Criteria Search Widget */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="p-4 sm:p-5 rounded-3xl border-2 border-border bg-card shadow-[0_6px_0_0_hsl(var(--border))] space-y-3"
              >
                <form onSubmit={handleSearchSubmit} className="space-y-3">
                  {/* Top Row: Keyword Query Input + Search / Reset Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search by tuition title, subject or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 rounded-2xl border-2 border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="submit"
                        variant="default"
                        className="h-12 px-6 gap-2 shrink-0 font-bold"
                      >
                        <Search className="h-4 w-4" />
                        Search
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        className="h-12 w-12 p-0 shrink-0"
                        title="Reset Filters"
                      >
                        <RotateCcw className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>

                  {/* Bottom Row: 3 Dropdowns (Subject, Class Level, Mode) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t-2 border-border/40">
                    {/* Subject Filter */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-1">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border-2 border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                      >
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt === 'All' ? 'All Subjects' : opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Class Level Filter */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-1">
                        Class / Target Level
                      </label>
                      <select
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border-2 border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                      >
                        {classLevelOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt === 'All' ? 'All Class Levels' : opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Teaching Mode Filter */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-1">
                        Teaching Mode
                      </label>
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border-2 border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                      >
                        {modeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt === 'All' ? 'All Modes (Online & Offline)' : opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>

                {/* Quick Filter Shortcuts */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="font-bold text-foreground">Quick Find:</span>
                  <button
                    onClick={() => {
                      setSubject('Mathematics');
                      router.push('/tuitions?subject=Mathematics');
                    }}
                    className="hover:text-primary transition-colors underline decoration-dotted font-semibold"
                  >
                    Higher Math
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      setSubject('Physics');
                      router.push('/tuitions?subject=Physics');
                    }}
                    className="hover:text-primary transition-colors underline decoration-dotted font-semibold"
                  >
                    HSC Physics
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      setSubject('Programming');
                      router.push('/tuitions?subject=Programming');
                    }}
                    className="hover:text-primary transition-colors underline decoration-dotted font-semibold"
                  >
                    Web & Coding
                  </button>
                  <span>•</span>
                  <Link href="/tutors" className="text-primary font-black hover:underline ml-auto flex items-center gap-1">
                    Meet Mentors Directory
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>

              {/* Flat Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-2 flex flex-wrap items-center gap-3 text-xs"
              >
                <Badge variant="success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  100% Verified Tutors
                </Badge>
                <Badge variant="default">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Zero Initial Booking Fee
                </Badge>
                <Badge variant="secondary">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Online & Offline Batches
                </Badge>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual with 3D Tilt & Floating Micro-Cards */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-md relative"
              >
                <Tilt3DCard
                  tiltMaxAngle={12}
                  scaleOnHover={1.03}
                  glareOpacity={0.18}
                  className="w-full"
                >
                  <div className="relative w-full rounded-3xl border-4 border-foreground/15 bg-card overflow-hidden shadow-[0_12px_0_0_hsl(var(--border))]">
                    <img
                      src="/images/hero-illustration.jpg"
                      alt="MentorLagbe Online Tutor Marketplace"
                      className="h-[430px] w-full object-cover"
                    />
                  </div>

                  {/* Floating Badge 1: Top Rated with Sine Loop Floating Animation */}
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                    className="floating-badge absolute -top-4 -left-6 rounded-2xl border-2 border-border bg-card p-3.5 shadow-[0_6px_0_0_hsl(var(--border))] flex items-center gap-3 [transform:translateZ(45px)] backdrop-blur-sm z-10"
                  >
                    <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                      <Star className="h-5 w-5 fill-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-foreground">4.9 / 5 Rating</p>
                      <p className="text-[10px] text-muted-foreground font-semibold">From 1,200+ Students</p>
                    </div>
                  </motion.div>

                  {/* Floating Badge 2: Verified Mentors with Sine Loop Floating Animation */}
                  <motion.div
                    animate={{ y: [6, -6, 6] }}
                    transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
                    className="floating-badge absolute -bottom-5 -right-4 rounded-2xl border-2 border-border bg-card p-3.5 shadow-[0_6px_0_0_hsl(var(--border))] flex items-center gap-3 [transform:translateZ(50px)] backdrop-blur-sm z-10"
                  >
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-foreground">Verified Mentors</p>
                      <p className="text-[10px] text-muted-foreground font-semibold">BUET, DMC & DU Tutors</p>
                    </div>
                  </motion.div>
                </Tilt3DCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Trust Strip Directly Beneath Hero */}
      <section className="border-b-2 border-border bg-card/60 backdrop-blur-md py-6">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Metric 1 */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-background border border-border/70 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-black text-foreground leading-tight">1,500+</p>
                <p className="text-xs text-muted-foreground font-semibold truncate">Verified Students</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-background border border-border/70 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-secondary/15 border-2 border-secondary/30 flex items-center justify-center text-secondary shrink-0">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-black text-foreground leading-tight">350+</p>
                <p className="text-xs text-muted-foreground font-semibold truncate">Certified Tutors</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-background border border-border/70 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-black text-foreground leading-tight">100%</p>
                <p className="text-xs text-muted-foreground font-semibold truncate">Money-Back Guarantee</p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-background border border-border/70 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-blue-500/10 border-2 border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-black text-foreground leading-tight">Direct</p>
                <p className="text-xs text-muted-foreground font-semibold truncate">WhatsApp Coordination</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
