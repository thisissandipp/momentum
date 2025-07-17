import { createStore } from 'zustand';
import { Goal } from '@/db/types';

export type GoalState = { goals: Goal[] };
export type GoalActions = { setGoals: (goals: Goal[]) => void; addGoal: (goal: Goal) => void };
export type GoalStore = GoalState & GoalActions;

export const goalInitState: GoalState = { goals: [] };

export const createGoalStore = (initState: GoalState = goalInitState) => {
  return createStore<GoalStore>()((set) => ({
    ...initState,
    setGoals: (goals) => set({ goals }),
    addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  }));
};
