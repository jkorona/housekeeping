import { InferInsertModel } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  serial,
  varchar,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

export const chores = pgTable("chores", {
  id: serial().primaryKey(),
  name: varchar({ length: 512 }).unique().notNull(),
  description: text(),
});

export const members = pgTable("members", {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }).unique().notNull(),
  color: varchar({ length: 7 }).notNull().default("#000000"),
  rate: integer().notNull().default(1),
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

export const assignments = pgTable(
  "assignments",
  {
    memberId: integer('member_id').references(() => members.id),
    choreId: integer('chore_id').references(() => chores.id),
    weekDay: weekDays('week_day').notNull(),
  },
  (table) => [primaryKey({ columns: [table.memberId, table.weekDay] })]
);

export const logs = pgTable("logs", {
  id: serial().primaryKey(),
  // scheduleId: serial().references(() => schedules.),
  date: date({ mode: "string" }).notNull(),
  done: boolean().notNull(),
  skipped: boolean().notNull(),
});

export type Member = InferInsertModel<typeof members>;
export type Chore = InferInsertModel<typeof chores>;
export type Assignment = InferInsertModel<typeof assignments>;
export const weekDaysList = weekDays.enumValues;
export type WeekDay = (typeof weekDaysList)[number];
