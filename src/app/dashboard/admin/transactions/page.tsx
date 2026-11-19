'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TableRowSkeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { CreditCard, DollarSign, CheckCircle2 } from 'lucide-react';

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/payments/admin/transactions')
      .then((res) => {
        if (res.data.success) {
          setTransactions(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load transactions:', err);
        toast.error('Failed to load transaction records.');
      })
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = transactions.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            Stripe Transaction Ledger
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Complete audit trail of all Pro subscription upgrades recorded via Stripe.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-right">
          <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block">
            Total Settled Revenue
          </span>
          <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">
            ${totalRevenue} USD
          </span>
        </div>
      </div>

      <Card className="border border-border/80 shadow-sm bg-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 text-muted-foreground uppercase text-[11px] font-bold border-b border-border/60">
              <tr>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Plan Name</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Paid Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <TableRowSkeleton key={i} columns={7} />)
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-foreground">
                      <div className="font-bold">{tx.userName}</div>
                      <span className="text-[10px] text-muted-foreground">{tx.userEmail}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="capitalize text-[10px]">
                        {tx.userRole}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 font-medium text-foreground">{tx.planName}</td>
                    <td className="py-4 px-4 font-black text-emerald-600">
                      ${tx.amount} {tx.currency}
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-muted-foreground max-w-xs truncate">
                      {tx.transactionId}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="success" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Paid
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right text-muted-foreground">
                      {formatDate(tx.paidAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    <CreditCard className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                    <p className="font-semibold text-foreground">No transactions found</p>
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
