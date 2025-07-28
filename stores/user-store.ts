import { createStore } from 'zustand';
import { User } from '@/types';

type Status = 'initial' | 'loading' | 'success' | 'failed';
export type UserState = { user: User | null; status: Status };

export type UserActions = {
  setStatus: (status: Status) => void;
  setUser: (user: User) => void;
};

export type UserStore = UserState & UserActions;
export const userInitState: UserState = { user: null, status: 'initial' };

export const createUserStore = (initState: UserState = userInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setStatus: (status) => set({ status }),
    setUser: (user) => set({ user }),
  }));
};
