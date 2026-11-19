'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TableRowSkeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Users, Shield, UserCheck, AlertCircle } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    api.get('/users/admin/all')
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load users:', err);
        toast.error('Failed to load users list.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const res = await api.patch(`/users/admin/${userId}/role`, { role: newRole });
      if (res.data.success) {
        toast.success(`Role updated to ${newRole}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update user role.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">User Management</h1>
        <p className="text-xs text-muted-foreground mt-1">
          View all registered students, tutors, and administrators. Promote or adjust roles dynamically.
        </p>
      </div>

      <Card className="border border-border/80 shadow-sm bg-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 text-muted-foreground uppercase text-[11px] font-bold border-b border-border/60">
              <tr>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Plan</th>
                <th className="py-3.5 px-4">Current Role</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4 text-right">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} columns={6} />)
              ) : users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-foreground">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={u.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                          alt={u.name}
                          className="h-8 w-8 rounded-full object-cover border border-border"
                        />
                        <span className="font-bold">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{u.email}</td>
                    <td className="py-4 px-4">
                      {u.plan === 'pro' ? (
                        <Badge variant="pro" className="text-[10px]">
                          PRO
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px]">
                          FREE
                        </Badge>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={u.role === 'admin' ? 'destructive' : u.role === 'tutor' ? 'secondary' : 'outline'}
                        className="capitalize font-bold"
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <select
                        value={u.role}
                        disabled={updatingId === u._id}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="h-8 rounded-lg border border-input bg-background px-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <Users className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                    <p className="font-semibold text-foreground">No users found</p>
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
