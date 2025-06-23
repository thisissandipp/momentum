CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"display_name" text DEFAULT 'User' NOT NULL,
	"email" text NOT NULL,
	"email_confirmed" boolean DEFAULT false NOT NULL,
	"image_url" text,
	"timezone" text,
	"onboarding_completed" boolean DEFAULT false NOT NULL,
	"app_preferences" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_active_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
