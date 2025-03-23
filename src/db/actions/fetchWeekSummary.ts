import { endOfISOWeek, setISOWeek, startOfISOWeek } from "date-fns";
import { db } from "..";
import { Log } from "../schema/chores";

export type WeekSummary = Array<{
  id: number;
  name: string;
  rate: number;
  color: string;
  completed: number;
  all: number;
}>;

const calculateScore = (logs: Log[]): { completed: number; all: number } =>
  logs.reduce(
    (result, log) => {
      if (log.skip) {
        result.all -= 1;
      } else if (log.done) {
        result.completed += 1;
      }
      return result;
    },
    { completed: 0, all: 6 }
  );

export const fetchWeekSummary = async (
  week: number,
  year: number
): Promise<WeekSummary> => {
  const weekDate = setISOWeek(new Date(year, 1, 1), week);
  const startDate = startOfISOWeek(weekDate);
  const endDate = endOfISOWeek(weekDate);

  const membersWithLogs = await db.query.members.findMany({
    with: {
      logs: {
        where: ({ date }, { between }) => between(date, startDate, endDate),
      },
    },
    orderBy: ({ dateOfBirth }, { desc }) => desc(dateOfBirth),
  });

  return membersWithLogs.map((item) => ({
    id: item.id,
    name: item.name,
    color: item.color,
    rate: item.rate,
    ...calculateScore(item.logs ?? []),
  }));
};
