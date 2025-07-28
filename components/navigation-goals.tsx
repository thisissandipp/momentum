import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { BlocksIcon, ChevronRightIcon, PlusIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Goal } from '@/types';
import Link from 'next/link';

export const NavigationGoals = ({ goals }: { goals: Goal[] }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>My Goals</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {goals.map((goal) => (
            <Collapsible key={goal.id}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <span>{goal.emoji}</span>
                    <span>{goal.title}</span>
                  </Link>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="bg-sidebar-accent text-sidebar-accent-foreground left-2 data-[state=open]:rotate-90"
                    showOnHover
                  >
                    <ChevronRightIcon />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <SidebarMenuAction showOnHover>
                  <PlusIcon />
                </SidebarMenuAction>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <Label className="text-sidebar-foreground/70 ring-sidebar-ring flex shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden">
                      Checkpoints
                    </Label>
                    <SidebarMenuSubItem key="checkpoint-1">
                      <SidebarMenuSubButton asChild>
                        <Link href="#">
                          <span className="text-muted-foreground">
                            <BlocksIcon className="h-4 w-4" />
                          </span>
                          <span>Research on existing near-about solutions</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem key="checkpoint-2">
                      <SidebarMenuSubButton asChild>
                        <Link href="#">
                          <span className="text-muted-foreground">
                            <BlocksIcon className="h-4 w-4" />
                          </span>
                          <span>User Persona & Pain Point Mapping</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem key="checkpoint-3">
                      <SidebarMenuSubButton asChild>
                        <Link href="#">
                          <span className="text-muted-foreground">
                            <BlocksIcon className="h-4 w-4" />
                          </span>
                          <span>Recommendations & Momentum Feature Ideas</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
