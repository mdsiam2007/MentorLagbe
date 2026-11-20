import React from 'react';
import { BadgeCheck, HandCoins, Globe2, MessageSquareHeart } from 'lucide-react';

const PILLARS = [
  {
    number: '01',
    category: 'Authenticity',
    title: 'Verified Credentials',
    desc: 'BUET, DMC & DU student ID cards manually checked.',
    icon: BadgeCheck,
    tagColor: 'text-terracotta-500',
    iconBg: 'bg-terracotta-500/20 text-terracotta-500',
    hoverBorder: 'hover:border-terracotta-500/50',
  },
  {
    number: '02',
    category: 'Transparency',
    title: 'Zero Agency Fees',
    desc: '0% middleman cut—100% goes straight to your mentor.',
    icon: HandCoins,
    tagColor: 'text-amberwarm-500',
    iconBg: 'bg-amberwarm-500/20 text-amberwarm-500',
    hoverBorder: 'hover:border-amberwarm-500/50',
  },
  {
    number: '03',
    category: 'Flexibility',
    title: 'Online & Home',
    desc: 'Live Zoom nationwide or in-person Dhaka neighborhoods.',
    icon: Globe2,
    tagColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
    hoverBorder: 'hover:border-emerald-400/50',
  },
  {
    number: '04',
    category: 'Direct Bond',
    title: 'Direct Coordination',
    desc: 'Instant 1-on-1 WhatsApp connect & routine setup.',
    icon: MessageSquareHeart,
    tagColor: 'text-sky-400',
    iconBg: 'bg-sky-500/20 text-sky-400',
    hoverBorder: 'hover:border-sky-400/50',
  },
];

export const TrustPillars: React.FC = () => {
  return (
    <section id="trustPillarsSection" className="py-12 bg-forest-900 text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="trustPillarsTrack" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className={`group p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.11] border border-white/10 ${pillar.hoverBorder} transition-all flex items-start gap-4`}
              >
                <div
                  className={`w-11 h-11 rounded-xl ${pillar.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${pillar.tagColor} block`}>
                    {pillar.number} • {pillar.category}
                  </span>
                  <h3 className="font-bold text-sm text-white mt-0.5">{pillar.title}</h3>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustPillars;
