'use client';

import { createGoalStore, type GoalStore } from '@/stores/goal-store';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type GoalStoreApi = ReturnType<typeof createGoalStore>;
export const GoalStoreContext = createContext<GoalStoreApi | undefined>(undefined);

export interface GoalStoreProviderProps {
  children: ReactNode;
}

export const GoalStoreProvider = ({ children }: GoalStoreProviderProps) => {
  const storeRef = useRef<GoalStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createGoalStore();
  }

  return <GoalStoreContext.Provider value={storeRef.current}>{children}</GoalStoreContext.Provider>;
};

export const useGoalStore = <T,>(selector: (store: GoalStore) => T): T => {
  const goalStoreContext = useContext(GoalStoreContext);
  if (!goalStoreContext) {
    throw new Error(`useGoalStore must be used within GoalStoreProvider`);
  }
  return useStore(goalStoreContext, selector);
};
