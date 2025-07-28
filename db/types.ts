import { earlyAccess, earlyFeedback, storyResponses, goals, users, checkpoints } from '@/db/schema';

export type SelectUser = typeof users.$inferSelect;
export type SelectGoal = typeof goals.$inferSelect;
export type SelectCheckpoint = typeof checkpoints.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type InsertGoal = typeof goals.$inferInsert;
export type InsertCheckpoint = typeof checkpoints.$inferInsert;

export type InsertEarlyAccess = typeof earlyAccess.$inferInsert;
export type InsertEarlyFeedback = typeof earlyFeedback.$inferInsert;
export type InsertStoryResponse = typeof storyResponses.$inferInsert;
