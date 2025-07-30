import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SendIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

export const NavigationSecondary = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="mt-0.5">
            <SidebarMenuButton asChild>
              <Link href="#">
                <SettingsIcon className="text-muted-foreground" />
                <span className="ml-1.5">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mt-0.5">
            <SidebarMenuButton asChild>
              <Link href="#">
                <SendIcon className="text-muted-foreground" />
                <span className="ml-1.5">Support & Feedback</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
