import { LightbulbIcon, Repeat2Icon, SparklesIcon, TargetIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative isolate pt-14">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="from-primary/10 to-primary/50 relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
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
            Go beyond tracking. Momentum is your intelligent companion, providing subtle guidance
            and personalized insights to fuel your personal growth journey.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild className="font-semibold shadow-xs">
              <Link href="#">Join Early Access</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="#">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <section className="bg-card-foreground/5 dark:bg-card py-24 sm:py-32 lg:py-48">
        <div className="mx-8">
          <div className="mx-auto grid max-w-6xl place-items-center md:grid-cols-2 md:gap-24">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
                Frustrated with{' '}
                <span className="bg-gradient-to-b from-gray-800 to-gray-300 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-800">
                  Stalled
                </span>{' '}
                Progress?
              </h2>
            </div>
            <div>
              <div className="mx-auto mt-12 flex max-w-3xl flex-row items-start lg:mt-0">
                <h3 className="text-primary text-5xl font-extrabold">1</h3>
                <h3 className="text-muted-foreground ml-4 text-lg font-medium text-pretty sm:text-xl/8">
                  Setting ambitious goals is easy. Sticking to the habits that truly get you there?
                  That&apos;s real challenge.
                </h3>
              </div>
              <div className="mx-auto mt-8 flex max-w-3xl flex-row items-start">
                <h3 className="text-primary text-5xl font-extrabold">2</h3>
                <h3 className="text-muted-foreground ml-4 text-lg font-medium text-pretty sm:text-xl/8">
                  Generic advice and basic trackers only tell you what you did, and not how to
                  genuinely improve your patterns.
                </h3>
              </div>
              <div className="mx-auto mt-8 flex max-w-3xl flex-row items-start">
                <h3 className="text-primary text-5xl font-extrabold">3</h3>
                <h3 className="text-muted-foreground ml-4 text-lg font-medium text-pretty sm:text-xl/8">
                  You need insights tailored to <em>your</em> unique journey, not just raw data you
                  have to interpret yourself.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-32 lg:py-48">
        <div className="mx-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Introducing{' '}
            <span className="bg-gradient-to-b from-gray-800 to-gray-300 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-800">
              Momentum
            </span>
            {' - '}Intelligent Guidance for Lasting Change
          </h1>
          <p className="text-muted-foreground mx-auto mt-8 max-w-3xl text-lg font-medium text-pretty sm:text-xl/8">
            Imagine a companion that learns your patterns, offers timely support, and helps you
            transform intentions into reality - seamlessly and intelligently.
          </p>
        </div>
        <div className="mt-15 flex justify-center">
          <div className="mx-8 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="bg-background hover:bg-card-foreground/5 dark:hover:bg-card border-0 shadow-none">
              <CardHeader className="flex flex-col items-center justify-center">
                <div className="bg-primary/20 ring-primary/10 mb-4 rounded-full p-2 ring-8">
                  <TargetIcon size="24" className="text-primary" />
                </div>
                <CardTitle className="mt-3.5 text-xl font-semibold text-pretty sm:text-2xl/8">
                  Define Your Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center text-base">
                Set clear, ambitious goals. Momentum helps break them into manageable, daily/timely
                actions with smart suggestions.
              </CardContent>
            </Card>
            <Card className="bg-background hover:bg-card-foreground/5 dark:hover:bg-card border-0 shadow-none">
              <CardHeader className="flex flex-col items-center justify-center">
                <div className="bg-primary/20 ring-primary/10 mb-4 rounded-full p-2 ring-8">
                  <Repeat2Icon size="24" className="text-primary" />
                </div>
                <CardTitle className="mt-3.5 text-xl font-semibold text-pretty sm:text-2xl/8">
                  Build Constant Habits
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center text-base">
                Effortlessly track your daily progress with a clean interface that keeps you
                focused, not overwhelmed.
              </CardContent>
            </Card>
            <Card className="bg-background hover:bg-card-foreground/5 dark:hover:bg-card border-0 shadow-none">
              <CardHeader className="flex flex-col items-center justify-center">
                <div className="bg-primary/20 ring-primary/10 mb-4 rounded-full p-2 ring-8">
                  <LightbulbIcon size="24" className="text-primary" />
                </div>
                <CardTitle className="mt-3.5 text-xl font-semibold text-pretty sm:text-2xl/8">
                  Gain Proactive Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center text-base">
                Receive subtle nudges and insightful reflections tailored to your unique journey,
                preventing plateaus.
              </CardContent>
            </Card>
            <Card className="bg-background hover:bg-card-foreground/5 dark:hover:bg-card border-0 shadow-none">
              <CardHeader className="flex flex-col items-center justify-center">
                <div className="bg-primary/20 ring-primary/10 mb-4 rounded-full p-2 ring-8">
                  <SparklesIcon size="24" className="text-primary" />
                </div>
                <CardTitle className="mt-3.5 text-xl font-semibold text-pretty sm:text-2xl/8">
                  Reflect & Evolve
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center text-base">
                Understand your patterns and continuously refine your path with intelligent
                summaries and growth prompts.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
