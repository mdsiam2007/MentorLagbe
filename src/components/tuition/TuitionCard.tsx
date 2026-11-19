'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardBody, CardFooter, Chip, Button, Avatar } from '@heroui/react';
import { formatCurrency } from '@/lib/utils';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

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
    <Card
      isPressable={false}
      shadow="sm"
      className="group flex flex-col h-full border border-border/80 bg-card hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden"
    >
      {/* Banner Image with HeroUI Chips */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <Chip
            size="sm"
            color={mode === 'Online' ? 'primary' : 'secondary'}
            variant="solid"
            className="font-bold text-[11px] shadow-md backdrop-blur-md"
          >
            {mode}
          </Chip>
          <Chip
            size="sm"
            variant="flat"
            className="bg-background/90 text-foreground font-semibold text-[11px] backdrop-blur-md"
          >
            {subject}
          </Chip>
        </div>
      </div>

      {/* Card Body */}
      <CardBody className="flex flex-col flex-1 p-5 justify-between">
        <div>
          {/* Class Level & Days */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              {classLevel}
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {daysPerWeek}d / wk
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2.5 text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Tutor Info with HeroUI Avatar */}
          <div className="mt-3.5 flex items-center gap-2.5 text-xs text-muted-foreground">
            <Avatar
              name={tutorName}
              size="sm"
              className="w-6 h-6 text-[10px] bg-primary/10 text-primary font-bold border border-primary/20"
            />
            <span className="font-semibold text-foreground truncate">{tutorName}</span>
          </div>

          {/* Location */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border/40 pt-2.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Footer: Price & CTA with HeroUI Button */}
        <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
              Monthly Fee
            </span>
            <span className="text-lg font-black text-foreground">
              {formatCurrency(monthlyFee)}
            </span>
          </div>

          <Link href={`/tuitions/${_id}`}>
            <Button
              size="sm"
              color="primary"
              variant="solid"
              radius="full"
              className="font-bold text-xs gap-1 shadow-md shadow-primary/20"
              endContent={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Details
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default TuitionCard;
