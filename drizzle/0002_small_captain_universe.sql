ALTER TABLE "expenses" ALTER COLUMN "created_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "incomes" ALTER COLUMN "created_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "incomes" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "incomes" ADD COLUMN "email" text NOT NULL;