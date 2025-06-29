'use client';

// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
// import type { Habit } from '@/types';
import { User } from '@/db/types';
import axios from 'axios';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  // const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    // const generateHabitSuggestions = async () => {
    //   const response = await axios.post('/api/habit-architect', {
    //     domain: 'Contribution & Purpose',
    //     oneYearGoal: 'Volunteer 4 times at the local shelter by year-end',
    //     currentState: "I haven't volunteered before, but I care about working with animals.",
    //   });
    //   console.log(response.data.habits);
    //   setHabits(response.data.habits satisfies Habit[]);
    // };

    currentUser();
    // generateHabitSuggestions();
  }, []);

  return (
    <div className="mx-8 py-24 md:py-32 lg:py-48">
      <div className="mx-auto mt-10 grid max-w-6xl place-items-center md:grid-cols-2 md:gap-24">
        <div>
          <h2 className="text-lg font-semibold">
            Welcome to Momentum, {user ? user.displayName.split(' ')[0] : 'boss'}!
          </h2>
          {/* <Input type="text" placeholder="Domain for your goal" className="mt-8" />
          <Textarea placeholder="What do you want to achieve in one year?" className="mt-8" />
          <Textarea
            placeholder="How are you doing currently to achieve what you want in one year?"
            className="mt-8"
          />
          <Button className="mt-8" variant="secondary">
            Generate Habit Suggestions
          </Button>
        </div>
        <div>
          {habits.map((habit) => (
            <div key={habit.habit} className="mx-auto mt-8 flex max-w-3xl flex-row items-start">
              <h3 className="text-muted-foreground ml-4 text-xs text-balance sm:text-base/8">
                {habit.habit}
              </h3>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
