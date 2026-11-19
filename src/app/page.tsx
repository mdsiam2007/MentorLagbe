import React from 'react';
import {
  HeroSection,
  FeaturedTuitions,
  BenefitsTabs,
  SubjectsStats,
  HowItWorksRoadmap,
  TrustShield,
  PricingComparison,
  Testimonials,
  FaqAccordion,
  DualCtaBanner,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with headline reveal, search widget, floating badge & trust strip */}
      <HeroSection />

      {/* 2. Dynamic featured tuitions with skeletons, bookmark & rating pill */}
      <FeaturedTuitions />

      {/* 3. Dual benefits tabs with spring transitions */}
      <BenefitsTabs />

      {/* 4. Top academic subjects & animated numeric counters */}
      <SubjectsStats />

      {/* 5. 4-step connected visual workflow roadmap */}
      <HowItWorksRoadmap />

      {/* 6. Trust, safety & credential verification guarantee */}
      <TrustShield />

      {/* 7. Free vs Pro subscription comparison cards */}
      <PricingComparison />

      {/* 8. Authentic student and mentor feedback testimonials */}
      <Testimonials />

      {/* 9. Animated collapsible FAQ accordion */}
      <FaqAccordion />

      {/* 10. Dual split call-to-action banner */}
      <DualCtaBanner />
    </div>
  );
}
