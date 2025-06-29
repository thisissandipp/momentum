import { Heart } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold tracking-tight text-balance sm:text-2xl">
        Momentum - Terms of Service
      </h1>
      <p className="text-muted-foreground mt-8 text-base font-medium text-pretty sm:text-base">
        Our Terms of Service are currently under development and will be available upon official
        launch. Please check back closer to our official launch for the full details.
      </p>
      <p className="text-muted-foreground mt-8 flex flex-row items-center text-base font-medium text-pretty sm:text-base">
        Thank you for your understanding and support!{' '}
        <Heart className="fill-primary ml-2 h-5 w-5 stroke-0" />
      </p>
    </div>
  );
}
