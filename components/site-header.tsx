import { ThemeSwitcher } from '@/components/theme/theme-switcher';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ZapIcon } from 'lucide-react';
import Link from 'next/link';

export const SiteHeader = () => {
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
            <Button variant="secondary">Feedback</Button>
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
