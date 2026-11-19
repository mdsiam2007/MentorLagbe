'use client';

import React from 'react';
import Link from 'next/link';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Accordion,
  AccordionItem,
} from '@heroui/react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Calendar,
  Users,
  ShieldCheck,
  Star,
  Award,
  Zap,
} from 'lucide-react';

export default function BecomeATutorPage() {
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
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 sm:py-24 border-b border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <Chip
                color="secondary"
                variant="flat"
                size="md"
                startContent={<Sparkles className="h-4 w-4 ml-1" />}
                className="font-bold text-xs px-3 py-1"
              >
                Join Bangladesh&apos;s Fastest Growing Mentorship Community
              </Chip>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.15]">
                Teach What You Love, <br />
                <span className="text-primary underline decoration-primary/30">Earn On Your Terms</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Become a verified mentor on MentorLagbe. Post your tuition batches, set your own rates, and connect directly with verified students and parents across Bangladesh.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    color="primary"
                    radius="full"
                    className="w-full sm:w-auto font-bold gap-2 shadow-lg shadow-primary/25"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Start Teaching Today (Free)
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="bordered"
                    radius="full"
                    className="w-full sm:w-auto font-bold border-border"
                  >
                    View Pro Tutor Benefits
                  </Button>
                </Link>
              </div>

              {/* Quick stats checklist */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-border/60 text-xs text-muted-foreground">
                <Chip size="sm" variant="flat" color="success" startContent={<CheckCircle2 className="h-3.5 w-3.5 ml-1" />}>
                  0% Commission Fee
                </Chip>
                <Chip size="sm" variant="flat" color="primary" startContent={<CheckCircle2 className="h-3.5 w-3.5 ml-1" />}>
                  Direct Inquiries
                </Chip>
                <Chip size="sm" variant="flat" color="secondary" startContent={<CheckCircle2 className="h-3.5 w-3.5 ml-1" />}>
                  Online & Offline Freedom
                </Chip>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <Card shadow="lg" className="overflow-hidden rounded-3xl border-4 border-card bg-card shadow-2xl">
                  <img
                    src="/images/become-a-tutor.jpg"
                    alt="Become a Mentor on MentorLagbe"
                    className="h-[420px] w-full object-cover"
                  />
                </Card>

                {/* Floating Badge */}
                <div className="absolute -bottom-5 -left-4 rounded-2xl border border-border/80 bg-card p-4 shadow-xl flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">350+ Tutors Joined</p>
                    <p className="text-[10px] text-muted-foreground">Earning up to ৳ 45,000/mo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY TEACH ON MENTORLAGBE (PERKS) */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Chip size="sm" variant="bordered" className="mb-2 font-bold text-[11px]">
              Why Teach With Us?
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Designed For Educators, Built For Growth
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Say goodbye to middlemen agency fees. Enjoy direct control over your tuition schedule, fees, and students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <Card
                  key={idx}
                  shadow="sm"
                  className="p-6 rounded-3xl border border-border/80 bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <CardBody className="p-0">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{perk.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{perk.desc}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section className="py-16 sm:py-24 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Chip size="sm" color="primary" variant="flat" className="mb-2 font-bold text-[11px]">
              Simple Workflow
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Start Teaching in 4 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <Card
                key={st.num}
                shadow="sm"
                className="relative p-6 rounded-3xl border border-border/80 bg-card shadow-sm flex flex-col justify-between"
              >
                <CardBody className="p-0">
                  <span className="text-2xl font-black text-primary/40 block mb-3">{st.num}</span>
                  <h3 className="text-base font-bold text-foreground mb-2">{st.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                color="primary"
                radius="full"
                className="font-bold gap-2 shadow-lg shadow-primary/25"
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Register as Tutor Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION WITH HEROUI ACCORDION */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Chip size="sm" variant="bordered" className="mb-2 font-bold text-[11px]">
              Got Questions?
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Frequently Asked Questions by Tutors
            </h2>
          </div>

          <Card shadow="sm" className="rounded-3xl border border-border/80 bg-card p-4 sm:p-6">
            <Accordion variant="splitted" className="px-0">
              {tutorFaqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  aria-label={faq.q}
                  title={faq.q}
                  className="text-sm font-bold"
                >
                  <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-5xl px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Inspire the Next Generation of Achievers?
          </h2>
          <p className="text-sm sm:text-base text-primary-foreground/90 max-w-2xl mx-auto">
            Join hundreds of tutors from BUET, DMC, DU and leading institutions already growing their mentorship batches on MentorLagbe.
          </p>
          <div className="pt-2">
            <Link href="/sign-up">
              <Button
                size="lg"
                color="secondary"
                radius="full"
                className="font-extrabold px-8 py-6 text-base shadow-xl"
              >
                Create Free Tutor Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
