'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePageGsapReveal } from '@/hooks/useGsapScroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  Compass,
  GraduationCap,
  Users,
  FileCheck,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

export default function HowItWorksPage() {
  const pageRef = usePageGsapReveal();

  const studentSteps = [
    {
      step: '1',
      title: 'Find the Perfect Batch',
      desc: 'Use filters for Subject, Class Level, Medium (NCTB / English Medium), and Mode (Online or Home/Offline in your city).',
    },
    {
      step: '2',
      title: 'Review Verified Credentials',
      desc: 'Check tutor educational history, verified university badge, syllabus coverage, monthly fees, and student ratings.',
    },
    {
      step: '3',
      title: 'Apply in One Click',
      desc: 'Submit your contact details and preferred class timings. Free users can apply instantly with zero initial booking charge.',
    },
    {
      step: '4',
      title: 'Get Accepted & Begin Classes',
      desc: 'Once the tutor accepts your application, coordinate the trial or regular class schedule and accelerate your learning.',
    },
  ];

  const tutorSteps = [
    {
      step: '1',
      title: 'Sign Up as a Tutor',
      desc: 'Provide your name, phone number, bio, and educational institution (BUET, DU, DMC, etc.).',
    },
    {
      step: '2',
      title: 'Post Tuition Batches',
      desc: 'Specify subject, fee, days per week, and teaching mode. Free tutors can post up to 2 active batches; Pro tutors get unlimited posts.',
    },
    {
      step: '3',
      title: 'Admin Verification & Approval',
      desc: 'Every tuition post is reviewed by our admin team before going live to maintain high quality and platform authenticity.',
    },
    {
      step: '4',
      title: 'Manage Applicants on Dashboard',
      desc: 'Review interested students directly from your tutor dashboard and accept or reject applications with complete ease.',
    },
  ];

  const safetyGuarantees = [
    {
      icon: FileCheck,
      title: 'Academic & ID Verification',
      desc: 'Our administrative team verifies university identification, student ID cards, or educational certificates for verified badges.',
    },
    {
      icon: Lock,
      title: 'Secure Stripe Payments',
      desc: 'Pro subscription upgrades are processed through 256-bit encrypted Stripe checkout. We never store credit or debit card details.',
    },
    {
      icon: HeartHandshake,
      title: 'Home Tuition Safety Protocols',
      desc: 'For in-person offline tutoring, parents and tutors are advised to verify physical national IDs and conduct sessions in family study rooms.',
    },
    {
      icon: ShieldCheck,
      title: 'Admin Moderation & Zero Spam',
      desc: 'All tuition posts and user reports are actively reviewed. Fraudulent profiles or misleading listings are banned immediately.',
    },
  ];

  return (
    <div ref={pageRef} className="flex flex-col min-h-screen bg-cream/40 dark:bg-[#081612] transition-colors duration-300">
      {/* 1. Header */}
      <section className="page-header-reveal py-16 sm:py-20 border-b border-forest-900/10 dark:border-white/10 bg-cream/60 dark:bg-[#0B1E19]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="terracotta" className="mb-3 font-bold rounded-full text-xs">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Transparent, Safe & Verified
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
            How MentorLagbe Works & <span className="text-terracotta-500 underline decoration-terracotta-500/40 underline-offset-4">Our Safety Promise</span>
          </h1>
          <p className="text-sm sm:text-base text-forest-800/75 dark:text-[#F5F2EB]/75 max-w-2xl mx-auto mt-3">
            Learn how MentorLagbe connects dedicated learners with top university mentors, and discover our stringent trust & safety guidelines.
          </p>
        </div>
      </section>

      {/* 2. Dual Workflows */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {/* For Students */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-2xl bg-terracotta-50 dark:bg-terracotta-500/20 border border-terracotta-500/20 flex items-center justify-center text-terracotta-500">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB]">For Students & Parents</h2>
                <p className="text-xs text-forest-800/60 dark:text-white/60 font-semibold">Follow these 4 simple steps to find your ideal mentor.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentSteps.map((st) => (
                <motion.div
                  key={st.step}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="page-card-reveal p-6 sm:p-7 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card hover:shadow-soft transition-all"
                >
                  <span className="font-serif text-3xl font-extrabold text-terracotta-500 block mb-3">0{st.step}</span>
                  <h3 className="font-serif text-base font-bold text-forest-900 dark:text-white mb-2">{st.title}</h3>
                  <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{st.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* For Tutors */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-2xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 flex items-center justify-center text-forest-900 dark:text-white">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB]">For Teachers & Mentors</h2>
                <p className="text-xs text-forest-800/60 dark:text-white/60 font-semibold">Start reaching genuine students across Bangladesh.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tutorSteps.map((st) => (
                <motion.div
                  key={st.step}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="page-card-reveal p-6 sm:p-7 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card hover:shadow-soft transition-all"
                >
                  <span className="font-serif text-3xl font-extrabold text-forest-900 dark:text-emerald-400 block mb-3">0{st.step}</span>
                  <h3 className="font-serif text-base font-bold text-forest-900 dark:text-white mb-2">{st.title}</h3>
                  <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{st.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Safety & Trust Section */}
      <section className="py-16 sm:py-24 bg-cream/70 dark:bg-[#0B1E19] border-y border-forest-900/10 dark:border-white/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card">
                  <img
                    src="/images/trust-safety.jpg"
                    alt="Trust and Safety Shield"
                    className="h-[380px] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Safety Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="outline" className="rounded-full border-forest-900/15 dark:border-white/15">Trust & Verification Policy</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
                Safety First: How We Protect Both Parties
              </h2>
              <p className="text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed">
                Trust is the bedrock of academic mentoring. We enforce rigorous verification and safety protocols to ensure students learn in safe environments and teachers receive respected compensation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {safetyGuarantees.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="page-card-reveal p-4 sm:p-5 rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card space-y-2"
                    >
                      <div className="flex items-center gap-2 text-terracotta-500 font-bold text-sm">
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Action */}
      <section className="py-16 text-center">
        <div className="container mx-auto max-w-3xl px-4 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB]">Have Questions or Need Help?</h2>
          <p className="text-xs sm:text-sm text-forest-800/75 dark:text-[#F5F2EB]/75">
            Our support team in Dhaka is here to help you get the best tutor or setup your first tuition batch.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/tuitions">
              <Button variant="default" className="rounded-full px-6 hover:bg-terracotta-500 transition-colors cursor-pointer">Browse Tuitions</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="rounded-full px-6 border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">Contact Support</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}