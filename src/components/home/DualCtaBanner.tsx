'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const DualCtaBanner: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream dark:bg-[#081612]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Student CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="bg-forest-900 rounded-[2.5rem] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden shadow-soft"
        >
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amberwarm-500">
              For Students &amp; Parents
            </span>
            <h3 className="font-serif text-3xl font-bold mt-2 mb-3">Looking for an Expert Mentor?</h3>
            <p className="text-sm text-white/80 max-w-md mb-8 leading-relaxed">
              Explore hundreds of verified tuition batches for SSC, HSC, Medical/Engineering Admission, and Programming.
            </p>
          </div>
          <div className="relative z-10">
            <Link
              href="/tuitions"
              className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all shadow-glow"
            >
              <span>Explore All Batches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Educator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          whileHover={{ y: -4 }}
          className="bg-terracotta-500 rounded-[2.5rem] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden shadow-soft"
        >
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-white/90">
              For Educators
            </span>
            <h3 className="font-serif text-3xl font-bold mt-2 mb-3">Want to Teach &amp; Inspire?</h3>
            <p className="text-sm text-white/90 max-w-md mb-8 leading-relaxed">
              Post your tuition batches with 0% middleman fees and build meaningful mentorship connections with eager students.
            </p>
          </div>
          <div className="relative z-10">
            <Link
              href="/become-a-tutor"
              className="inline-flex items-center gap-2 bg-white text-forest-900 hover:bg-cream font-bold text-sm px-6 py-3.5 rounded-full transition-all shadow-sm"
            >
              <span>Become a Verified Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DualCtaBanner;
