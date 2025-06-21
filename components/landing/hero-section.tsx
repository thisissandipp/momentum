'use client';

import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { CheckCircle2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { z } from 'zod';

const earlyAccessFormSchema = z.object({
  email: z.string().email(),
});

export const HeroSection = () => {
  const [joined, setJoined] = useState(false);

  const earlyAccessForm = useForm<z.infer<typeof earlyAccessFormSchema>>({
    resolver: zodResolver(earlyAccessFormSchema),
    defaultValues: { email: '' },
  });

  const onEarlyAccessSubmit = async (values: z.infer<typeof earlyAccessFormSchema>) => {
    if (values.email.length < 1) {
      return;
    }

    try {
      const response = await axios.post('/api/early-access', { email: values.email });
      if (response.status !== 201 && response.status !== 200) {
        console.error(
          'Failed to add you to wishlist',
          response.data?.message || response.statusText,
        );
        toast('Failed to add you to wishlist', {
          description: response.data?.message || response.statusText,
        });
      } else {
        earlyAccessForm.reset();
        setJoined(true);
      }
    } catch (error) {
      console.error('Error adding to early access', error);
      toast('Something went wrong', {
        description: 'Internal server error while adding you to early access wishlist!',
      });
    }
  };

  return (
    <section className="mx-auto max-w-4xl py-48 sm:py-56 lg:py-72">
      {/* Announcements or Analytics placeholder */}
      <div className="mx-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          Build Your{' '}
          <span className="bg-gradient-to-b from-gray-800 to-gray-300 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-800">
            Unstoppable{' '}
          </span>
          Momentum
        </h1>
        <p className="text-muted-foreground mx-auto mt-8 max-w-3xl text-lg font-medium text-pretty sm:text-xl/8">
          Go beyond tracking. Momentum is your intelligent companion, providing subtle guidance and
          personalized insights to fuel your personal growth journey.
        </p>
        <Form {...earlyAccessForm}>
          <form
            onSubmit={earlyAccessForm.handleSubmit(onEarlyAccessSubmit)}
            className="mt-10 flex flex-col items-center justify-center gap-x-6 md:flex-row"
          >
            <FormField
              control={earlyAccessForm.control}
              name="email"
              render={({ field }) => (
                <Input
                  className="w-80 focus-visible:ring-[none]"
                  type="email"
                  placeholder="Email address..."
                  required
                  {...field}
                />
              )}
            ></FormField>
            <Button className="mt-4 font-semibold shadow-xs md:mt-0" type="submit">
              Join Early Access
            </Button>
          </form>
        </Form>
        <div
          className={cn(
            'mt-10 flex flex-row items-center justify-center text-green-600 dark:text-green-500',
            joined ? '' : 'hidden',
          )}
        >
          <CheckCircle2Icon />
          <p className="ml-2.5 font-semibold">
            Thanks for joining! Your email is confirmed for early access.
          </p>
        </div>
      </div>
    </section>
  );
};
