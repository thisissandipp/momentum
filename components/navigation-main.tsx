import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CalendarIcon, HomeIcon, TargetIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigations = [
  {
    name: 'Home',
    href: '/home',
    icon: <HomeIcon size={16} />,
    tooltip: 'See an overview of all your active goals and progress.',
  },
  {
    name: 'My Goals',
    href: '/goals',
    icon: <TargetIcon size={16} />,
    tooltip: 'View and manage all your ambitious goals, checkpoints, tasks.',
  },
  {
    name: "Today's View",
    href: '/today',
    icon: <CalendarIcon size={16} />,
    tooltip: 'our daily focus: See tasks and habits for today.',
  },
];

export const NavigationMain = () => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Core Navigations</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navigations.map((navigation) => {
            const isActive = pathname.startsWith(`${navigation.href}`);
            return (
              <SidebarMenuItem key={navigation.name} className="mt-0.5">
                <SidebarMenuButton
                  asChild
                  tooltip={navigation.tooltip}
                  className={isActive ? 'bg-muted' : ''}
                >
                  <Link href={navigation.href}>
                    <span className="text-muted-foreground">{navigation.icon}</span>
                    <span className={isActive ? 'ml-1.5 font-semibold' : 'ml-1.5'}>
                      {navigation.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
