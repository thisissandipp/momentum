import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CalendarIcon, ChartColumnIcon, CirclePlusIcon, HomeIcon, InboxIcon } from 'lucide-react';

export const NavigationMain = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-secondary/90 hover:text-secondary-foreground active:bg-secondary/90 active:text-secondary-foreground min-w-8 justify-center duration-200 ease-linear"
            >
              <CirclePlusIcon className="text-muted-foreground" />
              <span>New goal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="home">
            <SidebarMenuButton tooltip="Momentum goals, planner, and all">
              <HomeIcon />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="inbox">
            <SidebarMenuButton tooltip="Momentum goals, planner, and all">
              <InboxIcon />
              <span>Inbox</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="planner">
            <SidebarMenuButton tooltip="Momentum goals, planner, and all">
              <CalendarIcon />
              <span>Planner</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="analyze">
            <SidebarMenuButton tooltip="Momentum goals, planner, and all">
              <ChartColumnIcon />
              <span>Analyze</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
