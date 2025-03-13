import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { members } from "./chores";
import { relations } from "drizzle-orm";

export const transactions = pgTable("transactions", {
  id: serial().primaryKey(),
  accountId: integer("account_id")
    .notNull()
    .references(() => members.id),
  description: text(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  amount: integer().notNull(),
  total: integer().notNull(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(members, {
    fields: [transactions.accountId],
    references: [members.id],
  }),
}));
