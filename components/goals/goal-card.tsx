import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { GoalForm, goalFormId } from '@/components/goals/goal-form';
import { ChevronRightIcon, HourglassIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Goal } from '@/types';

export const CARD_WIDTH = 240;

export const GoalCard = (goal: Goal) => {
  const router = useRouter();
  const [goalSheetOpen, setGoalSheetOpen] = useState(false);

  const today = new Date();
  const timeLeft = goal.targetDate
    ? Math.max(0, new Date(goal.targetDate).getTime() - today.getTime())
    : null;

  let targetDateLeftString = 'No target date';

  if (timeLeft) {
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    const weeksLeft = Math.ceil(daysLeft / 7);
    const monthsLeft = Math.floor(daysLeft / 30);

    targetDateLeftString =
      monthsLeft > 0
        ? `${monthsLeft} month${monthsLeft > 1 ? 's' : ''} left`
        : weeksLeft > 0
          ? `${weeksLeft} week${weeksLeft > 1 ? 's' : ''} left`
          : `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
  }

  return (
    <div
      style={{ '--card-width': `${CARD_WIDTH}px` } as React.CSSProperties}
      className="bg-muted dark:bg-card flex w-[var(--card-width)] flex-col items-start justify-between rounded-2xl p-5"
    >
      <div className="cursor-pointer" onClick={() => router.push(`/goals/${goal.id}`)}>
        <div className="text-4xl">{goal.emoji}</div>
        <div className="mt-4 flex flex-row gap-x-2.5">
          <Badge variant="outline">{goal.domain}</Badge>
        </div>
        <h3 className="mt-2 ml-1.5 line-clamp-2 text-xl font-semibold">{goal.title}</h3>
        <div className="m-1.5 mt-2.5 flex flex-row items-center gap-x-1.5">
          <HourglassIcon className="text-muted-foreground h-3 w-3" />
          <p className="text-muted-foreground text-xs">{targetDateLeftString}</p>
        </div>
      </div>
      <Sheet open={goalSheetOpen} onOpenChange={setGoalSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="link"
            size="sm"
            className="mt-4 ml-[-4px]"
            onClick={(e) => e.stopPropagation()}
          >
            Edit Details <ChevronRightIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="max-h-screen overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Edit Goal</SheetTitle>
          </SheetHeader>
          <GoalForm goal={goal} onSuccess={() => setGoalSheetOpen(false)} />
          <SheetFooter className="flex flex-row justify-end gap-x-4">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit" form={goalFormId}>
              Save
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
