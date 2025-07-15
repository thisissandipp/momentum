CREATE TABLE "story_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"respondent_name" text,
	"contact_info" text,
	"response" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
