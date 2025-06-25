import { earlyAccess, earlyFeedback, users } from '@/db/schema';

export type User = typeof users.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type InsertEarlyAccess = typeof earlyAccess.$inferInsert;
export type InsertEarlyFeedback = typeof earlyFeedback.$inferInsert;
