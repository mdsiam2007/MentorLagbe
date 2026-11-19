'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  Compass,
  GraduationCap,
  Users,
  AlertCircle,
  FileCheck,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

export default function HowItWorksPage() {
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
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Header */}
      <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16 sm:py-20 border-b border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-3 px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5 mr-1 text-primary" /> Transparent, Safe & Verified
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            How MentorLagbe Works & <span className="text-primary underline decoration-primary/30">Our Safety Promise</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-3">
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
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">For Students & Parents</h2>
                <p className="text-xs text-muted-foreground">Follow these 4 simple steps to find your ideal mentor.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentSteps.map((st) => (
                <Card key={st.step} className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm">
                  <span className="text-2xl font-black text-secondary block mb-3">0{st.step}</span>
                  <h3 className="text-base font-bold text-foreground mb-2">{st.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* For Tutors */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">For Teachers & Mentors</h2>
                <p className="text-xs text-muted-foreground">Start reaching genuine students across Bangladesh.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tutorSteps.map((st) => (
                <Card key={st.step} className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm">
                  <span className="text-2xl font-black text-primary block mb-3">0{st.step}</span>
                  <h3 className="text-base font-bold text-foreground mb-2">{st.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Safety & Trust Section with AI Graphic */}
      <section className="py-16 sm:py-24 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border-4 border-card bg-card shadow-2xl">
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
              <Badge variant="outline">Trust & Verification Policy</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Safety First: How We Protect Both Parties
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trust is the bedrock of academic mentoring. We enforce rigorous verification and safety protocols to ensure students learn in safe environments and teachers receive respected compensation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {safetyGuarantees.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-4 rounded-xl border border-border/70 bg-card space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Have Questions or Need Help?</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Our support team in Dhaka is here to help you get the best tutor or setup your first tuition batch.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/tuitions">
              <Button className="font-bold">Browse Tuitions</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="font-bold">Contact Support</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
