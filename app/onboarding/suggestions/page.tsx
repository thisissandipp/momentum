'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useOnboardingStore } from '@/providers/onboarding-store-provider';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AlertCircleIcon, Loader2, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Habit } from '@/types';
import axios from 'axios';

export default function SuggestionsPage() {
  const router = useRouter();
  const { architect } = useOnboardingStore((state) => state);

  const [habits, setHabits] = useState<Habit[]>([]);
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'failed'>('initial');

  useEffect(() => {
    if (!architect.domain) {
      router.replace('/onboarding/goal');
    }
    if (architect.oneYearGoal.length < 1 || architect.currentState.length < 1) {
      router.replace('/onboarding/context');
    }
  }, [architect.currentState.length, architect.domain, architect.oneYearGoal.length, router]);

  useEffect(() => {
    const generateHabitSuggestions = async (
      domain: string,
      oneYearGoal: string,
      currentState: string,
    ) => {
      const url = '/api/habit-architect';
      setStatus('loading');
      try {
        const response = await axios.post(url, { domain, oneYearGoal, currentState });
        setStatus('success');
        setHabits(response.data.habits satisfies Habit[]);
      } catch (error) {
        console.error('Error generating habit suggestions', error);
        setStatus('failed');
      }
    };

    const { domain, oneYearGoal, currentState } = architect;
    if (domain && oneYearGoal.length > 0 && currentState.length > 0) {
      generateHabitSuggestions(domain.name, oneYearGoal, currentState);
    }
  }, [architect]);

  return (
    <div className="px-8 py-8 sm:py-16 lg:py-24">
      {(status === 'initial' || status === 'loading') && (
        <div className="mx-auto max-w-3xl">
          <h2 className="flex animate-pulse flex-row items-center gap-x-3.5 text-xl font-bold tracking-tight text-balance sm:text-2xl">
            <Loader2 className="animate-spin" /> Momentum is Crafting Your Personalized Plan
          </h2>
        </div>
      )}
      {status === 'failed' && (
        <div className="mx-auto max-w-3xl">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>There was a problem in processing your request.</AlertTitle>
            <AlertDescription>
              <p>
                Please try again from the onboarding beginning -{' '}
                <span
                  onClick={() => router.replace('/onboarding/goal')}
                  className="cursor-pointer underline underline-offset-4"
                >
                  Click here
                </span>
              </p>
              <p>If this error persists, please try after some time, or add a Feedback.</p>
            </AlertDescription>
          </Alert>
        </div>
      )}
      {status === 'success' && (
        <>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold tracking-tight text-balance sm:text-2xl">
              Your first Momentum habits are ready!
            </h2>
            <p className="text-muted-foreground mt-4">
              These micro-habits are crafted just for you, designed to be easy wins toward your
              one-year goal. Review them, adjust as needed, and add the ones that resonate most to
              your plan.
            </p>
          </div>

          <div className="mx-auto max-w-3xl md:max-w-4xl lg:max-w-5xl">
            <div className="mt-18 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <Card key={habit.habit}>
                  <CardContent>
                    <div className="flex flex-wrap gap-2.5 pb-3.5">
                      <Badge variant="secondary">{habit.category}</Badge>
                      {habit.fallback && <Badge variant="outline">has a fallback</Badge>}
                    </div>
                    {habit.habit}
                  </CardContent>
                  <CardFooter className="mt-auto flex flex-row justify-end gap-x-3.5">
                    <Button size="icon" variant="outline">
                      <XIcon />
                    </Button>
                    <Button>Review & Add</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
