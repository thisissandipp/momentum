import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { GoalStoreProvider } from '@/providers/goal-store-provider';
import { Separator } from '@/components/ui/separator';
import { AppSidebar } from '@/components/app-sidebar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoalStoreProvider>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 80)',
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
  );
}
