'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TutorCardSkeleton } from '@/components/common/Skeleton';
import {
  Search,
  Star,
  GraduationCap,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Tutor {
  _id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  phone?: string;
  plan?: 'free' | 'pro';
  tuitionCount?: number;
  subjects?: string[];
  minFee?: number;
}

const fallbackTutors: Tutor[] = [
  {
    _id: 'tut-1',
    name: 'Engr. Rakibul Islam',
    email: 'rakibul@buet.ac.bd',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'B.Sc in EEE from BUET. 5+ years of experience in Higher Mathematics & Physics for HSC and Admission candidates.',
    plan: 'pro',
    tuitionCount: 4,
    subjects: ['Mathematics', 'Physics'],
    minFee: 4000,
  },
  {
    _id: 'tut-2',
    name: 'Dr. Tasnim Rahman',
    email: 'tasnim@dmc.edu.bd',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'MBBS from Dhaka Medical College (DMC). Specialized in Biology, Botany & Chemistry for Medical Admission.',
    plan: 'pro',
    tuitionCount: 3,
    subjects: ['Biology', 'Chemistry'],
    minFee: 4500,
  },
  {
    _id: 'tut-3',
    name: 'Siam Chowdhury',
    email: 'siam.dev@du.ac.bd',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Software Engineer & DU CS Graduate. Mentoring students in Full-Stack Web Development, Next.js, and Python ICT.',
    plan: 'pro',
    tuitionCount: 5,
    subjects: ['Programming', 'ICT'],
    minFee: 5000,
  },
  {
    _id: 'tut-4',
    name: 'Nusrat Jahan Chowdhury',
    email: 'nusrat.ielts@gmail.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    bio: 'IELTS 8.5 Score Holder, MA in English from University of Dhaka. Expert in Spoken English, Grammar, and O/A Level English.',
    plan: 'free',
    tuitionCount: 2,
    subjects: ['English', 'IELTS'],
    minFee: 3500,
  },
  {
    _id: 'tut-5',
    name: 'Tanvir Hossain',
    email: 'tanvir@cuet.ac.bd',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'CUET Mechanical Graduate. Passionate teacher focusing on SSC & HSC General Science, Physics and Concept Building.',
    plan: 'free',
    tuitionCount: 2,
    subjects: ['Physics', 'General Science'],
    minFee: 3000,
  },
  {
    _id: 'tut-6',
    name: 'Afsana Kabir',
    email: 'afsana@brac.edu.bd',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    bio: 'Economics Graduate from BRAC University. Dedicated mentor for Commerce, Accounting, and Business Studies students.',
    plan: 'pro',
    tuitionCount: 3,
    subjects: ['Accounting', 'Economics'],
    minFee: 3500,
  },
];

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Programming', 'English'];

  useEffect(() => {
    fetchTutors();
  }, [selectedSubject]);

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const subjectParam = selectedSubject !== 'All' ? `?subject=${selectedSubject}` : '';
      const res = await api.get(`/users/tutors${subjectParam}`);
      if (res.data.success && res.data.data && res.data.data.length > 0) {
        setTutors(res.data.data);
      } else {
        if (selectedSubject === 'All') {
          setTutors(fallbackTutors);
        } else {
          setTutors(fallbackTutors.filter((t) => t.subjects?.includes(selectedSubject)));
        }
      }
    } catch {
      if (selectedSubject === 'All') {
        setTutors(fallbackTutors);
      } else {
        setTutors(fallbackTutors.filter((t) => t.subjects?.includes(selectedSubject)));
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredTutors = tutors.filter((t) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.bio?.toLowerCase().includes(q) ||
      t.subjects?.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-cream/40 dark:bg-[#081612] transition-colors duration-300">
      {/* Header Banner */}
      <section className="py-12 sm:py-16 border-b border-forest-900/10 dark:border-white/10 bg-cream/70 dark:bg-[#0B1E19]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="terracotta" className="mb-3 font-bold px-3 py-1 rounded-full text-xs">
            <Sparkles className="h-3.5 w-3.5 mr-1" /> Verified Academic Mentors
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
            Meet Bangladesh&apos;s Top <span className="text-terracotta-500 underline decoration-terracotta-500/40 underline-offset-4">Educators</span>
          </h1>
          <p className="text-sm sm:text-base text-forest-800/75 dark:text-[#F5F2EB]/75 max-w-2xl mx-auto mt-3">
            Explore vetted mentors from BUET, DMC, DU and top universities. Learn 1-on-1 or join dedicated tuition batches.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-forest-800/40 dark:text-white/40" />
            <input
              type="text"
              placeholder="Search by tutor name, institution or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-full border border-forest-900/15 dark:border-white/15 bg-white dark:bg-[#0F241E] shadow-card text-sm text-forest-900 dark:text-[#F5F2EB] placeholder:text-forest-800/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/40 transition-all"
            />
          </div>

          {/* Subject Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-forest-900 text-white dark:bg-emerald-600 border-forest-900 shadow-soft'
                    : 'bg-white dark:bg-[#0F241E] border-forest-900/10 dark:border-white/10 text-forest-900 dark:text-white hover:border-terracotta-500'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tutors Grid */}
      <section className="py-12 sm:py-16 flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs sm:text-sm font-semibold text-forest-800/70 dark:text-white/70">
              Showing <span className="text-forest-900 dark:text-white font-extrabold">{filteredTutors.length}</span> Mentors Available
            </p>
            <Link href="/become-a-tutor">
              <Button variant="outline" size="sm" className="gap-2 font-bold text-xs rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
                Want to teach? Join as Tutor <ArrowRight className="h-3.5 w-3.5 text-terracotta-500" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <TutorCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredTutors.map((tutor) => (
                <motion.div
                  key={tutor._id}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="p-6 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card hover:shadow-soft hover:border-terracotta-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Avatar & Badges */}
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={tutor.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                          alt={tutor.name}
                          className="h-16 w-16 rounded-2xl object-cover border-2 border-forest-900/10 dark:border-white/10 group-hover:scale-105 transition-transform"
                        />
                        <span
                          className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-600 rounded-full border-2 border-white dark:border-[#0F241E] flex items-center justify-center text-white"
                          title="Verified"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-forest-900 dark:text-white truncate group-hover:text-terracotta-500 transition-colors">
                          {tutor.name}
                        </h3>

                        <div className="flex items-center gap-1 mt-1 text-xs text-amberwarm-500">
                          <Star className="h-3.5 w-3.5 fill-amberwarm-500" />
                          <span className="font-bold">4.9</span>
                          <span className="text-forest-800/60 dark:text-white/60 text-[11px] font-semibold">(24+ reviews)</span>
                        </div>

                        <div className="mt-1 flex items-center gap-1 text-[11px] text-forest-800/70 dark:text-white/70 font-semibold">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>100% Background Verified</span>
                        </div>
                      </div>

                      {tutor.plan === 'pro' && (
                        <Badge variant="pro" className="text-[10px] shrink-0">
                          PRO
                        </Badge>
                      )}
                    </div>

                    {/* Bio */}
                    <p className="mt-4 text-xs text-forest-800/75 dark:text-[#F5F2EB]/75 line-clamp-3 leading-relaxed">
                      {tutor.bio || 'Experienced educator focused on personalized mentoring, conceptual clarity, and exam preparation.'}
                    </p>

                    {/* Subjects Badges */}
                    {tutor.subjects && tutor.subjects.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tutor.subjects.map((sub, idx) => (
                          <Badge key={idx} variant="flat" className="text-[11px] font-bold rounded-full">
                            {sub}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Stats & Action */}
                  <div className="mt-6 pt-4 border-t border-forest-900/10 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-forest-800/60 dark:text-white/60 block uppercase font-bold tracking-wider">
                        Active Batches
                      </span>
                      <span className="text-xs font-bold text-forest-900 dark:text-white flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5 text-terracotta-500" />
                        {tutor.tuitionCount || 1} Open
                      </span>
                    </div>

                    <Link href={`/tutors/${tutor._id}`}>
                      <Button size="sm" variant="default" className="gap-1.5 font-bold text-xs rounded-full hover:bg-terracotta-500 transition-colors cursor-pointer">
                        View Profile
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-12 text-center shadow-card">
              <GraduationCap className="mx-auto h-12 w-12 text-forest-900/30 dark:text-white/30 mb-3" />
              <h3 className="font-serif text-lg font-bold text-forest-900 dark:text-[#F5F2EB]">No Mentors Found</h3>
              <p className="text-sm text-forest-800/70 dark:text-white/70 mt-1 max-w-sm mx-auto">
                Try searching with a different term or clear the filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch('');
                  setSelectedSubject('All');
                }}
                className="mt-4 rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}