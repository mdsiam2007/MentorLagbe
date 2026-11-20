'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Star, BadgeCheck, ArrowUpRight } from 'lucide-react';
import { BatchApplyModal, BatchApplyData } from './BatchApplyModal';

export interface BatchItem {
  id: string;
  tags: string[];
  badgeLevel: string;
  badgeMode: string;
  badgeModeColor: string;
  image: string;
  schedule: string;
  rating: string;
  title: string;
  description: string;
  mentorName: string;
  mentorInstitution: string;
  mentorAvatar: string;
  monthlyFee: string;
}

export const FEATURED_BATCHES_DATA: BatchItem[] = [
  {
    id: 'ielts-academic-7-5',
    tags: ['ielts', 'undergraduate', 'online'],
    badgeLevel: 'Undergraduate',
    badgeMode: 'Online 1-on-1',
    badgeModeColor: 'bg-emerald-600',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=700&q=80',
    schedule: '3 days/week',
    rating: '4.9 (42)',
    title: 'IELTS Academic 7.5+ Target Batch: Writing & Speaking Mentorship',
    description: 'Syllabus: Academic Task 1 & 2 Essay Structure, Cue Card Fluency & Weekly Mock Evaluations.',
    mentorName: 'Rahim Chowdhury',
    mentorInstitution: 'BUET CSE • 4+ Yrs Mentoring',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    monthlyFee: 'BDT 6,000',
  },
  {
    id: 'nextjs-15-fullstack',
    tags: ['coding', 'programming', 'online'],
    badgeLevel: 'All Levels',
    badgeMode: 'Online / Discord',
    badgeModeColor: 'bg-indigo-600',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=700&q=80',
    schedule: '3 days/week',
    rating: '5.0 (38)',
    title: 'Next.js 15 & Full-Stack Modern Web Development Mentorship',
    description: 'Syllabus: App Router, Server Actions, PostgreSQL/Prisma, Auth & 2 Production SaaS Projects.',
    mentorName: 'Rahim Chowdhury',
    mentorInstitution: 'BUET CSE • Software Engineer',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    monthlyFee: 'BDT 4,500',
  },
  {
    id: 'hsc-physics-mastery',
    tags: ['hsc', 'physics', 'buet', 'online'],
    badgeLevel: 'HSC Physics',
    badgeMode: 'Online / Meet',
    badgeModeColor: 'bg-emerald-600',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=700&q=80',
    schedule: '4 days/week',
    rating: '4.9 (64)',
    title: 'Complete HSC Physics Mastery (Theory + Mathematical Problems)',
    description: 'Syllabus: Vector, Newtonian Mechanics, Work-Energy, Electromagnetism & BUET Question Bank.',
    mentorName: 'Rahim Chowdhury',
    mentorInstitution: 'BUET CSE • Physics Olympiad',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    monthlyFee: 'BDT 4,000',
  },
  {
    id: 'medical-admission-biology',
    tags: ['hsc', 'biology', 'dmc', 'offline'],
    badgeLevel: 'Admission',
    badgeMode: 'Offline • Dhanmondi',
    badgeModeColor: 'bg-terracotta-500',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80',
    schedule: '3 days/week',
    rating: '5.0 (51)',
    title: 'Medical Admission Biology & HSC Zoology Crash Course',
    description: 'Syllabus: Human Physiology, Genetics & Evolution, Cell Division & DMC Admission Pattern MCQs.',
    mentorName: 'Dr. Nusrat Jahan',
    mentorInstitution: 'Dhaka Medical College (DMC)',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    monthlyFee: 'BDT 3,500',
  },
  {
    id: 'hsc-chemistry-organic',
    tags: ['hsc', 'chemistry', 'dmc', 'offline'],
    badgeLevel: 'Class 11-12',
    badgeMode: 'Offline • Uttara Sec 7',
    badgeModeColor: 'bg-terracotta-500',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=80',
    schedule: '3 days/week',
    rating: '4.9 (29)',
    title: 'HSC Chemistry (Organic Chemistry Reaction Mechanisms Simplified)',
    description: 'Syllabus: Aromaticity, SN1/SN2 Mechanisms, Named Reactions, Chemical Changes & Quantitative Math.',
    mentorName: 'Dr. Nusrat Jahan',
    mentorInstitution: 'Dhaka Medical College (DMC)',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    monthlyFee: 'BDT 5,000',
  },
  {
    id: 'hsc-higher-mathematics',
    tags: ['hsc', 'mathematics', 'buet', 'du', 'online'],
    badgeLevel: 'Class 11-12',
    badgeMode: 'Online via Zoom',
    badgeModeColor: 'bg-emerald-600',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80',
    schedule: '3 days/week',
    rating: '4.9 (47)',
    title: 'HSC Higher Mathematics: Calculus & Algebra Special Batch',
    description: 'Syllabus: Differentiation, Integration (LIATE & Wallis), Conics, Trigonometry & Matrix Mastery.',
    mentorName: 'Rahim Chowdhury',
    mentorInstitution: 'BUET CSE • Math Specialist',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    monthlyFee: 'BDT 4,200',
  },
];

