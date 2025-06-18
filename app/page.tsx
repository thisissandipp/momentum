import { DifferentiatorSection } from '@/components/landing/differentiator-section';
import { SolutionSection } from '@/components/landing/solution-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { LandingBackground } from '@/components/landing/background';
import { HeroSection } from '@/components/landing/hero-section';

export default function HomePage() {
  return (
    <div className="relative isolate pt-14">
      <LandingBackground />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <DifferentiatorSection />
    </div>
  );
}
