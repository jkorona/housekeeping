import { endOfISOWeek, setISOWeek, startOfISOWeek } from "date-fns";
import { db } from "..";
import { Log } from "../schema/chores";

export type MembersWeekSummary = {
  id: number;
  name: string;
  color: string;
  completed: number;
  all: number;
  progress: number;
  payment: number;
};
export type WeekSummary = {
  startDate: Date;
  endDate: Date;
  closed: boolean;
  results: MembersWeekSummary[];
};

const calculateScore = (
  logs: Log[],
  rate: number
): Pick<MembersWeekSummary, "completed" | "all" | "progress" | "payment"> => {
  const { completed, all } = logs.reduce(
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
  const progress = Math.floor((100 * completed) / all);
  const payment = Math.floor(progress < 50 ? 0 : rate * (progress / 100));
  return { completed, all, progress, payment };
};

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
    orderBy: ({ dateOfBirth }, { asc }) => asc(dateOfBirth),
  });

  return {
    startDate,
    endDate,
    closed: false,
    results: membersWithLogs.map((item) => ({
      id: item.id,
      name: item.name,
      color: item.color,
      ...calculateScore(item.logs ?? [], item.rate),
    })),
  };
};
