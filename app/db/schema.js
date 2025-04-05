import { pgTable, text, integer, serial, date, uuid } from "drizzle-orm/pg-core";

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  category: text("category"),
  createdAt: text("created_at").notNull(),
  email: text("email").notNull(),
});

export const incomes = pgTable("incomes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  category: text("category"),
  createdAt: text("created_at").notNull(),
  email: text("email").notNull(),
});
