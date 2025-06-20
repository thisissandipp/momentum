import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const earlyAccess = pgTable('early_access', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const earlyFeedback = pgTable('early_feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  moodRating: text('mood_rating').notNull(),
  feedback: text('feedback').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type InsertEarlyAccess = typeof earlyAccess.$inferInsert;
export type InsertEarlyFeedback = typeof earlyFeedback.$inferInsert;
