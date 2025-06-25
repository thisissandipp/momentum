import { boolean, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  // The `id` to be mapped with the auth.users.id from supabase auth users table
  id: uuid('id').primaryKey(),
  displayName: text('display_name').notNull().default('User'),
  email: text('email').notNull().unique(),
  emailConfirmed: boolean('email_confirmed').notNull().default(false),
  imageUrl: text('image_url'),
  timezone: text('timezone'),
  onboardingCompleted: boolean('onboarding_completed').notNull().default(false),
  appPreferences: jsonb('app_preferences'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  lastActiveAt: timestamp('last_active_at', { withTimezone: true }).notNull().defaultNow(),
});

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
