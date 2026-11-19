'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TableRowSkeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Trash2, AlertCircle, ExternalLink, Calendar, Search } from 'lucide-react';

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

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
    </div>
  );
}
