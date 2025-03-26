import { InferInsertModel, relations } from "drizzle-orm";
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
  json,
} from "drizzle-orm/pg-core";
import { MembersWeekSummary } from "../actions/fetchWeekSummary";

export const chores = pgTable("chores", {
  id: serial().primaryKey(),
  name: varchar({ length: 512 }).unique().notNull(),
  description: text(),
});

export const members = pgTable("members", {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }).unique().notNull(),
  color: varchar({ length: 7 }).notNull().default("green"),
  rate: integer().notNull().default(1),
  dateOfBirth: date("date_of_birth", { mode: "string" })
    .notNull()
    .default("2020-01-01"),
});

export const membersRelations = relations(members, ({ many }) => ({
  logs: many(logs),
}));

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
    memberId: integer("member_id")
      .notNull()
      .references(() => members.id),
    choreId: integer("chore_id")
      .notNull()
      .references(() => chores.id),
    weekDay: weekDays("week_day").notNull(),
  },
  (table) => [primaryKey({ columns: [table.memberId, table.weekDay] })]
);

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  member: one(members, {
    fields: [assignments.memberId],
    references: [members.id],
  }),
  chore: one(chores, {
    fields: [assignments.choreId],
    references: [chores.id],
  }),
}));

export const logs = pgTable(
  "logs",
  {
    memberId: integer("member_id")
      .notNull()
      .references(() => members.id),
    date: date({ mode: "date" }).notNull(),
    done: boolean().notNull(),
    skip: boolean().notNull(),
  },
  (table) => [primaryKey({ columns: [table.memberId, table.date] })]
);

export const logsRelations = relations(logs, ({ one }) => ({
  member: one(members, {
    fields: [logs.memberId],
    references: [members.id],
  }),
}));

export const weeklyReports = pgTable("weekly_reports", {
  id: serial().primaryKey(),
  week: integer().notNull(),
  year: integer().notNull(),
  closed: boolean().notNull().default(true),
  summary: json().$type<MembersWeekSummary[]>().notNull(),
});

export type Member = InferInsertModel<typeof members>;
export type Chore = InferInsertModel<typeof chores>;
export type Assignment = InferInsertModel<typeof assignments>;
export const weekDaysList = weekDays.enumValues;
export type WeekDay = (typeof weekDaysList)[number];
export type Log = InferInsertModel<typeof logs>;
