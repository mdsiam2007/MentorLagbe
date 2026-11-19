'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const TrustShield: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 3D Trust Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="overflow-hidden rounded-3xl border-4 border-foreground/15 bg-card shadow-[0_8px_0_0_hsl(var(--border))]">
                <img
                  src="/images/trust-safety.jpg"
                  alt="MentorLagbe Trust and Safety Shield"
                  className="h-[360px] w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Information */}
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="success">
              <ShieldCheck className="h-4 w-4 mr-1" />
              Trust & Verification Guarantee
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Authentic Mentors You Can Truly Rely On
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We believe academic authenticity and student safety should never be compromised. Every
              tutor listing undergoes strict administrative verification before appearing live on
              MentorLagbe.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Institutional Credential Verification:</span> We
                  check student ID cards and university affiliations (BUET, DMC, DU, etc.) before
                  issuing the verified badge.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Transparent Direct Pricing:</span> No hidden fee
                  markups or agency cuts. You pay exactly the fee set in the listing directly to the tutor.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">256-bit Encrypted Stripe Upgrades:</span> Secure,
                  certified payments for Pro plan subscriptions with instant activation.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/how-it-works">
                <Button variant="outline" size="sm" className="gap-2">
                  Learn More About Trust Guidelines
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustShield;
