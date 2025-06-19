'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FrownIcon, LaughIcon, MehIcon, SmileIcon, ZapIcon } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme/theme-switcher';
import { type ChangeEvent, useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const feedbackMoods = {
  excellent: 'excellent',
  good: 'good',
  neutral: 'neutral',
  bad: 'bad',
};

export const SiteHeader = () => {
  const [feedbackMood, setFeedbackMood] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const [sendDisabled, setSendDisabled] = useState<boolean>(true);

  const baseIconClasses = 'cursor-pointer h-5 w-5 md:h-6 md:w-6 text-muted-foreground';
  const hoverClasses = 'transition-transform duration-200 ease-in-out hover:scale-110';

  const selectClasses = (value: string) => {
    return feedbackMood === value
      ? 'bg-primary/35 p-[0.8] rounded-full ring-2 ring-primary/40'
      : '';
  };

  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackMoodChange = (value: string) => {
    setFeedbackMood(value);
  };

  useEffect(() => {
    if (feedback.length > 0 && feedbackMood !== null) setSendDisabled(false);
    else setSendDisabled(true);
  }, [feedback.length, feedbackMood]);

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-5xl items-center gap-2 md:gap-4">
        <div className="mx-4 flex">
          <Button asChild variant="ghost" className="text-md">
            <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
              <ZapIcon className="h-6 w-6 fill-current" />
              <span className="hidden font-semibold lg:inline-block">Momentum</span>
            </Link>
          </Button>
        </div>
        <div className="mr-4 ml-auto flex items-center gap-2 md:flex-1 md:justify-end lg:mr-6">
          <nav className="flex items-center gap-0.5">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Feedback</Button>
              </PopoverTrigger>
              <PopoverContent className="bg-background w-100 border-2">
                <Textarea
                  className="focus-visible:ring-[none]"
                  placeholder="Type your message here."
                  onChange={handleFeedbackChange}
                />
                <div className="mt-10 flex flex-row items-center justify-between">
                  <div className="text-muted-foreground flex flex-row gap-6">
                    <LaughIcon
                      className={cn(
                        baseIconClasses,
                        hoverClasses,
                        selectClasses(feedbackMoods.excellent),
                      )}
                      onClick={() => handleFeedbackMoodChange(feedbackMoods.excellent)}
                    />
                    <SmileIcon
                      className={cn(
                        baseIconClasses,
                        hoverClasses,
                        selectClasses(feedbackMoods.good),
                      )}
                      onClick={() => handleFeedbackMoodChange(feedbackMoods.good)}
                    />
                    <MehIcon
                      className={cn(
                        baseIconClasses,
                        hoverClasses,
                        selectClasses(feedbackMoods.neutral),
                      )}
                      onClick={() => handleFeedbackMoodChange(feedbackMoods.neutral)}
                    />
                    <FrownIcon
                      className={cn(
                        baseIconClasses,
                        hoverClasses,
                        selectClasses(feedbackMoods.bad),
                      )}
                      onClick={() => handleFeedbackMoodChange(feedbackMoods.bad)}
                    />
                  </div>
                  <Button disabled={sendDisabled}>Send</Button>
                </div>
              </PopoverContent>
            </Popover>
            <div className="mx-1.5 h-3.5">
              <Separator orientation="vertical" />
            </div>
            <Button asChild variant="ghost" size="icon">
              <Link href="#" target="_blank" rel="noreferrer">
                <Icons.gitHub className="size-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <div className="mx-1.5 h-3.5">
              <Separator orientation="vertical" />
            </div>
            <ThemeSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
};
