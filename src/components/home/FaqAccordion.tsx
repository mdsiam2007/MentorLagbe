'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'How does MentorLagbe verify tutors?',
    a: 'Every tutor on MentorLagbe submits their educational institution background and contact information. Our admin team validates their credentials before approving any public tuition batch.',
  },
  {
    q: 'Is it completely free for students to apply?',
    a: 'Yes! Students can register, browse, and apply to tuition listings for free with zero initial booking fee. An optional Pro Student upgrade ($10) is available for priority application status.',
  },
  {
    q: 'Can tutors post multiple tuition batches?',
    a: 'Free tutor accounts can post up to 2 active tuition batches. By upgrading to the Pro Tutor plan ($15 via Stripe), tutors can post unlimited listings with priority search placement.',
  },
  {
    q: 'What is the difference between Online and Offline modes?',
    a: 'Online tuitions are conducted via Zoom or Google Meet from anywhere. Offline tuitions are held in-person at the student’s home or tutor’s coaching facility in specific locations.',
  },
  {
    q: 'How are payments handled?',
    a: 'Monthly tuition fees are paid directly from student to tutor. MentorLagbe does not take commission cuts from your tuition fees. Only Pro membership upgrades use secure Stripe checkout.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-16 sm:py-24 bg-muted/30 border-t-2 border-border/80">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Everything you need to know about navigating the MentorLagbe platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border-2 border-border bg-card shadow-[0_3px_0_0_hsl(var(--border))] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-foreground hover:text-primary transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t-2 border-border/40 pt-3">
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
