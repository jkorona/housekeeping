import { db } from "..";
import { assignments, WeekDay, weekDaysList } from "../schema/chores";

export type Schedule = Record<WeekDay, Record<number, number>>;

export const fetchAssignments = async (): Promise<Schedule> => {
  const assignmentsList = await db.select().from(assignments);
  const schedule: Schedule = weekDaysList.reduce(
    (acc, weekDay) => ({ ...acc, [weekDay]: {} }),
    {} as Schedule
  );
  return assignmentsList.reduce((acc, assignment) => {
    acc[assignment.weekDay][assignment.memberId!] = assignment.choreId!;
    return acc;
  }, schedule);
};
