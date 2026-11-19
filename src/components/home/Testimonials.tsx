'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  comment: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Tanvir Hasan',
    role: 'HSC Candidate (Notre Dame College)',
    comment:
      'MentorLagbe helped me find a BUET mentor for Higher Math in just 2 days. The concept clearing and weekly problem-solving batches are top-notch!',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    rating: 5,
  },
  {
    name: 'Dr. Nusrat Jahan',
    role: 'Medical Tutor & Mentor (DMC)',
    comment:
      'As a tutor, managing applications and communicating with sincere students has never been easier. Upgrading to Pro gave me unlimited post visibility!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
  },
  {
    name: 'Farzana Akter',
    role: 'Parent of Class 9 Student, Uttara',
    comment:
      'Finding a verified offline tutor in Uttara was always stressful. MentorLagbe gave us transparent options, direct fee details, and trusted teachers.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">
            Reviews & Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Trusted by Students & Mentors
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real feedback from our growing academic community across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="p-6 rounded-3xl border-2 border-border bg-card shadow-[0_4px_0_0_hsl(var(--border))] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed italic font-medium">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t-2 border-border/40">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-border"
                />
                <div>
                  <p className="text-xs font-bold text-foreground">{t.name}</p>
                  <p className="text-[11px] font-semibold text-muted-foreground">{t.role}</p>
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
