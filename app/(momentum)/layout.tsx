import { GoalStoreProvider } from '@/providers/goal-store-provider';

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background relative">
      <GoalStoreProvider>{children}</GoalStoreProvider>
    </div>
  );
}
