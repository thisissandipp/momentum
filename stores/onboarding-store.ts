import { Domain } from '@/lib/domains';
import { createStore } from 'zustand';

export type OnboardingState = {
  architect: {
    domain: Domain | null;
    oneYearGoal: string;
    currentState: string;
  };
};

export type OnboardingActions = {
  setDomain: (value: Domain) => void;
  setOneYearGoal: (value: string) => void;
  setCurrentState: (value: string) => void;
};

export type OnboardingStore = OnboardingState & OnboardingActions;

export const onboardingInitState: OnboardingState = {
  architect: {
    domain: null,
    oneYearGoal: '',
    currentState: '',
  },
};

export const createOnboardingStore = (initState: OnboardingState = onboardingInitState) => {
  return createStore<OnboardingStore>()((set) => ({
    ...initState,
    setDomain: (value) => set((state) => ({ architect: { ...state.architect, domain: value } })),
    setOneYearGoal: (value) =>
      set((state) => ({ architect: { ...state.architect, oneYearGoal: value } })),
    setCurrentState: (value) =>
      set((state) => ({ architect: { ...state.architect, currentState: value } })),
  }));
};
