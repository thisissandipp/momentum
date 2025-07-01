'use client';

import { createOnboardingStore, type OnboardingStore } from '@/stores/onboarding-store';
import { createContext, useContext, useRef, type ReactNode } from 'react';
import { useStore } from 'zustand';

export type OnboardingStoreApi = ReturnType<typeof createOnboardingStore>;
export const OnboardingStoreContext = createContext<OnboardingStoreApi | undefined>(undefined);

export interface OnboardingStoreProviderProps {
  children: ReactNode;
}

export const OnboardingStoreProvider = ({ children }: OnboardingStoreProviderProps) => {
  const storeRef = useRef<OnboardingStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createOnboardingStore();
  }

  return (
    <OnboardingStoreContext.Provider value={storeRef.current}>
      {children}
    </OnboardingStoreContext.Provider>
  );
};

export const useOnboardingStore = <T,>(selector: (store: OnboardingStore) => T): T => {
  const onboardingStoreContext = useContext(OnboardingStoreContext);

  if (!onboardingStoreContext) {
    throw new Error(`useOnboardingStore must be used within OnboardingStoreProvider`);
  }

  return useStore(onboardingStoreContext, selector);
};
