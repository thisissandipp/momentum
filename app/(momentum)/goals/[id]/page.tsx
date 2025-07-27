'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { WhyImportantSheet } from '@/components/planner/why-important-sheet';
import { BlocksIcon, CheckCircle2Icon, PlusIcon } from 'lucide-react';
import { useGoalStore } from '@/providers/goal-store-provider';
import { formatDateToString } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Goal } from '@/db/types';
import axios from 'axios';

export default function GoalDetailsPage() {
  const { goals } = useGoalStore((store) => store);
  const { id } = useParams();

  const [goal, setGoal] = useState<Goal | null>(null);
  const [state, setState] = useState<'initial' | 'loading' | 'success' | 'failed'>('initial');

  useEffect(() => {
    setState('loading');
    const fetchGoalById = async () => {
      try {
        const response = await axios.get(`/api/goals/${id}`);
        setGoal(response.data.goal);
        setState('success');
      } catch (e) {
        console.error('Error fetching goal', e);
        setState('failed');
      }
    };

    const goalIndex = goals.findIndex((goal) => goal.id === id);
    if (goalIndex !== -1) {
      setGoal(goals[goalIndex]);
      setState('success');
    } else {
      fetchGoalById();
    }
  }, [goals, id]);

  if (state === 'initial' || state === 'loading') {
    return (
      <div className="mx-8">
        <div className="mx-auto mt-10 max-w-3xl">Loading...</div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="mx-8">
        <div className="mx-auto mt-10 max-w-3xl">The goal you are searching is not here!</div>
      </div>
    );
  }

  const checkpoints = [
    'Phase 1: Build Foundational Strength',
    'Phase 2: Focused Muscle Hypertrophy',
    'Phase 3: Dial-in Nutrition & Body Composition',
    'Phase 4: Refine Aesthetics & Address Weaknesses',
    'Phase 5: Achieve Peak Physique & Sustain',
  ];

  return (
    <div className="mx-8">
      <div className="mx-auto mt-10 max-w-3xl space-y-4.5">
        <div className="flex flex-row gap-2.5">
          <Badge variant="secondary">
            {goal.emoji} {goal.domain}
          </Badge>
          {goal.targetDate && (
            <Badge variant="outline">{formatDateToString(goal.targetDate)}</Badge>
          )}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">{goal.title}</h1>
        <p className="text-muted-foreground mt-[-12px] text-sm">
          Set a clear path towards your goal with actionable steps and checkpoints.
        </p>
        <Accordion type="single" collapsible className="mt-10 w-full">
          <AccordionItem value="whyReason">
            <AccordionTrigger>Read this when you feel like giving up</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>Why is this goal so important to you?</p>
              <p>{goal.whyReason}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="currentState">
            <AccordionTrigger>Read this when you feel you are not doing enough</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>Where were you when you started the goal?</p>
              <p>{goal.currentState}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-10 flex flex-row items-center justify-between">
          <p className="text-muted-foreground flex flex-row items-center gap-x-1.5 text-sm">
            <BlocksIcon className="h-4 w-4" /> Checkpoints and Tasks
          </p>
          <WhyImportantSheet />
        </div>
        <div>
          <Button
            variant="secondary"
            size="sm"
            className="text-primary bg-primary/20 hover:bg-primary/20 hover:text-primary my-2.5 font-semibold"
          >
            <PlusIcon /> New Checkpoint
          </Button>
          <Accordion type="single" collapsible className="w-full">
            {checkpoints.map((checkpoint) => (
              <AccordionItem key={checkpoint} value={checkpoint}>
                <AccordionTrigger>
                  <div className="mt-4 flex flex-row items-center gap-5">
                    <div className="bg-primary/20 border-primary/20 h-10.5 w-10.5 rounded-lg border p-2">
                      <CheckCircle2Icon className="text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <p className="">{checkpoint}</p>
                      <p className="text-muted-foreground text-sm">12 tasks, 4 completed</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>Why is this goal so important to you?</p>
                  <p>{goal.whyReason}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
