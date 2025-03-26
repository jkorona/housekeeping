import { db } from "..";
import { weeklyReports } from "../schema/chores";
import { WeekSummary } from "./fetchWeekSummary";
import { formatWeek } from "@/model/Formats";
import { postTransaction } from "./postTransaction";

export const completeWeek = async (summary: WeekSummary) => {
  const { week, year } = summary;
  for (const result of summary.results) {
    if (result.payment > 0) {
      await postTransaction(
        result.id,
        result.payment,
        `Wypłata kieszonkowego za tydzień ${formatWeek({ week, year })}.`
      );
    }
  }
  await db
    .insert(weeklyReports)
    .values({
      week,
      year,
      summary: summary.results,
    })
    .execute();
};
