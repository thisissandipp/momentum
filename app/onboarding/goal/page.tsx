'use client';

import { useOnboardingStore } from '@/providers/onboarding-store-provider';
import { ChevronRightIcon, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { domains } from '@/lib/domains';

export default function OnboardingGoalPage() {
  const router = useRouter();
  const { architect, setDomain } = useOnboardingStore((state) => state);

  return (
    <div className="mx-auto max-w-3xl px-8 py-8 sm:py-16 lg:py-24">
      <h2 className="text-xl font-bold tracking-tight text-balance sm:text-2xl">
        Welcome to the Intelligent Habit Architect, Boss!
      </h2>
      <p className="text-muted-foreground mt-4">
        Momentum helps you build habits that stick. To get started, we&apos;ll ask a few questions
        to understand your goal and craft a personalized plan just for you.
      </p>
      <p className="text-muted-foreground mt-4">
        This isn&apos;t just a tracker, it&apos;s your personal growth companion.
      </p>
      <div className="mt-18">
        <h3 className="text-lg font-semibold tracking-tight text-balance sm:text-xl">
          Which area of your life would you like to focus on first?{' '}
          <span className="text-destructive">*</span>
        </h3>
        <div className="mt-10 flex flex-wrap gap-3.5">
          {domains.map((domain) => (
            <Button
              key={domain.name}
              onClick={() => setDomain(domain)}
              variant={architect.domain === domain ? 'default' : 'outline'}
              className="hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
            >
              {domain.name}
            </Button>
          ))}
        </div>
        {architect.domain && (
          <p className="bg-muted mt-10 flex gap-x-2.5 rounded-md px-3.5 py-2.5 text-sm">
            <InfoIcon size="18" /> Focus: {architect.domain.description}
          </p>
        )}
        <div className="mt-10 flex justify-end">
          <Button
            disabled={architect.domain === null}
            onClick={() => router.push('/onboarding/context')}
          >
            Continue <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
