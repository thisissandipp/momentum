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
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { User } from '@/db/types';
import axios from 'axios';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [goalSheetOpen, setGoalSheetOpen] = useState(false);

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

  return (
    <div className="mx-8">
      <div className="mx-auto mt-10 max-w-2xl">
        <div>
          <h2 className="text-lg font-semibold">
            It&apos;s time to wake up, {user ? user.displayName.split(' ')[0] : 'boss'}!
          </h2>
        </div>
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
      </div>
    </div>
  );
}
