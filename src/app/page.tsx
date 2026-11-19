'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import api from '@/lib/api';
import TuitionCard from '@/components/tuition/TuitionCard';
import { TuitionCardSkeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [featuredTuitions, setFeaturedTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hero Search Widget State
  const [searchSubject, setSearchSubject] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [searchMode, setSearchMode] = useState('');

  // Why Choose Us Active Tab (students | tutors)
  const [benefitTab, setBenefitTab] = useState<'students' | 'tutors'>('students');

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // GSAP animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const searchWidgetRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchSubject) queryParams.set('subject', searchSubject);
    if (searchClass) queryParams.set('classLevel', searchClass);
    if (searchMode) queryParams.set('mode', searchMode);
    router.push(`/tuitions?${queryParams.toString()}`);
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

  const faqs = [
    {
      q: 'How does MentorLagbe verify tutors?',
      a: 'Every tutor on MentorLagbe submits their educational institution background and contact information. Our admin team validates their credentials before approving any public tuition batch.',
    },
    {
      q: 'Is it completely free for students to apply?',
      a: 'Yes! Students can register, browse, and apply to tuition listings for free with zero initial booking fee. An optional Pro Student upgrade ($10) is available for priority application status.',
    },
    {
      q: 'Can tutors post multiple tuition batches?',
      a: 'Free tutor accounts can post up to 2 active tuition batches. By upgrading to the Pro Tutor plan ($15 via Stripe), tutors can post unlimited listings with priority search placement.',
    },
    {
      q: 'What is the difference between Online and Offline modes?',
      a: 'Online tuitions are conducted via Zoom or Google Meet from anywhere. Offline tuitions are held in-person at the student’s home or tutor’s coaching facility in specific locations.',
    },
    {
      q: 'How are payments handled?',
      a: 'Monthly tuition fees are paid directly from student to tutor. MentorLagbe does not take commission cuts from your tuition fees. Only Pro membership upgrades use secure Stripe checkout.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION WITH INTERACTIVE SEARCH FUNNEL & 3D ASSET */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 sm:py-24 border-b border-border/50"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Bangladesh&apos;s #1 Smart Tuition & Mentorship Platform</span>
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

              {/* Interactive Search Funnel Widget (Tuturn / Preply inspired) */}
              <div
                ref={searchWidgetRef}
                className="p-3 sm:p-4 rounded-3xl border border-border/90 bg-card shadow-2xl backdrop-blur-md"
              >
                <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                  {/* Subject input */}
                  <div className="sm:col-span-4 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Subject (e.g. Math, Physics)"
                      value={searchSubject}
                      onChange={(e) => setSearchSubject(e.target.value)}
                      className="pl-10 h-12 rounded-2xl border-border bg-background text-xs text-foreground focus-visible:ring-primary"
                    />
                  </div>

                  {/* Class level select */}
                  <div className="sm:col-span-3">
                    <select
                      value={searchClass}
                      onChange={(e) => setSearchClass(e.target.value)}
                      className="w-full h-12 px-3 rounded-2xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Any Class Level</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="Admission">Admission Test</option>
                      <option value="University">University</option>
                    </select>
                  </div>

                  {/* Mode select */}
                  <div className="sm:col-span-2">
                    <select
                      value={searchMode}
                      onChange={(e) => setSearchMode(e.target.value)}
                      className="w-full h-12 px-3 rounded-2xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">All Modes</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>

                  {/* Submit Search CTA */}
                  <div className="sm:col-span-3">
                    <Button type="submit" className="w-full h-12 rounded-2xl font-bold text-xs gap-1.5 shadow-md shadow-primary/25">
                      <Search className="h-4 w-4" />
                      Find Batches
                    </Button>
                  </div>
                </form>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground px-1">
                  <span className="font-semibold text-foreground">Popular:</span>
                  <Link href="/tuitions?subject=Mathematics" className="hover:text-primary transition-colors underline decoration-dotted">
                    Higher Math
                  </Link>
                  <span>•</span>
                  <Link href="/tuitions?subject=Physics" className="hover:text-primary transition-colors underline decoration-dotted">
                    HSC Physics
                  </Link>
                  <span>•</span>
                  <Link href="/tuitions?subject=Programming" className="hover:text-primary transition-colors underline decoration-dotted">
                    Web & Coding
                  </Link>
                  <span>•</span>
                  <Link href="/tutors" className="text-primary font-bold hover:underline ml-auto">
                    Browse All Mentors →
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>100% Verified Tutors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Zero Initial Booking Fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Online & Offline Batches</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual with 3D Illustration & Floating Badges */}
            <div ref={heroImageRef} className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border-4 border-card bg-card shadow-2xl">
                  <img
                    src="/images/hero-illustration.jpg"
                    alt="MentorLagbe Online Tutor Marketplace"
                    className="h-[430px] w-full object-cover"
                  />
                </div>

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
              <Badge variant="secondary" className="mb-2">
                Handpicked Listings
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Featured Tuition Batches
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Explore verified tuition batches approved by administrators across Dhaka & Online.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/tutors">
                <Button variant="outline" className="font-semibold text-xs">
                  Find Tutors Directory
                </Button>
              </Link>
              <Link href="/tuitions">
                <Button className="gap-2 font-semibold text-xs">
                  View All Listings
                  <ArrowRight className="h-4 w-4" />
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
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
              <h3 className="text-lg font-bold text-foreground">No Featured Tuitions Available</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Check back shortly or visit the Browse Tuitions page to explore more.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. DUAL BENEFITS SECTION ("WHY CHOOSE MENTORLAGBE?") */}
      <section className="py-16 sm:py-24 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="outline" className="mb-2">Platform Value</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Why Choose MentorLagbe?
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Whether you are an aspiring student or a passionate educator, we provide a transparent, fee-free bridge.
            </p>

            {/* Toggle Switch */}
            <div className="mt-8 inline-flex p-1 rounded-2xl bg-card border border-border shadow-sm">
              <button
                onClick={() => setBenefitTab('students')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  benefitTab === 'students'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                For Students & Parents
              </button>
              <button
                onClick={() => setBenefitTab('tutors')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  benefitTab === 'tutors'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                For Tutors & Mentors
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(benefitTab === 'students' ? studentBenefits : tutorBenefits).map((b, idx) => (
              <Card
                key={idx}
                className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR SUBJECTS & PLATFORM STATS */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-2">
              Explore by Subject
            </Badge>
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
                className="flex flex-col items-center text-center p-5 rounded-2xl border border-border/80 bg-card hover:border-primary hover:shadow-md transition-all group"
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
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 via-indigo-500/10 to-secondary/10 border border-border p-8 sm:p-12">
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
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS 4-STEP ROAD */}
      <section className="py-16 sm:py-24 bg-muted/30 border-y border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-2">
            Simple 4-Step Process
          </Badge>
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
                <div
                  key={s.step}
                  className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border/80 bg-card shadow-sm hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <span className="absolute top-4 right-4 text-xs font-black text-muted-foreground/40 group-hover:text-primary transition-colors">
                    {s.step}
                  </span>
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <Link href="/how-it-works">
              <Button variant="outline" className="font-bold text-xs gap-2">
                Read Full Safety & Workflow Guide <ArrowRight className="h-3.5 w-3.5" />
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
                <div className="overflow-hidden rounded-3xl border-4 border-card bg-card shadow-2xl">
                  <img
                    src="/images/trust-safety.jpg"
                    alt="MentorLagbe Trust and Safety Shield"
                    className="h-[360px] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                Trust & Verification Guarantee
              </Badge>
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
                  <Button variant="outline" size="sm" className="font-bold text-xs">
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
            <Badge variant="pro" className="mb-2">
              Transparent Pricing
            </Badge>
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
            <Card className="flex flex-col justify-between border-2 border-primary/40 shadow-xl relative overflow-hidden bg-card">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                For Tutors
              </div>
              <div className="p-8">
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
              </div>

              <div className="p-8 pt-0">
                <Link href="/pricing">
                  <Button className="w-full font-bold shadow-md shadow-primary/20">
                    Subscribe with Stripe ($15)
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Student Pro Tier */}
            <Card className="flex flex-col justify-between border border-border shadow-md relative overflow-hidden bg-card">
              <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                For Students
              </div>
              <div className="p-8">
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
              </div>

              <div className="p-8 pt-0">
                <Link href="/pricing">
                  <Button variant="outline" className="w-full font-bold">
                    Upgrade Student Account ($10)
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">
              Reviews & Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Trusted by Students & Mentors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="p-6 border border-border/80 shadow-sm flex flex-col justify-between">
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
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-foreground">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION (TUTURN / PREPLY INSPIRED) */}
      <section className="py-16 sm:py-24 bg-muted/30 border-t border-border/60">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/80 bg-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-foreground hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. DUAL BOTTOM CTA SPLIT BANNER */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary via-indigo-600 to-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Student CTA */}
            <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full">
                For Students
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">Looking for an Expert Tutor?</h3>
              <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed">
                Explore hundreds of verified tuition batches for SSC, HSC, Admission, and Programming.
              </p>
              <Link href="/tuitions" className="inline-block pt-2">
                <Button variant="secondary" className="font-bold text-xs gap-1.5 shadow-lg">
                  Explore All Batches <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Tutor CTA */}
            <div className="p-8 rounded-3xl bg-black/20 backdrop-blur-md border border-white/20 space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full">
                For Educators
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">Want to Teach & Grow?</h3>
              <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed">
                Post your tuition batches with 0% middleman fees and start accepting eager students today.
              </p>
              <Link href="/become-a-tutor" className="inline-block pt-2">
                <Button className="bg-white text-primary hover:bg-white/90 font-bold text-xs gap-1.5 shadow-lg">
                  Become a Tutor <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
