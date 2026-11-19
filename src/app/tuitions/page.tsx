'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import TuitionCard from '@/components/tuition/TuitionCard';
import { TuitionCardSkeleton } from '@/components/ui/skeleton';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Pagination,
} from '@heroui/react';
import {
  Search,
  RotateCcw,
  BookOpen,
  Filter,
  Sparkles,
} from 'lucide-react';

function BrowseTuitionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tuitions, setTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // States synchronized with searchParams
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

  // Sync state when searchParams changes (e.g. from Hero search widget or link)
  useEffect(() => {
    const qSearch = searchParams.get('search');
    const qSubject = searchParams.get('subject');
    const qClass = searchParams.get('classLevel');
    const qMode = searchParams.get('mode');
    const qPage = searchParams.get('page');

    if (qSearch !== null) setSearch(qSearch);
    if (qSubject !== null) setSubject(qSubject);
    if (qClass !== null) setClassLevel(qClass);
    if (qMode !== null) setMode(qMode);
    if (qPage !== null) setPage(parseInt(qPage, 10));
  }, [searchParams]);

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
    router.push('/tuitions');
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <Chip color="primary" variant="flat" size="sm" className="font-bold text-xs">
            <Sparkles className="h-3.5 w-3.5 mr-1" /> Tuition Marketplace
          </Chip>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Browse Approved Tuitions
          </h1>
          <p className="text-sm text-muted-foreground">
            Find the perfect academic batch or private mentor with our real-time multi-criteria filter.
          </p>
        </div>

        {/* Filter Bar with HeroUI Card */}
        <Card shadow="sm" className="rounded-3xl border border-border/80 bg-card p-4 sm:p-6 mb-10">
          <CardBody className="p-0 space-y-4">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by tuition title, subject or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="submit"
                  color="primary"
                  radius="full"
                  className="h-12 px-6 font-bold text-xs gap-1.5 shadow-md shadow-primary/20"
                  startContent={<Search className="h-4 w-4" />}
                >
                  Search
                </Button>
                <Button
                  type="button"
                  variant="bordered"
                  radius="full"
                  onClick={handleReset}
                  className="h-12 px-4 gap-1.5 font-bold text-xs border-border text-foreground"
                  startContent={<RotateCcw className="h-4 w-4" />}
                >
                  Reset
                </Button>
              </div>
            </form>

            {/* Dropdown Filters (Exactly identical to Hero Section) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border/50">
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
                  className="w-full h-11 rounded-xl border border-border bg-background px-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full h-11 rounded-xl border border-border bg-background px-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                  Teaching Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-11 rounded-xl border border-border bg-background px-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {modeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt === 'All' ? 'All Modes (Online & Offline)' : opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Results Metadata */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
            Found <span className="font-bold text-foreground">{pagination.total}</span> Approved Tuitions
          </p>
          {(subject !== 'All' || classLevel !== 'All' || mode !== 'All' || search) && (
            <div className="flex flex-wrap items-center gap-1.5">
              {search && (
                <Chip size="sm" variant="flat" onClose={() => setSearch('')}>
                  &ldquo;{search}&rdquo;
                </Chip>
              )}
              {subject !== 'All' && (
                <Chip size="sm" variant="flat" color="primary" onClose={() => setSubject('All')}>
                  {subject}
                </Chip>
              )}
              {classLevel !== 'All' && (
                <Chip size="sm" variant="flat" color="secondary" onClose={() => setClassLevel('All')}>
                  {classLevel}
                </Chip>
              )}
              {mode !== 'All' && (
                <Chip size="sm" variant="flat" color="warning" onClose={() => setMode('All')}>
                  {mode}
                </Chip>
              )}
            </div>
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
            {tuitions.map((tuition) => (
              <div key={tuition._id} className="h-full">
                <TuitionCard {...tuition} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="rounded-3xl border border-border bg-card p-12 text-center">
            <CardBody className="items-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
              <h3 className="text-lg font-bold text-foreground">No Tuitions Found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                No active tuition batches match your current filter parameters. Try adjusting your subject, level, or clearing filters.
              </p>
              <Button
                variant="bordered"
                radius="full"
                size="sm"
                onClick={handleReset}
                className="mt-4 font-bold border-border"
              >
                Clear All Filters
              </Button>
            </CardBody>
          </Card>
        )}

        {/* Server-Side Pagination with HeroUI */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              isCompact
              showControls
              total={pagination.totalPages}
              page={page}
              onChange={(newPage) => setPage(newPage)}
              color="primary"
              radius="full"
              className="font-bold"
            />
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
