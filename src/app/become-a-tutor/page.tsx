'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Calendar,
  Users,
  ShieldCheck,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function BecomeATutorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const perks = [
    {
      icon: DollarSign,
      title: 'Zero Hidden Commission',
      desc: 'Keep 100% of your tuition fees. Unlike typical agencies that cut 50-70% of your first month salary, MentorLagbe takes 0% cut.',
    },
    {
      icon: Calendar,
      title: 'Teach On Your Schedule',
      desc: 'You decide whether you want to teach 1-on-1 offline in your neighborhood or conduct group sessions via Zoom/Google Meet.',
    },
    {
      icon: Users,
      title: 'Reach Thousands of Serious Students',
      desc: 'Over 1,500 active students and parents in Dhaka and across Bangladesh search MentorLagbe daily for certified instructors.',
    },
    {
      icon: Award,
      title: 'Build Verified Reputation',
      desc: 'Showcase your BUET, DU, Medical, or University credentials. Pro badges and verified checks make you the top choice.',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Create Your Free Account',
      desc: 'Sign up in under 60 seconds with your university details and educational bio.',
    },
    {
      num: '02',
      title: 'Post Your Tuition Offer',
      desc: 'Set your subject, class level, monthly fee, schedule, and online or offline teaching mode.',
    },
    {
      num: '03',
      title: 'Review Student Applications',
      desc: 'Interested students apply directly to your batch. You review their profile and accept with one click.',
    },
    {
      num: '04',
      title: 'Start Teaching & Earn',
      desc: 'Coordinate timings directly with your students and begin conducting high-impact classes.',
    },
  ];

  const tutorFaqs = [
    {
      q: 'Do I have to pay any upfront fee to register as a tutor?',
      a: 'No! Registration on MentorLagbe is completely free. You can create your tutor profile and post up to 2 active tuition batches with zero charge.',
    },
    {
      q: 'What is the Pro Tutor Upgrade ($15)?',
      a: 'The Pro Tutor plan gives you unlimited tuition batch postings, a verified PRO badge on your profile, priority search ranking, and instant notifications when students apply.',
    },
    {
      q: 'Can I teach both online and offline?',
      a: 'Yes, absolutely! You can choose "Online", "Offline" (home tutoring), or both when creating each of your tuition listings.',
    },
    {
      q: 'How does payment work between tutor and student?',
      a: 'Students pay their tuition fees directly to you as agreed in your tuition post. MentorLagbe charges 0% commission on your monthly earnings.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-cream/40 dark:bg-[#081612] transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-forest-900/10 dark:border-white/10 bg-cream/60 dark:bg-[#0B1E19]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="terracotta" className="px-3.5 py-1 text-xs font-bold rounded-full">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Join Bangladesh&apos;s Fastest Growing Mentorship Community
              </Badge>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight leading-[1.12]">
                Teach What You Love, <br />
                <span className="text-terracotta-500 underline decoration-terracotta-500/40 underline-offset-4">Earn On Your Terms</span>
              </h1>

              <p className="text-base sm:text-lg text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed max-w-2xl">
                Become a verified mentor on MentorLagbe. Post your tuition batches, set your own rates, and connect directly with verified students and parents across Bangladesh.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link href="/sign-up">
                  <Button size="lg" variant="terracotta" className="gap-2 rounded-full font-bold shadow-glow cursor-pointer">
                    Start Teaching Today (Free)
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
                    View Pro Tutor Benefits
                  </Button>
                </Link>
              </div>

              {/* Stats checklist */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-forest-900/10 dark:border-white/10 text-xs text-forest-800/70 dark:text-white/70">
                <Badge variant="success" className="rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  0% Commission Fee
                </Badge>
                <Badge variant="default" className="rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Direct Inquiries
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Online & Offline Freedom
                </Badge>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card">
                  <img
                    src="/images/become-a-tutor.jpg"
                    alt="Become a Mentor on MentorLagbe"
                    className="h-[420px] w-full object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-5 -left-4 rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-4 shadow-card flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-terracotta-50 dark:bg-terracotta-500/20 border border-terracotta-500/20 flex items-center justify-center text-terracotta-500">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-forest-900 dark:text-white">350+ Tutors Joined</p>
                    <p className="text-[10px] font-semibold text-forest-800/60 dark:text-white/60">Earning up to ৳ 45,000/mo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY TEACH ON MENTORLAGBE (PERKS) */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-2 rounded-full border-forest-900/15 dark:border-white/15">Why Teach With Us?</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
              Designed For Educators, Built For Growth
            </h2>
            <p className="text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 mt-2">
              Say goodbye to middlemen agency fees. Enjoy direct control over your tuition schedule, fees, and students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="p-6 sm:p-7 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card hover:shadow-soft hover:border-terracotta-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-2xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 text-terracotta-500 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-forest-900 dark:text-white mb-2">{perk.title}</h3>
                    <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{perk.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section className="py-16 sm:py-24 bg-cream/70 dark:bg-[#0B1E19] border-y border-forest-900/10 dark:border-white/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="terracotta" className="mb-2 rounded-full">Simple Workflow</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
              Start Teaching in 4 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <motion.div
                key={st.num}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="relative p-6 sm:p-7 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-extrabold text-terracotta-500/40 block mb-3">{st.num}</span>
                  <h3 className="font-serif text-base font-bold text-forest-900 dark:text-white mb-2">{st.title}</h3>
                  <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{st.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/sign-up">
              <Button size="lg" variant="default" className="gap-2 rounded-full font-bold hover:bg-terracotta-500 transition-colors cursor-pointer">
                Register as Tutor Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION WITH ANIMATEPRESENCE */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 rounded-full border-forest-900/15 dark:border-white/15">Got Questions?</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
              Frequently Asked Questions by Tutors
            </h2>
          </div>

          <div className="space-y-4">
            {tutorFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-forest-900 dark:text-[#F5F2EB] hover:text-terracotta-500 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-terracotta-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-forest-800/40 dark:text-white/40" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed border-t border-forest-900/10 dark:border-white/10 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="py-16 bg-forest-900 text-white dark:bg-[#0F241E] border-t border-forest-900/10 dark:border-white/10">
        <div className="container mx-auto max-w-5xl px-4 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to Inspire the Next Generation of Achievers?
          </h2>
          <p className="text-sm sm:text-base text-cream/90 max-w-2xl mx-auto">
            Join hundreds of tutors from BUET, DMC, DU and leading institutions already growing their mentorship batches on MentorLagbe.
          </p>
          <div className="pt-2">
            <Link href="/sign-up">
              <Button size="lg" variant="terracotta" className="px-8 py-6 text-base font-black rounded-full shadow-glow cursor-pointer">
                Create Free Tutor Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}