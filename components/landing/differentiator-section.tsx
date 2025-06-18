import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface DifferentiatorProps {
  title: string;
  content: string;
}

const differentiators: DifferentiatorProps[] = [
  {
    title: 'Intelligent habit Architect',
    content:
      'Go beyond basic lists. Momentum helps you design habits that truly stick, learning what works for your unique lifestyle.',
  },
  {
    title: 'Proactive Nudges',
    content:
      'Receive timely, unobtrusive guidance exactly when you need it - presenting plateaus before they come.',
  },
  {
    title: 'Effortless Tracking',
    content:
      'A minimalist, intuitive interface designed for quick logging, letting you focus on doing and growing, not just documenting.',
  },
  {
    title: 'Deep Reflection & Insights',
    content:
      'Uncover patterns and learn from your journey with intelligent summaries and prompts for truly meaningful self-discovery.',
  },
  {
    title: 'Privacy First Design',
    content:
      'Your personal growth journey is private. We build with your data security and control at our core, always.',
  },
  {
    title: 'Continuous Evolution',
    content:
      'Momentum is designed to grow with you. Expect continuous improvements and new intelligent features.',
  },
];

export const DifferentiatorSection = () => {
  return (
    <section className="bg-foreground">
      <div className="mx-8 py-24 text-center invert sm:py-32 lg:py-48">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          What Makes{' '}
          <span className="bg-gradient-to-b from-gray-800 to-gray-300 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-800">
            Momentum
          </span>{' '}
          Different?
        </h1>
        <div className="mt-22 flex justify-center">
          <div className="mx-8 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((differentiator) => (
              <Card key={differentiator.title}>
                <CardHeader className="text-lg font-semibold text-pretty sm:text-xl/8">
                  {differentiator.title}
                </CardHeader>
                <CardContent className="text-muted-foreground text-center text-base">
                  {differentiator.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
