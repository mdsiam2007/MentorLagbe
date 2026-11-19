'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ShieldCheck, Compass, GraduationCap, ArrowRight } from 'lucide-react';

interface RoadmapStep {
  step: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: RoadmapStep[] = [
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

export const HowItWorksRoadmap: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted/30 border-y-2 border-border/80">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="outline" className="mb-2">
          Simple 4-Step Process
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          How MentorLagbe Works
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mt-2">
          Connect, apply, and start learning with top university tutors in a few intuitive steps.
        </p>

        {/* Connected Visual Roadmap Container */}
        <div className="relative mt-14">
          {/* Horizontal Desktop Connecting Line */}
          <div
            className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-1 -translate-y-6 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full z-0"
            aria-hidden="true"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="relative p-6 rounded-3xl border-2 border-border bg-card shadow-[0_4px_0_0_hsl(var(--border))] hover:border-primary transition-colors flex flex-col items-center text-center group"
                >
                  {/* Step Sequence Badge */}
                  <div className="flex items-center justify-between w-full mb-4">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      Step {s.step}
                    </span>
                    <span className="text-[11px] font-bold text-muted-foreground/60">
                      0{index + 1} of 04
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 border-2 border-primary/20 text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Link to Full Guide */}
        <div className="mt-12">
          <Link href="/how-it-works">
            <Button variant="outline" className="gap-2 font-bold text-xs">
              Read Full Safety & Workflow Guide
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksRoadmap;
