'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const DualCtaBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-primary text-primary-foreground border-t-2 border-primary/20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Student CTA */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="p-8 rounded-3xl bg-black/15 border-2 border-white/20 shadow-[0_6px_0_0_rgba(0,0,0,0.25)] space-y-4"
          >
            <span className="text-xs uppercase font-black tracking-wider bg-white/20 px-3 py-1 rounded-full border border-white/30 inline-block">
              For Students
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">Looking for an Expert Tutor?</h3>
            <p className="text-xs sm:text-sm text-primary-foreground/90 leading-relaxed">
              Explore hundreds of verified tuition batches for SSC, HSC, Admission, and Programming.
            </p>
            <div className="pt-2">
              <Link href="/tuitions" className="inline-block">
                <Button variant="secondary" className="gap-2 font-bold">
                  Explore All Batches
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Tutor CTA */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="p-8 rounded-3xl bg-white/15 border-2 border-white/20 shadow-[0_6px_0_0_rgba(0,0,0,0.25)] space-y-4"
          >
            <span className="text-xs uppercase font-black tracking-wider bg-white/20 px-3 py-1 rounded-full border border-white/30 inline-block">
              For Educators
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">Want to Teach & Grow?</h3>
            <p className="text-xs sm:text-sm text-primary-foreground/90 leading-relaxed">
              Post your tuition batches with 0% middleman fees and start accepting eager students today.
            </p>
            <div className="pt-2">
              <Link href="/become-a-tutor" className="inline-block">
                <Button className="bg-white text-primary border-2 border-white hover:bg-white/90 gap-2 font-bold shadow-[0_4px_0_0_rgba(255,255,255,0.4)]">
                  Become a Tutor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DualCtaBanner;
