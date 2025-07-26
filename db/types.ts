import { earlyAccess, earlyFeedback, storyResponses, goals, users, checkpoints } from '@/db/schema';

export type User = typeof users.$inferSelect;
export type Goal = typeof goals.$inferSelect;
export type Checkpoint = typeof checkpoints.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type InsertGoal = typeof goals.$inferInsert;
export type InsertCheckpoint = typeof checkpoints.$inferInsert;

export type InsertEarlyAccess = typeof earlyAccess.$inferInsert;
export type InsertEarlyFeedback = typeof earlyFeedback.$inferInsert;
export type InsertStoryResponse = typeof storyResponses.$inferInsert;
