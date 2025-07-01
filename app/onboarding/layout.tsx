import { OnboardingStoreProvider } from '@/providers/onboarding-store-provider';
import { SiteHeader } from '@/components/site-header';

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="bg-background relative">
        <OnboardingStoreProvider>{children}</OnboardingStoreProvider>
      </div>
    </>
  );
}
