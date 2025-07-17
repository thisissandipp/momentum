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
import { GoalCreationForm, goalCreationFormId } from '@/components/goals/goal-creation-form';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useGoalStore } from '@/providers/goal-store-provider';
import { GoalCard } from '@/components/goals/goal-card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { User } from '@/db/types';
import axios from 'axios';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [goalSheetOpen, setGoalSheetOpen] = useState(false);

  const { goals, setGoals } = useGoalStore((store) => store);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    currentUser();
  }, []);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('/api/goals');
        setGoals(response.data.goals);
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    if (user) {
      document.title = `Dashboard - ${user.displayName}`;
      fetchGoals();
    }
  }, [setGoals, user]);

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
                      <SheetTitle>Create new goal</SheetTitle>
                    </SheetHeader>
                    <GoalCreationForm onSuccess={() => setGoalSheetOpen(false)} />
                    <SheetFooter className="flex flex-row justify-end gap-x-4">
                      <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                      </SheetClose>
                      <Button type="submit" form={goalCreationFormId}>
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
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {goals.map((goal) => (
                <GoalCard key={goal.id} {...goal} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
