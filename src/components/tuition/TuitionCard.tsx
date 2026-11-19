import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { MapPin, Calendar, UserCheck, ArrowRight } from 'lucide-react';

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
    <Card className="group flex flex-col h-full overflow-hidden border border-border/80 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Banner Image with Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge
            variant={mode === 'Online' ? 'default' : 'secondary'}
            className="shadow-md backdrop-blur-md font-semibold"
          >
            {mode}
          </Badge>
          <Badge variant="outline" className="bg-background/90 text-foreground font-medium shadow-sm">
            {subject}
          </Badge>
        </div>
      </div>

      {/* Card Content (equal height distribution) */}
      <div className="flex flex-col flex-1 p-5 justify-between">
        <div>
          {/* Class Level Badge */}
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {classLevel}
          </span>

          {/* Title */}
          <h3 className="mt-1 text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Tutor Info */}
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <UserCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="font-medium text-foreground truncate">{tutorName}</span>
          </div>

          {/* Location & Schedule */}
          <div className="mt-2.5 space-y-1 text-xs text-muted-foreground border-t border-border/50 pt-2.5">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span>{daysPerWeek} Days / Week</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & CTA */}
        <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-muted-foreground uppercase font-medium block">
              Monthly Fee
            </span>
            <span className="text-lg font-black text-foreground">
              {formatCurrency(monthlyFee)}
            </span>
          </div>

          <Link href={`/tuitions/${_id}`}>
            <Button size="sm" className="font-semibold gap-1 group-hover:bg-primary-hover">
              View Details
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default TuitionCard;
