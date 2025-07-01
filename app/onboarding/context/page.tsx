'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useOnboardingStore } from '@/providers/onboarding-store-provider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OnboardingContextPage() {
  const router = useRouter();
  const { architect, setOneYearGoal, setCurrentState } = useOnboardingStore((state) => state);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (!architect.domain) {
      router.replace('/onboarding/goal');
    }
  }, [architect.domain, router]);

  useEffect(() => {
    if (architect.oneYearGoal.length >= 15 && architect.currentState.length >= 15) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [architect.currentState.length, architect.oneYearGoal.length]);

  return (
    <div className="mx-auto max-w-3xl px-8 py-8 sm:py-16 lg:py-24">
      <h2 className="text-xl font-bold tracking-tight text-balance sm:text-2xl">
        Now, let&apos;s map your unique journey.
      </h2>
      <p className="text-muted-foreground mt-4">
        To architect your habits in{' '}
        <Tooltip>
          <TooltipTrigger className="text-primary cursor-pointer font-semibold underline underline-offset-4">
            {architect.domain?.name}
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{architect.domain?.description}</p>
          </TooltipContent>
        </Tooltip>{' '}
        effectively, we need your vision and your starting line.
      </p>
      <div className="mt-14">
        <h3 className="text-lg font-semibold tracking-tight text-balance sm:text-xl">
          First, what&apos;s your Big Vision for the next year in {architect.domain?.name}?{' '}
          <span className="text-destructive">*</span>
        </h3>
        <p className="text-muted-foreground mt-4">
          Imagine yourself one year from now, thriving in {architect.domain?.name}. What specific
          achievement marks your success?
        </p>
        <Textarea
          className="mt-8 h-30"
          onChange={(e) => setOneYearGoal(e.target.value)}
          placeholder="Be specific! The more detail, the better."
        />
        <p className="text-muted-foreground mt-1.5 text-right text-xs">
          Write in 15-100 characters
        </p>
      </div>
      <div className="mt-14">
        <h3 className="text-lg font-semibold tracking-tight text-balance sm:text-xl">
          Next, tell us: Where are you starting from on this journey?{' '}
          <span className="text-destructive">*</span>
        </h3>
        <p className="text-muted-foreground mt-4">
          What&apos;s your current reality in [Selected Domain]? What are you doing now (or not
          doing)?
        </p>
        <Textarea
          className="mt-8 h-30"
          onChange={(e) => setCurrentState(e.target.value)}
          placeholder="Be honest and detailed. This is your foundation."
        />
        <p className="text-muted-foreground mt-1.5 text-right text-xs">
          Write in 15-100 characters
        </p>
      </div>
      <div className="mt-10 flex justify-end">
        <Button disabled={buttonDisabled} onClick={() => router.push('/onboarding/suggestions')}>
          Suggest Habits <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
