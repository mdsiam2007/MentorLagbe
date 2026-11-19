'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import TuitionCard from '@/components/tuition/TuitionCard';
import { TuitionCardSkeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Bookmark, Search, Trash2, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export default function SavedTuitionsPage() {
  const [tuitions, setTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchSavedTuitions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users/bookmarks');
      const items = res.data?.data || (Array.isArray(res.data) ? res.data : []);
      setTuitions(items);
    } catch (err: any) {
      console.error('Failed to load bookmarked tuitions:', err);
      toast.error('Failed to load your saved tuitions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedTuitions();
  }, []);

  const handleRemoveBookmark = async (tuitionId: string, title?: string) => {
    setRemovingId(tuitionId);
    try {
      const res = await api.post(`/users/bookmarks/${tuitionId}`);
      toast.success(res.data?.message || 'Tuition removed from saved bookmarks.');
      setTuitions((prev) => prev.filter((t) => t._id !== tuitionId));
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to remove bookmark.';
      toast.error(message);
    } finally {
      setRemovingId(null);
    }
  };

  const handleBookmarkToggle = (tuitionId: string, isBookmarked: boolean) => {
    if (!isBookmarked) {
      setTuitions((prev) => prev.filter((t) => t._id !== tuitionId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-foreground tracking-tight">Saved Tuitions</h1>
            <Badge variant="outline" className="font-bold text-xs bg-muted/60">
              {tuitions.length} Saved
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Your bookmarked tuition listings for quick access and priority booking.
          </p>
        </div>

        <Link href="/tuitions">
          <Button size="sm" className="font-bold gap-1.5 shadow-sm">
            <Search className="h-4 w-4" />
            Explore More Tuitions
          </Button>
        </Link>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <TuitionCardSkeleton key={i} />
          ))}
        </div>
      ) : tuitions.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tuitions.map((tuition) => (
              <div key={tuition._id} className="relative group/saved flex flex-col h-full">
                <div className="flex-1">
                  <TuitionCard
                    {...tuition}
                    initialBookmarked={true}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                </div>

                {/* Quick Removal Bar */}
                <div className="mt-2 flex items-center justify-between px-2 text-xs text-muted-foreground">
                  <span className="text-[11px] font-medium text-muted-foreground truncate">
                    Saved for quick enrollment
                  </span>
                  <button
                    onClick={() => handleRemoveBookmark(tuition._id, tuition.title)}
                    disabled={removingId === tuition._id}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-destructive hover:text-destructive/80 transition-colors p-1 rounded-md hover:bg-destructive/10"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>{removingId === tuition._id ? 'Removing...' : 'Remove'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <Card className="border-2 border-dashed border-border/80 bg-card/60 p-12 text-center rounded-3xl shadow-sm">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary mx-auto shadow-sm">
              <Bookmark className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-foreground">No saved tuitions yet</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You haven&apos;t bookmarked any tuition batches. When browsing available tuition listings, click the bookmark icon to save them here for quick review and priority booking.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/tuitions">
                <Button className="font-black gap-2 text-xs h-11 px-6 shadow-md shadow-primary/20">
                  <Search className="h-4 w-4" />
                  Explore Tuitions
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
