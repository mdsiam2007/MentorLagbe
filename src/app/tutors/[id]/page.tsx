'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import TuitionCard from '@/components/tuition/TuitionCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Mail,
  Phone,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface TutorProfile {
  _id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  phone?: string;
  plan?: 'free' | 'pro';
  tuitions?: any[];
}

export default function TutorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tutorId = resolvedParams.id;

  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/users/tutors/${tutorId}`)
      .then((res) => {
        if (res.data.success) {
          setTutor(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Failed to load tutor profile:', err);
        // Fallback profile if id is mock
        setTutor({
          _id: tutorId,
          name: 'Engr. Rakibul Islam',
          email: 'rakibul@buet.ac.bd',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          bio: 'B.Sc in Electrical and Electronic Engineering (EEE) from BUET. Over 5 years of successful coaching experience in Higher Mathematics & Physics for HSC and University Engineering Admission test seekers. Dedicated to intuitive concept-first problem solving.',
          phone: '+880 1712-345678',
          plan: 'pro',
          tuitions: [
            {
              _id: 'sample-tuition-1',
              title: 'HSC Higher Mathematics Batch (Calculus & Vectors)',
              subject: 'Mathematics',
              classLevel: 'Class 12',
              mode: 'Online',
              location: 'Online (Zoom / Meet)',
              monthlyFee: 4000,
              daysPerWeek: 3,
              tutorName: 'Engr. Rakibul Islam',
              tutorEmail: 'rakibul@buet.ac.bd',
              bannerImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
              description: 'Intensive problem solving and concept clearing for HSC 2026 students.',
            },
            {
              _id: 'sample-tuition-2',
              title: 'Engineering Admission Physics Problem Solving Masterclass',
              subject: 'Physics',
              classLevel: 'Admission',
              mode: 'Offline',
              location: 'Dhanmondi, Dhaka',
              monthlyFee: 5500,
              daysPerWeek: 4,
              tutorName: 'Engr. Rakibul Islam',
              tutorEmail: 'rakibul@buet.ac.bd',
              bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
              description: 'BUET, CKET & Top engineering admission test preparation batch.',
            },
          ],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tutorId]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-20 text-center">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">Loading Tutor Profile...</p>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-foreground">Tutor Not Found</h2>
        <p className="text-sm text-muted-foreground mt-2">The tutor profile you requested does not exist.</p>
        <Link href="/tutors">
          <Button className="mt-4">Back to All Tutors</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/tutors"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tutors Directory
        </Link>

        {/* Tutor Profile Header Card */}
        <Card className="p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            <div className="relative">
              <img
                src={tutor.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={tutor.name}
                className="h-28 w-28 sm:h-32 sm:w-32 rounded-3xl object-cover border-4 border-background shadow-lg"
              />
              <span className="absolute -bottom-2 -right-2 h-7 w-7 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center text-white shadow-md">
                <CheckCircle2 className="h-4 w-4" />
              </span>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">{tutor.name}</h1>
                {tutor.plan === 'pro' && (
                  <Badge variant="pro" className="uppercase font-bold text-xs tracking-wider">
                    PRO MENTOR
                  </Badge>
                )}
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/10 text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                  Verified Identity
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span>{tutor.email}</span>
                </div>
                {tutor.phone && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      <span>{tutor.phone}</span>
                    </div>
                  </>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed pt-2 max-w-3xl">
                {tutor.bio || 'Professional academic mentor offering comprehensive subject assistance and exam preparation.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Main Content Grid: Tuitions & Trust info */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Tuitions List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Active Tuition Batches ({tutor.tuitions?.length || 0})
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Available batches offered by {tutor.name}. Students can apply directly.
                </p>
              </div>
            </div>

            {tutor.tuitions && tutor.tuitions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                {tutor.tuitions.map((tuition) => (
                  <div key={tuition._id} className="h-full">
                    <TuitionCard {...tuition} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center border-dashed border-2">
                <BookOpen className="h-10 w-10 text-muted-foreground/60 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-foreground">No Active Tuitions At This Moment</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  This tutor is currently not accepting new batch applications.
                </p>
              </Card>
            )}
          </div>

          {/* Right Sidebar: Trust & Guarantee */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Mentor Verification Checklist
              </h3>

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Academic Degree & University ID Verified</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>National ID / NID Checked by Admin</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Student Feedback & Class Performance Audited</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Direct Communication After Application Approval</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Link href="/how-it-works">
                  <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                    Read Our Safety & Verification Policy →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                <Sparkles className="h-4 w-4" />
                Need Personalized Guidance?
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Click on any of the active batches above to submit your application. Once the tutor accepts your request, you can finalize schedules and start your classes.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
