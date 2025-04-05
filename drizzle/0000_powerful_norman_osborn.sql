CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"category" text,
	"created_at" text DEFAULT 'NOW()'
);
--> statement-breakpoint
CREATE TABLE "incomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"category" text,
	"created_at" text DEFAULT 'NOW()'
);
