'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TableRowSkeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Check, X, CheckSquare, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchTuitions = () => {
    setLoading(true);
    api.get('/tuitions/admin/all')
      .then((res) => {
        if (res.data.success) {
          setTuitions(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load tuitions:', err);
        toast.error('Failed to load tuitions list.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTuitions();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
    setActionId(id);
    try {
      const res = await api.patch(`/tuitions/admin/${id}/status`, { status });
      if (res.data.success) {
        toast.success(`Tuition post marked as ${status}.`);
        setTuitions((prev) =>
          prev.map((t) => (t._id === id ? { ...t, approvalStatus: status } : t))
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update approval status.');
    } finally {
      setActionId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Tuition Listing Moderation
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review, approve, or reject tutor submissions before they go live on the public Browse page.
        </p>
      </div>

      <Card className="border border-border/80 shadow-sm bg-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 text-muted-foreground uppercase text-[11px] font-bold border-b border-border/60">
              <tr>
                <th className="py-3.5 px-4">Tuition Title & Subject</th>
                <th className="py-3.5 px-4">Tutor Details</th>
                <th className="py-3.5 px-4">Fee / Month</th>
                <th className="py-3.5 px-4">Schedule</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} columns={6} />)
              ) : tuitions.length > 0 ? (
                tuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-foreground max-w-xs">
                      <div className="truncate font-bold">{t.title}</div>
                      <span className="text-[10px] text-primary font-bold uppercase">{t.subject}</span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      <div className="font-medium text-foreground">{t.tutorName}</div>
                      <span className="text-[10px]">{t.tutorEmail}</span>
                    </td>
                    <td className="py-4 px-4 font-bold text-foreground">
                      {formatCurrency(t.monthlyFee)}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      <div>{t.daysPerWeek} Days / Week</div>
                      <span className="text-[10px] text-foreground font-medium">{t.mode}</span>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(t.approvalStatus)}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(t._id, 'approved')}
                          disabled={actionId === t._id || t.approvalStatus === 'approved'}
                          className="text-emerald-700 hover:bg-emerald-500/15 border-emerald-500/30 gap-1 h-8 px-2.5 font-bold"
                          title="Approve Listing"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(t._id, 'rejected')}
                          disabled={actionId === t._id || t.approvalStatus === 'rejected'}
                          className="text-destructive hover:bg-destructive/15 border-destructive/30 gap-1 h-8 px-2.5 font-bold"
                          title="Reject Listing"
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
                    <CheckSquare className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                    <p className="font-semibold text-foreground">No tuitions to display</p>
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
