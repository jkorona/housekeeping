import { endOfISOWeek, isPast, isSameDay, startOfISOWeek } from "date-fns";
import { db } from "..";
import { Log } from "../schema/chores";
import { weekToDate } from "@/model/DateUtils";

export type MembersWeekSummary = {
  id: number;
  name: string;
  color: string;
  completed: number;
  all: number;
  progress: number;
  payment: number;
  dailyCompletion: (boolean | null)[];
};

export type WeekSummary = {
  week: number;
  year: number;
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

const calculateDailyCompletion = (
  startDate: Date,
  logs: Log[]
): (boolean | null)[] => {
  const dailyCompletion: (boolean | null)[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    const log = logs.find((log) => isSameDay(log.date, currentDate));
    if (log) {
      if (log.skip) {
        dailyCompletion.push(null);
      } else if (log.done) {
        dailyCompletion.push(true);
      } else {
        dailyCompletion.push(false);
      }
    } else if (isPast(currentDate)) {
      dailyCompletion.push(false);
    }
  }
  return dailyCompletion;
};

export const fetchWeekSummary = async (
  week: number,
  year: number
): Promise<WeekSummary> => {
  const weekDate = weekToDate(week, year);
  const startDate = startOfISOWeek(weekDate);
  const endDate = endOfISOWeek(weekDate);

  const report = await db.query.weeklyReports.findFirst({
    where: (fields, { and, eq }) =>
      and(eq(fields.week, week), eq(fields.year, year)),
  });

  if (report) {
    return {
      week,
      year,
      closed: true,
      results: report.summary,
    };
  } else {
    const membersWithLogs = await db.query.members.findMany({
      with: {
        logs: {
          where: ({ date }, { between }) => between(date, startDate, endDate),
        },
      },
      orderBy: ({ dateOfBirth }, { asc }) => asc(dateOfBirth),
    });

    return {
      week,
      year,
      closed: false,
      results: membersWithLogs.map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
        dailyCompletion: calculateDailyCompletion(startDate, item.logs ?? []),
        ...calculateScore(item.logs ?? [], item.rate),
      })),
    };
  }
};
