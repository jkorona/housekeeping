import { InferInsertModel } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const chores = pgTable("chores", {
  id: serial().primaryKey(),
  name: varchar({ length: 512 }).unique().notNull(),
});

export const members = pgTable("members", {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }).unique().notNull(),
  color: varchar({ length: 7 }).notNull().default("#000000"),
});

export const weekDays = pgEnum("week_days", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const schedules = pgTable("schedules", {
  id: serial().primaryKey(),
  memberId: serial().references(() => members.id),
  choreId: serial().references(() => chores.id),
  weekDay: weekDays().notNull(),
});

export const logs = pgTable("logs", {
  id: serial().primaryKey(),
  scheduleId: serial().references(() => schedules.id),
  date: date({ mode: "string" }).notNull(),
  done: boolean().notNull(),
  skipped: boolean().notNull(),
});

export type Member = InferInsertModel<typeof members>; 
export type Chore = InferInsertModel<typeof chores>;
