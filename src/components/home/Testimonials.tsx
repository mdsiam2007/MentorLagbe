'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Tanvir Rahman',
    role: 'HSC Candidate • Notre Dame College',
    quote:
      'MentorLagbe helped me find a BUET mentor for Higher Math in just 2 days. The concept clearing and weekly problem-solving batches completely changed my confidence!',
    avatarType: 'initials',
    initials: 'TR',
    badgeBg: 'bg-forest-900 text-white',
  },
  {
    name: 'Dr. Nusrat Jahan',
    role: 'Medical Mentor • DMC',
    quote:
      'As a tutor, managing applications and communicating with sincere students has never been easier. No agency commission means I can focus 100% on mentoring.',
    avatarType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    initials: 'NJ',
    badgeBg: 'bg-forest-700 text-white',
  },
  {
    name: 'Farzana Akter',
    role: 'Parent • Uttara, Dhaka',
    quote:
      'Finding a verified offline tutor in Uttara used to be stressful. MentorLagbe gave us transparent options, direct fee details, and genuinely caring teachers for my daughter.',
    avatarType: 'initials',
    initials: 'FA',
    badgeBg: 'bg-terracotta-500 text-white',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonialsSection" className="py-20 bg-cream dark:bg-[#081612]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-terracotta-500 font-bold text-xs uppercase tracking-widest">
            Community Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
            Stories From Students, Parents &amp; Mentors
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-[#0F241E] p-7 rounded-3xl border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between transition-all duration-300 hover:shadow-soft"
            >
              <div>
                <div className="flex gap-1 text-amberwarm-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-forest-800/85 dark:text-[#F5F2EB]/85 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-forest-900/10 dark:border-white/10">
                {t.avatarType === 'image' && t.imageUrl ? (
                  <img
                    src={t.imageUrl}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-forest-900/10"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div
                  className={`w-10 h-10 rounded-full ${t.badgeBg} font-bold text-xs flex items-center justify-center shrink-0 ${
                    t.avatarType === 'image' ? 'hidden' : ''
                  }`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-extrabold text-forest-900 dark:text-[#F5F2EB]">{t.name}</p>
                  <p className="text-[11px] font-medium text-forest-800/60 dark:text-[#F5F2EB]/60">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
