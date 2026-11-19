'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Avatar,
} from '@heroui/react';
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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-primary/10 via-background to-background py-12 sm:py-16 border-b border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Chip color="primary" variant="flat" size="sm" className="mb-3 font-bold text-xs">
            <Sparkles className="h-3.5 w-3.5 mr-1" /> Verified Academic Mentors
          </Chip>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Meet Bangladesh&apos;s Top <span className="text-primary underline decoration-primary/30">Educators</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-3">
            Explore vetted mentors from BUET, DMC, DU and top universities. Learn 1-on-1 or join dedicated tuition batches.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by tutor name, institution or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-full border border-border bg-card shadow-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Subject Pills with HeroUI Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {subjects.map((sub) => (
              <Chip
                key={sub}
                as="button"
                onClick={() => setSelectedSubject(sub)}
                color={selectedSubject === sub ? 'primary' : 'default'}
                variant={selectedSubject === sub ? 'solid' : 'bordered'}
                className="cursor-pointer font-bold text-xs transition-transform hover:scale-105"
              >
                {sub}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* Tutors Grid */}
      <section className="py-12 sm:py-16 flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm font-semibold text-muted-foreground">
              Showing <span className="text-foreground font-bold">{filteredTutors.length}</span> Mentors Available
            </p>
            <Link href="/become-a-tutor">
              <Button
                variant="bordered"
                radius="full"
                size="sm"
                className="gap-2 text-xs font-bold border-border"
                endContent={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Want to teach? Join as Tutor
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 rounded-3xl border border-border bg-card animate-pulse p-6" />
              ))}
            </div>
          ) : filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredTutors.map((tutor) => (
                <Card
                  key={tutor._id}
                  shadow="sm"
                  className="p-6 rounded-3xl border border-border bg-card hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <CardBody className="p-0">
                    <div>
                      {/* Top Row: Avatar & Badges */}
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar
                            src={tutor.image}
                            name={tutor.name}
                            size="lg"
                            className="rounded-2xl border-2 border-border group-hover:scale-105 transition-transform"
                          />
                          <span
                            className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center text-white"
                            title="Verified"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                              {tutor.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1 mt-1 text-xs text-amber-500">
                            <Star className="h-3.5 w-3.5 fill-amber-500" />
                            <span className="font-bold">4.9</span>
                            <span className="text-muted-foreground text-[11px]">(24+ reviews)</span>
                          </div>

                          <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                            <span>100% Background Verified</span>
                          </div>
                        </div>

                        {tutor.plan === 'pro' && (
                          <Chip size="sm" color="primary" variant="solid" className="text-[10px] uppercase font-bold shrink-0">
                            PRO
                          </Chip>
                        )}
                      </div>

                      {/* Bio */}
                      <p className="mt-4 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {tutor.bio || 'Experienced educator focused on personalized mentoring, conceptual clarity, and exam preparation.'}
                      </p>

                      {/* Subjects Badges with HeroUI Chips */}
                      {tutor.subjects && tutor.subjects.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {tutor.subjects.map((sub, idx) => (
                            <Chip key={idx} size="sm" variant="flat" className="text-[11px] font-medium">
                              {sub}
                            </Chip>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Stats & Action */}
                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase font-semibold">Active Batches</span>
                        <span className="text-xs font-bold text-foreground flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5 text-primary" />
                          {tutor.tuitionCount || 1} Open
                        </span>
                      </div>

                      <Link href={`/tutors/${tutor._id}`}>
                        <Button
                          size="sm"
                          color="primary"
                          radius="full"
                          className="font-bold text-xs gap-1.5 shadow-md shadow-primary/20"
                          endContent={<ArrowRight className="h-3.5 w-3.5" />}
                        >
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-3xl border border-border bg-card p-12 text-center">
              <CardBody className="items-center">
                <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
                <h3 className="text-lg font-bold text-foreground">No Mentors Found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try searching with a different term or clear the filter.
                </p>
                <Button
                  variant="bordered"
                  radius="full"
                  size="sm"
                  onClick={() => {
                    setSearch('');
                    setSelectedSubject('All');
                  }}
                  className="mt-4 font-bold border-border"
                >
                  Reset Filters
                </Button>
              </CardBody>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