const FILTER_PILLS = [
  { key: 'all', label: 'All Batches' },
  { key: 'hsc', label: 'HSC & Admission' },
  { key: 'coding', label: 'Programming' },
  { key: 'ielts', label: 'IELTS' },
  { key: 'offline', label: 'Dhaka Offline' },
];

export const FeaturedTuitions: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedBatch, setSelectedBatch] = useState<BatchApplyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Listen to external physics canvas orb clicks or hero quick tags
  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ filter: string }>;
      if (customEvent.detail?.filter) {
        setActiveFilter(customEvent.detail.filter.toLowerCase());
      }
    };

    window.addEventListener('mentorlagbe:filter-batches', handleFilterEvent);
    return () => {
      window.removeEventListener('mentorlagbe:filter-batches', handleFilterEvent);
    };
  }, []);

  const filteredBatches = FEATURED_BATCHES_DATA.filter((batch) => {
    if (activeFilter === 'all') return true;
    const searchContext = `${batch.tags.join(' ')} ${batch.title} ${batch.mentorInstitution} ${batch.description}`.toLowerCase();
    return searchContext.includes(activeFilter.toLowerCase());
  });

  const handleOpenApplyModal = (batch: BatchItem) => {
    const applyData: BatchApplyData = {
      batchTitle: batch.title,
      mentorName: batch.mentorName,
      monthlyFee: batch.monthlyFee,
      tuitionId: batch.id,
    };
    setSelectedBatch(applyData);
    setIsModalOpen(true);
  };

  return (
    <section id="batches" className="py-20 lg:py-28 bg-cream/50 dark:bg-[#081612]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-terracotta-500 font-bold text-xs uppercase tracking-widest">
              Curated Mentorship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
              Featured Tuition Batches
            </h2>
            <p className="text-forest-800/75 dark:text-[#F5F2EB]/75 mt-2 max-w-xl">
              Handpicked, admin-approved batches led by top university mentors across Dhaka &amp; Online.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {FILTER_PILLS.map((pill) => {
              const isActive = activeFilter === pill.key;
              return (
                <button
                  key={pill.key}
                  onClick={() => setActiveFilter(pill.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-forest-900 text-white shadow-soft dark:bg-emerald-600'
                      : 'bg-white dark:bg-[#0F241E] border border-forest-900/10 dark:border-white/10 text-forest-900 dark:text-white hover:border-terracotta-500'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Batches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredBatches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white dark:bg-[#0F241E] rounded-3xl border border-forest-900/10 dark:border-white/10 overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group flex flex-col hover:-translate-y-1"
            >
              {/* Image & Header Badges */}
              <div className="relative h-44 overflow-hidden bg-forest-800">
                <img
                  src={batch.image}
                  alt={batch.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-[#0F241E]/95 backdrop-blur-sm text-forest-900 dark:text-white text-[11px] font-extrabold uppercase">
                    {batch.badgeLevel}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full ${batch.badgeModeColor} text-white text-[11px] font-bold`}
                  >
                    {batch.badgeMode}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs font-semibold text-forest-800/60 dark:text-white/60 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-terracotta-500" />
                    {batch.schedule}
                  </span>
                  <span className="flex items-center gap-1 text-amberwarm-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {batch.rating}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-forest-900 dark:text-white group-hover:text-terracotta-500 transition-colors leading-snug mb-3">
                  {batch.title}
                </h3>
                <p className="text-xs text-forest-800/70 dark:text-white/70 mb-4 line-clamp-2 leading-relaxed">
                  {batch.description}
                </p>

                {/* Mentor Capsule */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-cream dark:bg-[#153028] mb-5 mt-auto border border-forest-900/5 dark:border-white/5">
                  <img
                    src={batch.mentorAvatar}
                    alt={batch.mentorName}
                    className="w-10 h-10 rounded-full object-cover border border-forest-900/10 dark:border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-extrabold text-forest-900 dark:text-white">{batch.mentorName}</p>
                      <BadgeCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <p className="text-[11px] font-semibold text-forest-800/65 dark:text-white/65">
                      {batch.mentorInstitution}
                    </p>
                  </div>
                </div>

                {/* Price & Apply CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-forest-900/10 dark:border-white/10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-forest-800/50 dark:text-white/50 block">
                      Monthly Fee
                    </span>
                    <span className="text-lg font-extrabold text-forest-900 dark:text-white">
                      {batch.monthlyFee}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenApplyModal(batch)}
                    className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-terracotta-500 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    View &amp; Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Explorer Button */}
        <div className="text-center mt-12">
          <Link
            href="/tuitions"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-[#0F241E] border-2 border-forest-900 dark:border-white/20 text-forest-900 dark:text-white font-bold text-sm hover:bg-forest-900 hover:text-white dark:hover:bg-white dark:hover:text-forest-900 transition-all shadow-sm"
          >
            <span>Explore All 350+ Mentorship Batches</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Batch Application Modal */}
        <BatchApplyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedBatch}
        />
      </div>
    </section>
  );
};

export default FeaturedTuitions;
