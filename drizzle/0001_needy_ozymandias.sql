CREATE TYPE "public"."exercise_type" AS ENUM('gymnastic', 'weightlifting', 'cardio', 'other');--> statement-breakpoint
ALTER TYPE "public"."workout_type" ADD VALUE 'HERO';--> statement-breakpoint
ALTER TYPE "public"."workout_type" ADD VALUE 'BENCHMARK';--> statement-breakpoint
ALTER TYPE "public"."workout_type" ADD VALUE 'SKILL';--> statement-breakpoint
ALTER TYPE "public"."workout_type" ADD VALUE 'ACCESSORY';--> statement-breakpoint
CREATE TABLE "user_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"weight_unit" text DEFAULT 'kg',
	"distance_unit" text DEFAULT 'meters',
	"theme" text DEFAULT 'dark'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"role" text DEFAULT 'ROLE_USER',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_workout_id_exercise_id_pk";--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "title" SET DEFAULT 'Custom';--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises" ADD COLUMN "type" "exercise_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "workout_exercises" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "workout_exercises" ADD COLUMN "sets" integer;--> statement-breakpoint
ALTER TABLE "workout_exercises" ADD COLUMN "comment" text;--> statement-breakpoint
ALTER TABLE "workout_exercises" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "scoreValue" integer;--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;