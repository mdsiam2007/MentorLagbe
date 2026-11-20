'use client';

import React from 'react';
import { useGsapScroll } from '@/hooks/useGsapScroll';
import {
  HeroSection,
  KineticRibbon,
  TrustPillars,
  FeaturedTuitions,
  ComparisonSection,
  WhyChooseSection,
  SubjectsPhysicsSection,
  HowItWorksRoadmap,
  TrustShield,
  PricingComparison,
  Testimonials,
  FaqAccordion,
  DualCtaBanner,
  BatchApplyModal,
} from '@/components/home';

export default function HomePage() {
  const containerRef = useGsapScroll();

  return (
    <main
      ref={containerRef}
      className="flex flex-col min-h-screen bg-cream dark:bg-[#081612] text-forest-900 dark:text-[#F5F2EB] selection:bg-terracotta-500 selection:text-white"
    >
      {/* 1. Split Hero & 30-Message Live WhatsApp Preview */}
      <HeroSection />

      {/* 2. Kinetic Marquee Ribbon */}
      <KineticRibbon />

      {/* 3. Trust & Bonding Pillars Strip */}
      <TrustPillars />

      {/* 4. Featured Batches with Category Filters & Direct Apply Modal */}
      <FeaturedTuitions />

      {/* 5. The Old Way vs. The MentorLagbe Bond */}
      <ComparisonSection />

      {/* 6. Why MentorLagbe Feels Different */}
      <WhyChooseSection />

      {/* 7. Top Subjects & Interactive 2D Physics Playground */}
      <SubjectsPhysicsSection />

      {/* 8. How Your Learning Journey Begins (4 Steps + Progress Track) */}
      <HowItWorksRoadmap />

      {/* 9. Trust & Safety Guarantee Split */}
      <TrustShield />

      {/* 10. Start Free, Upgrade Once (Tutor vs Student Pricing) */}
      <PricingComparison />

      {/* 11. Stories from Students, Parents & Mentors */}
      <Testimonials />

      {/* 12. Frequently Asked Questions Accordion */}
      <FaqAccordion />

      {/* 13. Dual Call-to-Action Banner */}
      <DualCtaBanner />

      {/* Global Batch Application Modal */}
      <BatchApplyModal />
    </main>
  );
}
