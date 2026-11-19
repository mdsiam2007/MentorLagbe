'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export interface TuitionCardProps {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: 'Online' | 'Offline';
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;
  tutorName: string;
  tutorId?: string;
  tutorEmail?: string;
}

export const TuitionCard: React.FC<TuitionCardProps> = ({
  _id,
  title,
  subject,
  classLevel,
  mode,
  location,
  monthlyFee,
  daysPerWeek,
  bannerImage,
  tutorName,
  tutorId,
}) => {
  const tutorHref = tutorId
    ? `/tutors/${tutorId}`
    : `/tutors?search=${encodeURIComponent(tutorName || '')}`;

  return (
    <Tilt3DCard
      tiltMaxAngle={8}
      scaleOnHover={1.025}
      glareOpacity={0.12}
      className="h-full rounded-3xl"
    >
      <div className="group flex flex-col h-full rounded-3xl border-2 border-border/80 bg-card hover:border-primary/80 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-primary/5">
        {/* Banner Image with 3D Pop Badges */}
        <div className="relative h-48 w-full overflow-hidden bg-muted border-b-2 border-border/60">
          <img
            src={
              bannerImage ||
              'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
            }
            alt={title}
            className="h-full w-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div
            className="absolute top-3 left-3 flex items-center gap-2 z-10 [transform:translateZ(20px)]"
          >
            <Badge
              variant={mode === 'Online' ? 'default' : 'secondary'}
              className="text-[11px] font-black uppercase tracking-wider shadow-md"
            >
              {mode}
            </Badge>
            <Badge
              variant="outline"
              className="bg-background/95 text-foreground text-[11px] font-bold shadow-sm backdrop-blur-sm"
            >
              {subject}
            </Badge>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-5 justify-between space-y-4">
          <div>
            {/* Class Level & Days with 3D Depth */}
            <div className="flex items-center justify-between [transform:translateZ(12px)]">
              <span className="text-[11px] font-black uppercase tracking-wider text-primary">
                {classLevel}
              </span>
              <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1 bg-muted/60 px-2.5 py-0.5 rounded-full border border-border/60">
                <Calendar className="h-3 w-3" />
                {daysPerWeek}d / week
              </span>
            </div>

            {/* Title with 3D Depth */}
            <Link href={`/tuitions/${_id}`} className="block">
              <h3 className="mt-2.5 text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors [transform:translateZ(16px)]">
                {title}
              </h3>
            </Link>

            {/* Tutor Info: Clickable Profile Link with Hover Polish */}
            <div className="mt-3.5 [transform:translateZ(18px)]">
              <Link
                href={tutorHref}
                className="inline-flex items-center gap-2.5 text-xs text-muted-foreground hover:text-primary transition-colors group/tutor"
                title={`View profile of ${tutorName}`}
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary border-2 border-primary/20 group-hover/tutor:border-primary group-hover/tutor:scale-110 flex items-center justify-center font-bold text-xs shrink-0 transition-all duration-200">
                  {tutorName ? tutorName.charAt(0).toUpperCase() : 'T'}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground group-hover/tutor:text-primary transition-colors truncate underline-offset-4 group-hover/tutor:underline">
                    {tutorName}
                  </span>
                  <span className="text-[10px] text-muted-foreground">View Mentor Profile →</span>
                </div>
              </Link>
            </div>

            {/* Location */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground border-t-2 border-border/40 pt-2.5">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Footer: Price & Uiverse 3D Button */}
          <div className="pt-3 border-t-2 border-border/60 flex items-center justify-between [transform:translateZ(20px)]">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                Monthly Fee
              </span>
              <span className="text-xl font-black text-foreground tracking-tight">
                {formatCurrency(monthlyFee)}
              </span>
            </div>

            <Link href={`/tuitions/${_id}`}>
              <Button
                size="sm"
                variant="default"
                className="gap-1.5 font-bold text-xs"
              >
                Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Tilt3DCard>
  );
};

export default TuitionCard;
