import { Checkpoint, Goal } from '@/types';
import { createStore } from 'zustand';

export type Status = 'initial' | 'loading' | 'success' | 'failed';
export type GoalState = { goals: Goal[]; status: Status };

export type GoalActions = {
  setStatus: (newStatus: Status) => void;
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, goal: Goal) => void;
  addCheckpoint: (goalId: string, checkpoint: Checkpoint) => void;
};

export type GoalStore = GoalState & GoalActions;
export const goalInitState: GoalState = { goals: [], status: 'initial' };

export const createGoalStore = (initState: GoalState = goalInitState) => {
  return createStore<GoalStore>()((set) => ({
    ...initState,
    setStatus: (newStatus) => set({ status: newStatus }),
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
    addCheckpoint: (goalId, checkpoint) =>
      set((state) => {
        const index = state.goals.findIndex((goal) => goal.id === goalId);
        const updatedGoals = [...state.goals];
        updatedGoals[index].checkpoints.push(checkpoint);
        return { goals: updatedGoals };
      }),
  }));
};
