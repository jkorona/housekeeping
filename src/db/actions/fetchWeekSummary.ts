import { endOfISOWeek, setISOWeek, startOfISOWeek } from "date-fns";
import { db } from "..";

export const fetchWeekSummary = async (week: number, year: number) => {
  const weekDate = setISOWeek(new Date(year, 1, 1), week);
  const startDate = startOfISOWeek(weekDate);
  const endDate = endOfISOWeek(weekDate);

  const logs = await db.query.logs
    .findMany({
      where: (logs, { and, gte, lte }) =>
        and(gte(logs.date, startDate), lte(logs.date, endDate)),
      with: {
        member: {
          columns: {
            name: true,
            rate: true,
          },
        },
      },
    })
    .execute();

    return logs;
};
