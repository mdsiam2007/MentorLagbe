'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const PricingComparison: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted/40 border-y-2 border-border/80">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="pro" className="mb-2">
            <Sparkles className="h-3 w-3 mr-1" />
            Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Free vs Pro Subscription
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mt-2">
            Start completely free, or unlock unlimited tuition postings and priority booking with our
            secure Stripe checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch">
          {/* Tutor Pro Tier */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="flex flex-col justify-between border-2 border-primary rounded-3xl relative overflow-hidden bg-card p-8 shadow-[0_6px_0_0_hsl(var(--primary)/0.4)]"
          >
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              For Tutors
            </div>
            <div>
              <span className="text-xs font-black uppercase text-primary tracking-wider">
                Pro Tutor Plan
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black text-foreground">$15</span>
                <span className="text-sm font-bold text-muted-foreground">/ one-time upgrade</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Best for university tutors and professional mentors looking to scale tuition batches.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">Unlimited tuition batch postings</span> (Free max 2)
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
                  <span>Direct student inquiry notifications</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link href="/pricing" className="block w-full">
                <Button variant="default" className="w-full font-bold">
                  Subscribe with Stripe ($15)
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Student Pro Tier */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="flex flex-col justify-between border-2 border-secondary rounded-3xl relative overflow-hidden bg-card p-8 shadow-[0_6px_0_0_hsl(var(--secondary)/0.4)]"
          >
            <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              For Students
            </div>
            <div>
              <span className="text-xs font-black uppercase text-secondary tracking-wider">
                Pro Student Plan
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black text-foreground">$10</span>
                <span className="text-sm font-bold text-muted-foreground">/ one-time upgrade</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Designed for dedicated learners seeking top mentor acceptance and priority review.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">Priority application status for batches</span>
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

            <div className="pt-8">
              <Link href="/pricing" className="block w-full">
                <Button variant="secondary" className="w-full font-bold">
                  Upgrade Student Account ($10)
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
