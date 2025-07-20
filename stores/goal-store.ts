import { createStore } from 'zustand';
import { Goal } from '@/db/types';

export type GoalState = { goals: Goal[] };
export type GoalActions = {
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, goal: Goal) => void;
};

export type GoalStore = GoalState & GoalActions;

export const goalInitState: GoalState = { goals: [] };

export const createGoalStore = (initState: GoalState = goalInitState) => {
  return createStore<GoalStore>()((set) => ({
    ...initState,
    setGoals: (goals) => set({ goals }),
    addGoal: (goal) => {
      return set((state) => ({ goals: [...state.goals, goal] }));
    },
    updateGoal: (id, goal) =>
      set((state) => {
        const index = state.goals.findIndex((goal) => goal.id === id);
        const updatedGoals = [...state.goals];
        updatedGoals[index] = goal;
        return { goals: updatedGoals };
      }),
  }));
};
