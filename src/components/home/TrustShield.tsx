'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, Check, ArrowRight } from 'lucide-react';

const guaranteePoints = [
  {
    title: 'Institutional Credential Verification',
    desc: 'We verify student ID cards and university affiliations (BUET, DMC, DU, NSU, etc.) before issuing the verified badge.',
  },
  {
    title: 'Transparent Direct Pricing',
    desc: 'No hidden fee markups or agency cuts. You pay the exact monthly fee listed directly to your tutor.',
  },
  {
    title: '256-bit Encrypted Stripe Upgrades',
    desc: 'Safe, instant one-time upgrades for Pro Tutors and Priority Students.',
  },
];

export const TrustShield: React.FC = () => {
  return (
    <section id="trustSafetySection" className="py-20 bg-cream dark:bg-[#081612]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0F241E] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-forest-900/10 dark:border-white/10 shadow-soft grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Visual Mask */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-forest-900 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=85"
                alt="Trusted University Mentors"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/20 to-transparent flex flex-col justify-end p-7 text-white">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-3 shadow-md">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <p className="font-serif text-2xl font-bold">Verified Academic Trust</p>
                <p className="text-xs text-white/80 mt-1">
                  Every mentor passes manual institutional ID verification.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Guarantees List */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <Lock className="w-3.5 h-3.5" /> Safety &amp; Authenticity First
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] leading-tight">
              Authentic Mentors You and Your Parents Can Truly Rely On
            </h2>
            <p className="text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed">
              We believe academic authenticity and student safety should never be compromised. Every tutor listing undergoes strict administrative verification before going live on MentorLagbe.
            </p>

            <div className="space-y-4 pt-2">
              {guaranteePoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.12 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-forest-900 dark:text-[#F5F2EB]">{point.title}</h4>
                    <p className="text-xs text-forest-800/70 dark:text-[#F5F2EB]/70 mt-0.5 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-3">
              <Link href="/how-it-works">
                <Button variant="outline" size="sm" className="rounded-full px-5 py-2 font-bold text-xs gap-2 border-forest-900/15 dark:border-white/15 cursor-pointer">
                  <span>Learn More About Trust Guidelines</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustShield;
