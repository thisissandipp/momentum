import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const SiteFooter = () => {
  return (
    <footer className="w-fullpy-8 py-10 text-center text-sm">
      <div className="mx-auto max-w-6xl px-4">
        <p>&copy; {new Date().getFullYear()} Momentum. All rights reserved.</p>
        <div className="mt-4 space-x-6">
          <Button asChild variant="ghost">
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="https://x.com/thisissandipp" target="_blank" rel="noopener noreferrer">
              Follow Our Journey
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};
