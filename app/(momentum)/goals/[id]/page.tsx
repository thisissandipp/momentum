'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Goal } from '@/types';
import { toast } from 'sonner';
import axios from 'axios';

export default function GoalDetailsPage() {
  const { goals, status, setGoals, addCheckpoint, setStatus } = useGoalStore((store) => store);
  const { id } = useParams();

  const [goal, setGoal] = useState<Goal | null>(null);

  const [objective, setObjective] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onCreate = async () => {
    setIsSubmitting(true);
    if (objective.length === 0) {
      toast('Checkpoint can not be empty', {
        description: 'Please enter a valid checkpoint before proceeding.',
      });
      return;
    }

    try {
      const response = await axios.post(`/api/goals/${id}/checkpoints`, { objective });
      const { checkpoint } = response.data;
      if (!checkpoint) {
        toast('Checkpoint creation failed', {
          description: `Error: ${response.data.message}`,
        });
      }
      addCheckpoint(`${id}`, checkpoint);
    } catch (error) {
      console.error('Error in creating checkpoint', error);
      toast('An error has occurred', {
        description: 'We could not process the request. Please try after some time.',
      });
    } finally {
      setObjective('');
      setDialogOpen(false);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    const fetchGoals = async () => {
      setStatus('loading');
      try {
        const response = await axios.get(`/api/goals`);
        setGoals(response.data.goals satisfies Goal[]);
        setStatus('success');
      } catch (e) {
        console.error('Error fetching goal', e);
        setStatus('failed');
      }
    };

    if (status !== 'loading' && status !== 'success') {
      fetchGoals();
    }

    const goalIndex = goals.findIndex((goal) => goal.id === id);
    if (goalIndex !== -1) {
      setGoal(goals[goalIndex]);
    }
  }, [goals, id, setGoals, setStatus, status]);

  if (status === 'initial' || status === 'loading') {
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <form>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-primary bg-primary/20 hover:bg-primary/20 hover:text-primary my-2.5 font-semibold"
                >
                  <PlusIcon /> New Checkpoint
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create a new Checkpoint</DialogTitle>
                  <DialogDescription>
                    Give it a meaningful objective. You can always change it later.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input
                      placeholder="Enter an objective"
                      value={objective}
                      disabled={isSubmitting}
                      onChange={(e) => setObjective(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <Button type="button" variant="default" onClick={onCreate}>
                    Add Checkpoint
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <Accordion type="single" collapsible className="w-full">
            {goal.checkpoints.map((checkpoint) => (
              <AccordionItem key={checkpoint.id} value={checkpoint.id}>
                <AccordionTrigger>
                  <div className="mt-4 flex flex-row items-center gap-5">
                    <div className="bg-primary/20 border-primary/20 h-10.5 w-10.5 rounded-lg border p-2">
                      <CheckCircle2Icon className="text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <p className="">{checkpoint.objective}</p>
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
