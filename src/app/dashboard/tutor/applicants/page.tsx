'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TableRowSkeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  Users,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Check,
  X,
} from 'lucide-react';

export default function TutorApplicantsPage() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchApplicants = () => {
    setLoading(true);
    api.get('/applications/tutor/applicants')
      .then((res) => {
        if (res.data.success) {
          setApplicants(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load applicants:', err);
        toast.error('Failed to load applicants list.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'accepted' | 'rejected') => {
    setUpdatingId(id);
    try {
      const res = await api.patch(`/applications/tutor/${id}/status`, { status });
      if (res.data.success) {
        toast.success(`Application marked as ${status}.`);
        setApplicants((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setUpdatingId(null);
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
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Manage Student Applicants
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review incoming student bookings for your batches and accept or decline requests.
        </p>
      </div>

      <Card className="border border-border/80 shadow-sm bg-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 text-muted-foreground uppercase text-[11px] font-bold border-b border-border/60">
              <tr>
                <th className="py-3.5 px-4">Student Info</th>
                <th className="py-3.5 px-4">Applied Tuition</th>
                <th className="py-3.5 px-4">Preferred Schedule</th>
                <th className="py-3.5 px-4">Student Note</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <TableRowSkeleton key={i} columns={6} />)
              ) : applicants.length > 0 ? (
                applicants.map((item) => (
                  <tr key={item._id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-foreground">
                      <div className="text-sm font-bold">{item.studentName}</div>
                      <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5">
                        <Mail className="h-3 w-3" />
                        <span>{item.studentEmail}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5">
                        <Phone className="h-3 w-3" />
                        <span>{item.studentPhone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <div className="font-semibold text-foreground truncate">{item.tuitionTitle}</div>
                      <span className="text-[10px] text-primary font-bold uppercase">{item.subject}</span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      <div className="flex items-center gap-1 text-foreground font-medium">
                        <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{item.preferredSchedule}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-0.5 block">
                        Applied {formatDate(item.appliedAt)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground max-w-xs">
                      <p className="line-clamp-2 italic">
                        {item.studentNote ? `"${item.studentNote}"` : 'No custom note.'}
                      </p>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(item.status)}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(item._id, 'accepted')}
                          disabled={updatingId === item._id || item.status === 'accepted'}
                          className="text-emerald-700 hover:bg-emerald-500/15 border-emerald-500/30 gap-1 h-8 px-2.5 font-bold"
                          title="Accept Applicant"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(item._id, 'rejected')}
                          disabled={updatingId === item._id || item.status === 'rejected'}
                          className="text-destructive hover:bg-destructive/15 border-destructive/30 gap-1 h-8 px-2.5 font-bold"
                          title="Reject Applicant"
                        >
                          <X className="h-3.5 w-3.5 text-destructive" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <Users className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                    <p className="font-semibold text-foreground">No student applications yet</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      When students apply for your tuition postings, they will appear here.
                    </p>
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
