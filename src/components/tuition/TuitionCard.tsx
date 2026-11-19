'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { MapPin, Calendar, ArrowRight, UserCheck } from 'lucide-react';

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
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group flex flex-col h-full rounded-3xl border-2 border-border/80 bg-card hover:border-primary transition-colors overflow-hidden"
    >
      {/* Banner Image with Flat Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-muted border-b-2 border-border/60">
        <img
          src={bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <Badge
            variant={mode === 'Online' ? 'default' : 'secondary'}
            className="text-[11px] font-black uppercase tracking-wider"
          >
            {mode}
          </Badge>
          <Badge
            variant="outline"
            className="bg-background/95 text-foreground text-[11px] font-bold"
          >
            {subject}
          </Badge>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 justify-between space-y-4">
        <div>
          {/* Class Level & Days */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-primary">
              {classLevel}
            </span>
            <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1 bg-muted/60 px-2.5 py-0.5 rounded-full border border-border/60">
              <Calendar className="h-3 w-3" />
              {daysPerWeek}d / week
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2.5 text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Tutor Info with Flat Avatar */}
          <div className="mt-3.5 flex items-center gap-2.5 text-xs text-muted-foreground">
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary border-2 border-primary/20 flex items-center justify-center font-bold text-xs shrink-0">
              {tutorName.charAt(0)}
            </div>
            <span className="font-bold text-foreground truncate">{tutorName}</span>
          </div>

          {/* Location */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground border-t-2 border-border/40 pt-2.5">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Footer: Price & Flat Uiverse Button */}
        <div className="pt-3 border-t-2 border-border/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">
              Monthly Fee
            </span>
            <span className="text-xl font-black text-foreground">
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
    </motion.div>
  );
};

export default TuitionCard;
