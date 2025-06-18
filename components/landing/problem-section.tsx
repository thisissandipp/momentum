interface ProblemProps {
  id: number;
  content: string;
}

const problemsList: ProblemProps[] = [
  {
    id: 1,
    content:
      "Setting ambitious goals is easy. Sticking to the habits that truly get you there? That's real challenge.",
  },
  {
    id: 2,
    content:
      'Generic advice and basic trackers only tell you what you did, and not how to genuinely improve your patterns.',
  },
  {
    id: 3,
    content:
      'You need insights tailored to your unique journey, not just raw data you have to interpret yourself.',
  },
];

export const ProblemSection = () => {
  return (
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
            {problemsList.map((problem) => (
              <div key={problem.id} className="mx-auto mt-8 flex max-w-3xl flex-row items-start">
                <h3 className="text-primary text-5xl font-extrabold">{problem.id}</h3>
                <h3 className="text-muted-foreground ml-4 text-lg font-medium text-pretty sm:text-xl/8">
                  {problem.content}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
