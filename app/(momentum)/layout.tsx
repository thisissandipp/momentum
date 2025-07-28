import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UserStoreProvider } from '@/providers/user-store-provider';
import { GoalStoreProvider } from '@/providers/goal-store-provider';
import { UserInitializer } from '@/components/user-initializer';
import { Separator } from '@/components/ui/separator';
import { AppSidebar } from '@/components/app-sidebar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserStoreProvider>
      <GoalStoreProvider>
        <UserInitializer />
        <SidebarProvider
          style={
            {
              '--sidebar-width': 'calc(var(--spacing) * 72)',
              '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            </header>
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </GoalStoreProvider>
    </UserStoreProvider>
  );
}
