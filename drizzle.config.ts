import { type Config, defineConfig } from 'drizzle-kit';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

export default defineConfig({
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: { url: databaseUrl },
} satisfies Config);
