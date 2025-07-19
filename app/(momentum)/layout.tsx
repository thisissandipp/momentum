import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { GoalStoreProvider } from '@/providers/goal-store-provider';
import { AppSidebar } from '@/components/app-sidebar';

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoalStoreProvider>
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
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </GoalStoreProvider>
  );
}
