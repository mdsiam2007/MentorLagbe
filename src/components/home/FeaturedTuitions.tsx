'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import TuitionCard from '@/components/tuition/TuitionCard';
import { TuitionCardSkeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen } from 'lucide-react';

export const FeaturedTuitions: React.FC = () => {
  const [featuredTuitions, setFeaturedTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .get('/tuitions/featured')
      .then((res) => {
        if (isMounted && res.data.success) {
          setFeaturedTuitions(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load featured tuitions:', err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge variant="secondary" className="mb-2">
              Handpicked Listings
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Featured Tuition Batches
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Explore verified tuition batches approved by administrators across Dhaka & Online.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/tutors">
              <Button variant="outline" size="sm">
                Find Tutors Directory
              </Button>
            </Link>
            <Link href="/tuitions">
              <Button variant="default" size="sm" className="gap-2">
                View All Listings
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <TuitionCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredTuitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {featuredTuitions.map((tuition) => (
              <div key={tuition._id} className="h-full">
                <TuitionCard {...tuition} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-border bg-card p-12 text-center shadow-[0_4px_0_0_hsl(var(--border))]">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
            <h3 className="text-lg font-bold text-foreground">No Featured Tuitions Available</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Check back shortly or visit the Browse Tuitions page to explore more.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTuitions;
