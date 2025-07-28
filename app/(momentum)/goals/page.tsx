'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, TrophyIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { GoalForm, goalFormId } from '@/components/goals/goal-form';
import { CARD_WIDTH, GoalCard } from '@/components/goals/goal-card';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGoalStore } from '@/providers/goal-store-provider';
import { Button } from '@/components/ui/button';
import { Goal, User } from '@/types';
import axios from 'axios';

export default function GoalsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [goalSheetOpen, setGoalSheetOpen] = useState(false);

  const { goals, status, setGoals, setStatus } = useGoalStore((store) => store);

  // Refs for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // State for goals section scroll capabilities
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const CARD_SPACING = 24;
  const SCROLL_AMOUNT = CARD_WIDTH + CARD_SPACING;

  // Function to check scrollability
  const checkScrollability = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // -1 for floating point precision
    }
  }, []);

  // Scroll handlers
  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        const scrollByAmount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
        scrollContainerRef.current.scrollBy({
          left: scrollByAmount,
          behavior: 'smooth',
        });
      }
    },
    [SCROLL_AMOUNT],
  );

  useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data.user satisfies User);
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    currentUser();
  }, []);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setStatus('loading');
        const response = await axios.get('/api/goals');
        setGoals(response.data.goals satisfies Goal[]);
        setStatus('success');
      } catch (error) {
        console.error('Failed to load user', error);
        setStatus('failed');
      }
    };

    if (status !== 'loading' && status !== 'success') {
      fetchGoals();
    }
  }, [setGoals, setStatus, status, user]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability();
      container.addEventListener('scroll', checkScrollability);
      return () => {
        container.removeEventListener('scroll', checkScrollability);
      };
    }
  }, [checkScrollability, goals]);

  return (
    <div className="mx-8">
      <div className="mx-auto mt-10 max-w-3xl">
        <div>
          <h2 className="text-lg font-semibold">
            Greetings, {user ? user.displayName.split(' ')[0] : 'boss'} 👋
          </h2>
          <p className="text-muted-foreground mt-0.5 text-base">
            Let&apos;s achieve your goals together!
          </p>
        </div>
        {goals.length === 0 && (
          <div className="mt-10">
            <Card className="items-center text-center">
              <CardContent>
                <h3 className="text-lg font-semibold">No goals found!</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Looks like you haven&apos;t yet set up any goals for you.
                </p>
              </CardContent>
              <CardFooter>
                <Sheet open={goalSheetOpen} onOpenChange={setGoalSheetOpen}>
                  <SheetTrigger asChild>
                    <Button>
                      <PlusIcon />
                      Create new goal
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="max-h-screen overflow-y-scroll">
                    <SheetHeader>
                      <SheetTitle>New Goal</SheetTitle>
                    </SheetHeader>
                    <GoalForm onSuccess={() => setGoalSheetOpen(false)} />
                    <SheetFooter className="flex flex-row justify-end gap-x-4">
                      <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                      </SheetClose>
                      <Button type="submit" form={goalFormId}>
                        Create
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          </div>
        )}
        {goals.length > 0 && (
          <div>
            <div className="mt-10">
              <div className="mx-1.5 flex flex-row items-center justify-between">
                <p className="text-muted-foreground flex flex-row items-center gap-x-1.5 text-sm">
                  <TrophyIcon className="h-4 w-4" /> All Your Goals
                </p>
                <Sheet open={goalSheetOpen} onOpenChange={setGoalSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="link" size="sm">
                      <PlusIcon /> New Goal
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="max-h-screen overflow-y-scroll">
                    <SheetHeader>
                      <SheetTitle>New Goal</SheetTitle>
                    </SheetHeader>
                    <GoalForm onSuccess={() => setGoalSheetOpen(false)} />
                    <SheetFooter className="flex flex-row justify-end gap-x-4">
                      <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                      </SheetClose>
                      <Button type="submit" form={goalFormId}>
                        Create
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
              <div
                className="relative mt-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div
                  ref={scrollContainerRef}
                  style={{ '--card-spacing': `${CARD_SPACING}px` } as React.CSSProperties}
                  className="scrollbar-hidden flex space-x-[var(--card-spacing)] overflow-x-auto pb-4"
                >
                  {goals.map((goal) => (
                    <div key={goal.id} className="flex-shrink-0">
                      <GoalCard {...goal} />
                    </div>
                  ))}
                </div>

                {isHovered && canScrollLeft && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 left-[-20px] z-10 -translate-y-1/2 rounded-full shadow-lg"
                    onClick={() => scroll('left')}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </Button>
                )}

                {isHovered && canScrollRight && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 right-[-20px] z-10 -translate-y-1/2 rounded-full shadow-lg"
                    onClick={() => scroll('right')}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
