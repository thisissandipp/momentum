'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size="icon"
      variant="ghost"
    >
      <MoonIcon className="flex size-5 gap-2 dark:hidden" />
      <SunIcon className="hidden size-5 gap-2 dark:flex" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
