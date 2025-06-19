import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
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
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild className="font-semibold shadow-xs">
            <Link href="#">Join Early Access</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
