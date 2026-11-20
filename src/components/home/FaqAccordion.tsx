'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does MentorLagbe verify tutors?',
    a: 'Every tutor submits their institutional ID card (BUET, DMC, DU, NSU, etc.) and academic records. Our admin team reviews and approves each profile manually before awarding the Verified Mentor badge.',
  },
  {
    q: 'Is it completely free for students to apply?',
    a: 'Yes! Browsing batches and applying to tutors is 100% free with zero booking fees. Students only pay their monthly tuition fee directly to their chosen mentor.',
  },
  {
    q: 'What is the difference between Online and Offline modes?',
    a: 'Online batches are conducted nationwide via Zoom, Google Meet, or Discord with digital whiteboards. Offline batches take place in-person across Dhaka neighborhoods like Dhanmondi, Uttara, and Mirpur.',
  },
  {
    q: 'How are monthly tuition payments handled?',
    a: 'Once accepted into a batch, students and mentors coordinate directly via WhatsApp. Monthly tuition fees are paid directly between student and tutor with zero platform commission.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faqSection" className="py-20 bg-white dark:bg-[#081612] border-t border-forest-900/10 dark:border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-terracotta-500 font-bold text-xs uppercase tracking-widest">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors overflow-hidden ${
                  isOpen
                    ? 'bg-cream dark:bg-[#132B24] border-terracotta-500/40 shadow-card'
                    : 'bg-cream dark:bg-[#132B24] border-forest-900/10 dark:border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-6 flex items-center justify-between text-left font-bold text-forest-900 dark:text-white gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-terracotta-500 text-white rotate-180'
                        : 'bg-white dark:bg-[#0F241E] text-terracotta-500 border border-forest-900/10 dark:border-white/10 rotate-0'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed">
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
  );
};

export default FaqAccordion;
