'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import TuitionCard from '@/components/tuition/TuitionCard';
import { TuitionCardSkeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

function BrowseTuitionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tuitions, setTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || 'All');
  const [classLevel, setClassLevel] = useState(searchParams.get('classLevel') || 'All');
  const [mode, setMode] = useState(searchParams.get('mode') || 'All');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });

  const subjectOptions = [
    'All',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Programming',
    'English',
    'ICT',
    'Accounting',
    'General Science',
    'Bangla',
  ];

  const classLevelOptions = [
    'All',
    'Class 9-10 (SSC)',
    'Class 11-12 (HSC)',
    'Admission & HSC',
    'O/A Level (Cambridge/Edexcel)',
    'All Levels',
    'Class 6-10',
    'Undergraduate / Adults',
  ];

  const modeOptions = ['All', 'Online', 'Offline'];

  const fetchTuitions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (subject && subject !== 'All') params.set('subject', subject);
      if (classLevel && classLevel !== 'All') params.set('classLevel', classLevel);
      if (mode && mode !== 'All') params.set('mode', mode);
      params.set('page', page.toString());
      params.set('limit', '9');

      const res = await api.get(`/tuitions?${params.toString()}`);
      if (res.data.success) {
        setTuitions(res.data.data || []);
        if (res.data.pagination) {
          setPagination(res.data.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to fetch tuitions:', error);
    } finally {
      setLoading(false);
    }
  }, [search, subject, classLevel, mode, page]);

  useEffect(() => {
    fetchTuitions();
  }, [fetchTuitions]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTuitions();
  };

  const handleReset = () => {
    setSearch('');
    setSubject('All');
    setClassLevel('All');
    setMode('All');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <Badge variant="secondary">Tuition Marketplace</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Browse Approved Tuitions
          </h1>
          <p className="text-sm text-muted-foreground">
            Find the perfect academic batch or private mentor with our server-side real-time filter.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-sm mb-10 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by tuition title, subject or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" className="font-semibold gap-1.5 shrink-0">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="gap-1.5 shrink-0"
              title="Reset Filters"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </form>

          {/* Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
            {/* Subject Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setPage(1);
                }}
                className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {subjectOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === 'All' ? 'All Subjects' : opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Level Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                Class / Target Level
              </label>
              <select
                value={classLevel}
                onChange={(e) => {
                  setClassLevel(e.target.value);
                  setPage(1);
                }}
                className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {classLevelOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === 'All' ? 'All Class Levels' : opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                Tuition Mode
              </label>
              <select
                value={mode}
                onChange={(e) => {
                  setMode(e.target.value);
                  setPage(1);
                }}
                className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {modeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === 'All' ? 'All Modes (Online & Offline)' : opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-xs text-muted-foreground">
          <span>
            Showing <strong className="text-foreground">{tuitions.length}</strong> of{' '}
            <strong className="text-foreground">{pagination.total}</strong> approved listings
          </span>
          {(subject !== 'All' || classLevel !== 'All' || mode !== 'All' || search) && (
            <span className="text-primary font-medium">Filters Applied</span>
          )}
        </div>

        {/* Tuitions Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <TuitionCardSkeleton key={i} />
            ))}
          </div>
        ) : tuitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {tuitions.map((item) => (
              <div key={item._id} className="h-full">
                <TuitionCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-16 text-center space-y-3">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <h3 className="text-lg font-bold text-foreground">No matching tuitions found</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
              We couldn&apos;t find any approved tuition listing matching your current filters. Try resetting
              or searching for different keywords.
            </p>
            <Button variant="outline" size="sm" onClick={handleReset} className="mt-2">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Server-Side Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="gap-1 font-semibold"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: pagination.totalPages }).map((_, idx) => {
                const pageNumber = idx + 1;
                const isCurrent = pageNumber === page;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`h-9 w-9 rounded-xl text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              className="gap-1 font-semibold"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowseTuitionsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <TuitionCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <BrowseTuitionsContent />
    </Suspense>
  );
}
