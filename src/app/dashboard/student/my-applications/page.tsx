'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { TableRowSkeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Trash2, AlertCircle, ExternalLink, Calendar, Search, Star, X, Send } from 'lucide-react';

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Review Modal State
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchApplications = () => {
    setLoading(true);
    api.get('/applications/my-applications')
      .then((res) => {
        if (res.data.success) {
          setApplications(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load applications:', err);
        toast.error('Failed to load your applications.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCancel = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to cancel your application for "${title}"?`)) {
      return;
    }

    setCancellingId(id);
    try {
      const res = await api.delete(`/applications/${id}`);
      if (res.data.success) {
        toast.success(res.data.message || 'Application cancelled successfully.');
        setApplications((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to cancel application.');
    } finally {
      setCancellingId(null);
    }
  };

  const openReviewModal = (app: any) => {
    setSelectedApp(app);
    setRating(5);
    setHoverRating(0);
    setComment('');
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    if (!rating || rating < 1 || rating > 5) {
      toast.error('Please choose a rating between 1 and 5 stars.');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please share your experience in the review comment.');
      return;
    }

    setSubmittingReview(true);
    const targetTuitionId =
      typeof selectedApp.tuitionId === 'object' && selectedApp.tuitionId !== null
        ? selectedApp.tuitionId._id
        : selectedApp.tuitionId;

    try {
      const res = await api.post(`/tuitions/${targetTuitionId}/reviews`, {
        rating,
        comment: comment.trim(),
      });

      if (res.data?.success) {
        toast.success(res.data.message || 'Thank you! Your mentorship review has been submitted.');
        setReviewModalOpen(false);
        fetchApplications();
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to submit review.';
      toast.error(message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="warning">Pending Review</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">My Applications</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track and manage your tuition booking applications.
          </p>
        </div>
        <Link href="/tuitions">
          <Button size="sm" className="font-semibold gap-1.5">
            <Search className="h-4 w-4" />
            Apply for More
          </Button>
        </Link>
      </div>

      <Card className="border border-border/80 shadow-sm bg-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 text-muted-foreground uppercase text-[11px] font-bold border-b border-border/60">
              <tr>
                <th className="py-3.5 px-4">Tuition Title & Subject</th>
                <th className="py-3.5 px-4">Tutor Details</th>
                <th className="py-3.5 px-4">Monthly Fee</th>
                <th className="py-3.5 px-4">Applied Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} columns={6} />)
              ) : applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-foreground max-w-xs">
                      <div className="truncate">{app.tuitionTitle}</div>
                      <span className="text-[10px] text-primary font-bold uppercase">
                        {app.subject}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      <div className="font-medium text-foreground">{app.tutorEmail}</div>
                      <span className="text-[10px]">{app.preferredSchedule}</span>
                    </td>
                    <td className="py-4 px-4 font-bold text-foreground">
                      {formatCurrency(app.monthlyFee)}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {formatDate(app.appliedAt)}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(app.status)}</td>
                    <td className="py-4 px-4 text-right">
                      {app.status === 'pending' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancel(app._id, app.tuitionTitle)}
                          disabled={cancellingId === app._id}
                          className="text-destructive hover:bg-destructive/10 font-semibold gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {cancellingId === app._id ? 'Cancelling...' : 'Cancel'}
                        </Button>
                      ) : app.status === 'accepted' ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => openReviewModal(app)}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold gap-1 text-xs shadow-sm"
                          >
                            <Star className="h-3.5 w-3.5 fill-current" />
                            Rate & Review
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">
                          Locked ({app.status})
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                    <p className="font-semibold text-foreground">No applications found</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      You haven&apos;t applied for any tuition batches yet.
                    </p>
                    <Link href="/tuitions" className="inline-block mt-3">
                      <Button size="sm" variant="outline">
                        Browse Available Tuitions
                      </Button>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* STUDENT RATING & REVIEW MODAL */}
      <AnimatePresence>
        {reviewModalOpen && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg rounded-3xl border-2 border-border bg-card p-6 sm:p-8 shadow-2xl space-y-5 z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setReviewModalOpen(false)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-border/60 bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <Badge variant="warning" className="mb-2 text-[11px] font-bold">
                  Verified Student Feedback
                </Badge>
                <h3 className="text-xl sm:text-2xl font-black text-foreground">
                  Rate Your Mentorship with {selectedApp.tuitionTitle}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Mentor: <strong className="text-foreground">{selectedApp.tutorEmail}</strong> • Subject: <strong className="text-primary">{selectedApp.subject}</strong>
                </p>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-5">
                {/* 5-Star Interactive Selector */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2">
                    Overall Mentorship Rating (1 - 5 Stars) *
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating || rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-none"
                        >
                          <Star
                            className={`h-7 w-7 transition-colors ${
                              isFilled
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted-foreground/30 hover:text-amber-400/60'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-3 text-xs font-bold text-amber-500">
                      {rating === 5 && '5.0 - Excellent'}
                      {rating === 4 && '4.0 - Very Good'}
                      {rating === 3 && '3.0 - Good'}
                      {rating === 2 && '2.0 - Fair'}
                      {rating === 1 && '1.0 - Poor'}
                    </span>
                  </div>
                </div>

                {/* Review Comment Textarea */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Your Review & Experience *
                  </label>
                  <Textarea
                    placeholder="Share your learning experience, tutor's punctuality, and teaching quality..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    required
                    className="rounded-xl text-xs sm:text-sm"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Your review will appear publicly on the tuition listing page to guide other prospective students.
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setReviewModalOpen(false)}
                    disabled={submittingReview}
                    className="text-xs font-bold h-11"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submittingReview}
                    className="font-black gap-2 text-xs h-11 px-5 shadow-lg shadow-amber-500/20 bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
