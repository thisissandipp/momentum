import {
  LightbulbIcon,
  type LucideProps,
  Repeat2Icon,
  SparklesIcon,
  TargetIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RefAttributes, ForwardRefExoticComponent } from 'react';

interface SolutionProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  title: string;
  content: string;
}

const solutions: SolutionProps[] = [
  {
    icon: TargetIcon,
    title: 'Define Your Vision',
    content:
      'Set clear, ambitious goals. Momentum helps break them into manageable, daily/timely actions with smart suggestions.',
  },
  {
    icon: Repeat2Icon,
    title: 'Build Constant Habits',
    content:
      'Effortlessly track your daily progress with a clean interface that keeps you focused, not overwhelmed.',
  },
  {
    icon: LightbulbIcon,
    title: 'Gain Proactive Insights',
    content:
      'Receive subtle nudges and insightful reflections tailored to your unique journey, preventing plateaus.',
  },
  {
    icon: SparklesIcon,
    title: 'Reflect & Evolve',
    content:
      'Understand your patterns and continuously refine your path with intelligent summaries and growth prompts.',
  },
];

export const SolutionSection = () => {
  return (
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
          {solutions.map((solution) => (
            <Card
              key={solution.title}
              className="bg-background hover:bg-card-foreground/5 dark:hover:bg-card border-0 shadow-none"
            >
              <CardHeader className="flex flex-col items-center justify-center">
                <div className="bg-primary/20 ring-primary/10 mb-4 rounded-full p-2 ring-8">
                  <solution.icon size="24" className="text-primary" />
                </div>
                <CardTitle className="mt-3.5 text-xl font-semibold text-pretty sm:text-2xl/8">
                  {solution.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center text-base">
                {solution.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
