'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import api from '@/lib/api';
import TuitionCard from '@/components/tuition/TuitionCard';
import { TuitionCardSkeleton } from '@/components/ui/skeleton';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Tabs,
  Tab,
  Accordion,
  AccordionItem,
  Avatar,
  Divider,
} from '@heroui/react';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  GraduationCap,
  BookOpen,
  Star,
  Award,
  Zap,
  RotateCcw,
  Compass,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [featuredTuitions, setFeaturedTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hero Search Widget State (Exactly matches /tuitions page)
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [classLevel, setClassLevel] = useState('All');
  const [mode, setMode] = useState('All');

  // GSAP animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const searchWidgetRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // GSAP Entrance Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          searchWidgetRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3'
        )
        .from(
          heroImageRef.current,
          {
            scale: 0.94,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        );

      // Continuous gentle floating effect for hero badges
      gsap.to('.floating-badge', {
        y: -8,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, heroRef);

    // Fetch 6 featured tuitions from backend
    api.get('/tuitions/featured')
      .then((res) => {
        if (res.data.success) {
          setFeaturedTuitions(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load featured tuitions:', err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => ctx.revert();
  }, []);

  // Search handler matching /tuitions page parameters
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

  const subjects = [
    { name: 'Mathematics', count: '45+ Batches', icon: '📐', href: '/tuitions?subject=Mathematics' },
    { name: 'Physics', count: '38+ Batches', icon: '⚡', href: '/tuitions?subject=Physics' },
    { name: 'Chemistry', count: '30+ Batches', icon: '🧪', href: '/tuitions?subject=Chemistry' },
    { name: 'Biology', count: '25+ Batches', icon: '🧬', href: '/tuitions?subject=Biology' },
    { name: 'Programming', count: '50+ Batches', icon: '💻', href: '/tuitions?subject=Programming' },
    { name: 'English & IELTS', count: '40+ Batches', icon: '🌐', href: '/tuitions?subject=English' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Search & Match',
      desc: 'Filter verified batches by subject, class level, budget, and online or offline home mode.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Review Credentials',
      desc: 'Inspect tutor educational backgrounds from BUET, DU, DMC, reviews, and syllabus outlines.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Submit Application',
      desc: 'Apply in 1-click with preferred study schedule with zero upfront booking charge.',
      icon: Compass,
    },
    {
      step: '04',
      title: 'Accelerate Learning',
      desc: 'Get accepted by the tutor, finalize your schedule, and begin your academic journey.',
      icon: GraduationCap,
    },
  ];

  const studentBenefits = [
    {
      title: '100% Verified Tutors',
      desc: 'All instructor profiles are reviewed with university ID & academic credentials before approval.',
    },
    {
      title: 'Both Online & In-Person Batches',
      desc: 'Learn from anywhere in Bangladesh via Zoom or hire home tutors in your local Dhaka neighborhood.',
    },
    {
      title: 'Direct Application & Zero Middleman',
      desc: 'No middleman agency fees or extra commissions. Apply directly to your preferred mentor.',
    },
    {
      title: 'Pro Priority Privileges',
      desc: 'Pro student members get top application queues and faster tutor responses.',
    },
  ];

  const tutorBenefits = [
    {
      title: 'Zero Commission Deduction',
      desc: 'Keep 100% of your earnings. We do not deduct 50-70% of your first month salary like agencies.',
    },
    {
      title: 'Unlimited Pro Listings',
      desc: 'Scale your tuition batches across multiple subjects and classes with our $15 Pro Upgrade.',
    },
    {
      title: 'Verified PRO Badge & Ranking',
      desc: 'Stand out at the top of search results and build credibility with verified academic badges.',
    },
    {
      title: 'Dedicated Applicant Dashboard',
      desc: 'Easily review applicant student profiles, track inquiries, and accept requests with one click.',
    },
  ];

  const testimonials = [
    {
      name: 'Tanvir Hasan',
      role: 'HSC Candidate (Notre Dame College)',
      comment:
        'MentorLagbe helped me find a BUET mentor for Higher Math in just 2 days. The concept clearing and weekly problem-solving batches are top-notch!',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
    {
      name: 'Dr. Nusrat Jahan',
      role: 'Medical Tutor & Mentor (DMC)',
      comment:
        'As a tutor, managing applications and communicating with sincere students has never been easier. Upgrading to Pro gave me unlimited post visibility!',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
    {
      name: 'Farzana Akter',
      role: 'Parent of Class 9 Student, Uttara',
      comment:
        'Finding a verified offline tutor in Uttara was always stressful. MentorLagbe gave us transparent options, direct fee details, and trusted teachers.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION WITH HEROUI SEARCH WIDGET MATCHING /TUITIONS PAGE */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 sm:py-24 border-b border-border/50"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex">
                <Chip
                  color="primary"
                  variant="flat"
                  size="md"
                  startContent={<Sparkles className="h-4 w-4 ml-1" />}
                  className="font-bold text-xs px-3 py-1"
                >
                  Bangladesh&apos;s #1 Smart Tuition & Mentorship Platform
                </Chip>
              </div>

              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.15]"
              >
                Find Your Ideal <span className="text-primary underline decoration-primary/30">Tutor</span> or Mentorship Batch
              </h1>

              <p
                ref={subtitleRef}
                className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
              >
                Connect with verified mentors from BUET, DMC, DU and top universities for subject-wise
                tuition batches and 1-on-1 personalized guidance in both Online and Offline modes.
              </p>

              {/* SEARCH BOX: FULLY MATCHED TO /TUITIONS PAGE FIELDS */}
              <Card
                ref={searchWidgetRef}
                shadow="lg"
                className="p-2 sm:p-3 rounded-3xl border border-border/80 bg-card/95 backdrop-blur-md shadow-2xl"
              >
                <CardBody className="p-3 sm:p-4 space-y-3">
                  <form onSubmit={handleSearchSubmit} className="space-y-3">
                    {/* Top Row: Free text query input + Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search by tuition title, subject or location..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-2xl border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          type="submit"
                          color="primary"
                          radius="full"
                          className="h-12 px-6 font-bold text-xs gap-1.5 shadow-md shadow-primary/25 shrink-0"
                          startContent={<Search className="h-4 w-4" />}
                        >
                          Search
                        </Button>

                        <Button
                          type="button"
                          variant="bordered"
                          radius="full"
                          isIconOnly
                          onClick={handleReset}
                          className="h-12 w-12 border-border shrink-0"
                          title="Reset Filters"
                        >
                          <RotateCcw className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>

                    {/* Bottom Row: 3 Dropdowns (Subject, Class Level, Mode) Exactly Matching /tuitions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 border-t border-border/50">
                      {/* Subject */}
                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                          Subject
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {subjectOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt === 'All' ? 'All Subjects' : opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Class Level */}
                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                          Class / Target Level
                        </label>
                        <select
                          value={classLevel}
                          onChange={(e) => setClassLevel(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {classLevelOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt === 'All' ? 'All Class Levels' : opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Mode */}
                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                          Teaching Mode
                        </label>
                        <select
                          value={mode}
                          onChange={(e) => setMode(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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

                  {/* Quick Pill Suggestions */}
                  <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">Quick Find:</span>
                    <button
                      onClick={() => {
                        setSubject('Mathematics');
                        router.push('/tuitions?subject=Mathematics');
                      }}
                      className="hover:text-primary transition-colors underline decoration-dotted"
                    >
                      Higher Math
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        setSubject('Physics');
                        router.push('/tuitions?subject=Physics');
                      }}
                      className="hover:text-primary transition-colors underline decoration-dotted"
                    >
                      HSC Physics
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        setSubject('Programming');
                        router.push('/tuitions?subject=Programming');
                      }}
                      className="hover:text-primary transition-colors underline decoration-dotted"
                    >
                      Web & Coding
                    </button>
                    <span>•</span>
                    <Link href="/tutors" className="text-primary font-bold hover:underline ml-auto">
                      Meet Mentors Directory →
                    </Link>
                  </div>
                </CardBody>
              </Card>

              {/* Trust Badges with HeroUI Chips */}
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <Chip size="sm" variant="flat" color="success" startContent={<CheckCircle2 className="h-3.5 w-3.5 ml-1" />}>
                  100% Verified Tutors
                </Chip>
                <Chip size="sm" variant="flat" color="primary" startContent={<CheckCircle2 className="h-3.5 w-3.5 ml-1" />}>
                  Zero Initial Booking Fee
                </Chip>
                <Chip size="sm" variant="flat" color="secondary" startContent={<CheckCircle2 className="h-3.5 w-3.5 ml-1" />}>
                  Online & Offline Batches
                </Chip>
              </div>
            </div>

            {/* Right Hero Visual with 3D Illustration & Floating Badges */}
            <div ref={heroImageRef} className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <Card shadow="lg" className="rounded-3xl border-4 border-card bg-card overflow-hidden">
                  <img
                    src="/images/hero-illustration.jpg"
                    alt="MentorLagbe Online Tutor Marketplace"
                    className="h-[430px] w-full object-cover"
                  />
                </Card>

                {/* Floating Badge 1: Top Rated */}
                <div className="floating-badge absolute -top-4 -left-6 rounded-2xl border border-border/80 bg-card p-3.5 shadow-xl flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Star className="h-5 w-5 fill-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">4.9 / 5 Rating</p>
                    <p className="text-[10px] text-muted-foreground">From 1,200+ Students</p>
                  </div>
                </div>

                {/* Floating Badge 2: Verified Mentors */}
                <div className="floating-badge absolute -bottom-5 -right-4 rounded-2xl border border-border/80 bg-card p-3.5 shadow-xl flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Verified Mentors</p>
                    <p className="text-[10px] text-muted-foreground">BUET, DMC & DU Tutors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC FEATURED TUITIONS SECTION */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Chip size="sm" color="secondary" variant="flat" className="mb-2 font-bold text-[11px]">
                Handpicked Listings
              </Chip>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Featured Tuition Batches
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Explore verified tuition batches approved by administrators across Dhaka & Online.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/tutors">
                <Button variant="bordered" radius="full" size="sm" className="font-semibold text-xs border-border">
                  Find Tutors Directory
                </Button>
              </Link>
              <Link href="/tuitions">
                <Button
                  color="primary"
                  radius="full"
                  size="sm"
                  className="gap-2 font-semibold text-xs shadow-md shadow-primary/20"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  View All Listings
                </Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <TuitionCardSkeleton key={i} />
              ))}
            </div>
          ) : featuredTuitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {featuredTuitions.map((tuition) => (
                <div key={tuition._id} className="h-full">
                  <TuitionCard {...tuition} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl border border-border bg-card p-12 text-center">
              <CardBody className="items-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
                <h3 className="text-lg font-bold text-foreground">No Featured Tuitions Available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Check back shortly or visit the Browse Tuitions page to explore more.
                </p>
              </CardBody>
            </Card>
          )}
        </div>
      </section>

      {/* 3. DUAL BENEFITS SECTION USING HEROUI TABS */}
      <section className="py-16 sm:py-24 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Chip size="sm" variant="bordered" className="mb-2 font-bold text-[11px]">
              Platform Value
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Why Choose MentorLagbe?
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Whether you are an aspiring student or a passionate educator, we provide a transparent, fee-free bridge.
            </p>

            {/* HeroUI Tabs */}
            <div className="mt-8 flex justify-center">
              <Tabs
                aria-label="Audience Benefits"
                color="primary"
                variant="solid"
                radius="full"
                className="font-bold text-xs"
              >
                <Tab key="students" title="For Students & Parents">
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {studentBenefits.map((b, idx) => (
                      <Card
                        key={idx}
                        shadow="sm"
                        className="p-6 rounded-3xl border border-border/80 bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                      >
                        <CardBody className="p-0">
                          <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm mb-4">
                            0{idx + 1}
                          </div>
                          <h3 className="text-base font-bold text-foreground mb-2">{b.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </Tab>

                <Tab key="tutors" title="For Tutors & Mentors">
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {tutorBenefits.map((b, idx) => (
                      <Card
                        key={idx}
                        shadow="sm"
                        className="p-6 rounded-3xl border border-border/80 bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                      >
                        <CardBody className="p-0">
                          <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm mb-4">
                            0{idx + 1}
                          </div>
                          <h3 className="text-base font-bold text-foreground mb-2">{b.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR SUBJECTS & PLATFORM STATS */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Chip size="sm" color="primary" variant="flat" className="mb-2 font-bold text-[11px]">
              Explore by Subject
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Top Academic Subjects
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Select your subject to discover specialized batches and verified subject-matter experts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((sub) => (
              <Link
                key={sub.name}
                href={sub.href}
                className="flex flex-col items-center text-center p-5 rounded-3xl border border-border/80 bg-card hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <span className="text-3xl mb-2 group-hover:scale-115 transition-transform">{sub.icon}</span>
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {sub.name}
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5">{sub.count}</span>
              </Link>
            ))}
          </div>

          {/* Platform Counters */}
          <Card shadow="sm" className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 via-indigo-500/10 to-secondary/10 border border-border p-6 sm:p-10">
            <CardBody className="p-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-foreground">1,500+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Active Students</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-primary">350+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Verified Mentors</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-foreground">98%</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Application Acceptance</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-secondary">64</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Districts Covered</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* 5. HOW IT WORKS 4-STEP ROAD */}
      <section className="py-16 sm:py-24 bg-muted/30 border-y border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Chip size="sm" variant="bordered" className="mb-2 font-bold text-[11px]">
            Simple 4-Step Process
          </Chip>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            How MentorLagbe Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mt-2">
            Connect, apply, and start learning with top university tutors in a few intuitive steps.
          </p>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <Card
                  key={s.step}
                  shadow="sm"
                  className="relative p-6 rounded-3xl border border-border/80 bg-card hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <CardBody className="p-0 flex flex-col items-center text-center">
                    <span className="absolute top-4 right-4 text-xs font-black text-muted-foreground/40 group-hover:text-primary transition-colors">
                      {s.step}
                    </span>
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>

          <div className="mt-12">
            <Link href="/how-it-works">
              <Button
                variant="bordered"
                radius="full"
                className="font-bold text-xs gap-2 border-border"
                endContent={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Read Full Safety & Workflow Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TRUST, SAFETY & VERIFICATION SECTION WITH AI SHIELD ASSET */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 3D Trust Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <Card shadow="lg" className="overflow-hidden rounded-3xl border-4 border-card bg-card">
                  <img
                    src="/images/trust-safety.jpg"
                    alt="MentorLagbe Trust and Safety Shield"
                    className="h-[360px] w-full object-cover"
                  />
                </Card>
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-7 space-y-6">
              <Chip
                color="success"
                variant="flat"
                size="sm"
                startContent={<ShieldCheck className="h-4 w-4 ml-1" />}
                className="font-bold text-xs"
              >
                Trust & Verification Guarantee
              </Chip>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Authentic Mentors You Can Truly Rely On
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe security and academic authenticity should never be compromised. Every tutor listing undergoes strict administrative verification.
              </p>

              <div className="space-y-3 pt-2 text-xs text-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Institutional Credential Verification:</span> We check student ID cards and university affiliations (BUET, DMC, DU, etc.) before issuing the verified badge.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Transparent Direct Pricing:</span> No hidden fee markups. You pay exactly the fee set in the listing.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">256-bit Encrypted Stripe Upgrades:</span> Secure, certified payments for Pro plan subscriptions.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/how-it-works">
                  <Button variant="bordered" radius="full" size="sm" className="font-bold text-xs border-border">
                    Learn More About Trust Guidelines →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING & SUBSCRIPTION SECTION */}
      <section className="py-16 sm:py-24 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Chip size="sm" color="primary" variant="solid" className="mb-2 font-bold text-[11px]">
              Transparent Pricing
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Free vs Pro Subscription
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mt-2">
              Start completely free, or unlock unlimited tuition postings and priority booking with our
              secure Stripe checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch">
            {/* Tutor Pro Tier */}
            <Card shadow="md" className="flex flex-col justify-between border-2 border-primary/40 rounded-3xl relative overflow-hidden bg-card">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                For Tutors
              </div>
              <CardBody className="p-8">
                <span className="text-xs font-bold uppercase text-primary tracking-wider">
                  Pro Tutor Plan
                </span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground">$15</span>
                  <span className="text-sm text-muted-foreground">/ one-time upgrade</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Best for university tutors and professional mentors looking to scale batches.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-foreground">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Unlimited tuition batch postings</span> (Free has max 2)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Verified Pro Tutor Profile Badge</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Priority top listing in search results</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Direct student contact notifications</span>
                  </li>
                </ul>

                <div className="pt-8">
                  <Link href="/pricing">
                    <Button color="primary" radius="full" className="w-full font-bold shadow-md shadow-primary/25">
                      Subscribe with Stripe ($15)
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>

            {/* Student Pro Tier */}
            <Card shadow="sm" className="flex flex-col justify-between border border-border rounded-3xl relative overflow-hidden bg-card">
              <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                For Students
              </div>
              <CardBody className="p-8">
                <span className="text-xs font-bold uppercase text-secondary tracking-wider">
                  Pro Student Plan
                </span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground">$10</span>
                  <span className="text-sm text-muted-foreground">/ one-time upgrade</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Designed for dedicated learners seeking top mentor acceptance.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-foreground">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Priority application status for batches</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Verified Pro Student Badge</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Faster application review from tutors</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Dedicated academic doubt support</span>
                  </li>
                </ul>

                <div className="pt-8">
                  <Link href="/pricing">
                    <Button variant="bordered" radius="full" className="w-full font-bold border-border">
                      Upgrade Student Account ($10)
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION WITH HEROUI AVATARS */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Chip size="sm" variant="bordered" className="mb-2 font-bold text-[11px]">
              Reviews & Stories
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Trusted by Students & Mentors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} shadow="sm" className="p-6 rounded-3xl border border-border/80 bg-card flex flex-col justify-between">
                <CardBody className="p-0">
                  <div>
                    <div className="flex items-center gap-1 mb-4 text-amber-500">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed italic">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border/50">
                    <Avatar src={t.avatar} name={t.name} size="md" className="border-2 border-border" />
                    <div>
                      <p className="text-xs font-bold text-foreground">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION USING HEROUI ACCORDION */}
      <section className="py-16 sm:py-24 bg-muted/30 border-t border-border/60">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Chip size="sm" variant="bordered" className="mb-2 font-bold text-[11px]">
              FAQ
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <Card shadow="sm" className="rounded-3xl border border-border/80 bg-card p-4 sm:p-6">
            <Accordion variant="splitted" className="px-0">
              <AccordionItem key="1" aria-label="How does MentorLagbe verify tutors?" title="How does MentorLagbe verify tutors?" className="text-sm font-bold">
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  Every tutor on MentorLagbe submits their educational institution background and contact information. Our admin team validates their credentials before approving any public tuition batch.
                </p>
              </AccordionItem>

              <AccordionItem key="2" aria-label="Is it completely free for students to apply?" title="Is it completely free for students to apply?" className="text-sm font-bold">
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  Yes! Students can register, browse, and apply to tuition listings for free with zero initial booking fee. An optional Pro Student upgrade ($10) is available for priority application status.
                </p>
              </AccordionItem>

              <AccordionItem key="3" aria-label="Can tutors post multiple tuition batches?" title="Can tutors post multiple tuition batches?" className="text-sm font-bold">
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  Free tutor accounts can post up to 2 active tuition batches. By upgrading to the Pro Tutor plan ($15 via Stripe), tutors can post unlimited listings with priority search placement.
                </p>
              </AccordionItem>

              <AccordionItem key="4" aria-label="What is the difference between Online and Offline modes?" title="What is the difference between Online and Offline modes?" className="text-sm font-bold">
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  Online tuitions are conducted via Zoom or Google Meet from anywhere. Offline tuitions are held in-person at the student’s home or tutor’s coaching facility in specific locations.
                </p>
              </AccordionItem>

              <AccordionItem key="5" aria-label="How are payments handled?" title="How are payments handled?" className="text-sm font-bold">
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  Monthly tuition fees are paid directly from student to tutor. MentorLagbe does not take commission cuts from your tuition fees. Only Pro membership upgrades use secure Stripe checkout.
                </p>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </section>

      {/* 10. DUAL BOTTOM CTA SPLIT BANNER WITH HEROUI BUTTONS */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary via-indigo-600 to-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Student CTA */}
            <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
              <Chip size="sm" variant="flat" className="bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider">
                For Students
              </Chip>
              <h3 className="text-2xl sm:text-3xl font-black">Looking for an Expert Tutor?</h3>
              <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed">
                Explore hundreds of verified tuition batches for SSC, HSC, Admission, and Programming.
              </p>
              <Link href="/tuitions" className="inline-block pt-2">
                <Button
                  color="secondary"
                  radius="full"
                  className="font-bold text-xs gap-1.5 shadow-lg"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Explore All Batches
                </Button>
              </Link>
            </div>

            {/* Tutor CTA */}
            <div className="p-8 rounded-3xl bg-black/20 backdrop-blur-md border border-white/20 space-y-4">
              <Chip size="sm" variant="flat" className="bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider">
                For Educators
              </Chip>
              <h3 className="text-2xl sm:text-3xl font-black">Want to Teach & Grow?</h3>
              <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed">
                Post your tuition batches with 0% middleman fees and start accepting eager students today.
              </p>
              <Link href="/become-a-tutor" className="inline-block pt-2">
                <Button
                  radius="full"
                  className="bg-white text-primary hover:bg-white/90 font-bold text-xs gap-1.5 shadow-lg"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Become a Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
