import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WhyImportantSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="">
          <CircleQuestionMarkIcon /> Learn more
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-screen overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Why Checkpoints Matter?</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <p className="text-sm/6">
            You have ambitious goals - big, exciting aspirations that truly matter to you. But
            often, the journey from a grand vision to daily action feels overwhelming. We get stuck
            wondering: &ldquo;Where do I even start?&rdquo; or &ldquo;How do I keep going when the
            finish line feels so far away?&rdquo; This is where most people lose momentum.
          </p>
          <p className="mt-6 text-sm/6">
            Checkpoints are your strategic stepping stones. They are the major phases or significant
            achievements you need to hit along the way to your ultimate goal. Think of them as
            mini-goals that break down the daunting into the doable.
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-6 text-sm/6 text-pretty">
            <li>
              Break down overwhelm. Each checkpoint provides clear focus, ensuring you always know
              your next step.
            </li>
            <li>
              Hitting a checkpoint is a tangible win, boosting motivation and showing clear
              progress. It turns a marathon into achievable sprints.
            </li>
            <li>
              Easily adjust your plan within a specific phase. Knowing your current checkpoint helps
              you quickly get back on track after setbacks.
            </li>
          </ul>
          <p className="mt-6 text-sm/6 font-medium">
            In Momentum, Checkpoints are your personal blueprint for consistent progress. They
            transform your biggest dreams into a series of clear, achievable realities.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
