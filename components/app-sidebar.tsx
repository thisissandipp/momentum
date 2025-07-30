'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavigationUser } from '@/components/navigation-user';
import { NavigationMain } from '@/components/navigation-main';
import { ZapIcon } from 'lucide-react';
import Link from 'next/link';

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-sidebar-border mx-0 h-16 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/home">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <ZapIcon className="!size-5 fill-current" />
                </div>
                <div className="ml-1.5 flex flex-col gap-0.5 leading-none">
                  <span className="text-base font-semibold">Momentum</span>
                  <span className="text-muted-foreground text-xs">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavigationMain />
      </SidebarContent>
      <SidebarFooter>
        <NavigationUser />
      </SidebarFooter>
    </Sidebar>
  );
};
