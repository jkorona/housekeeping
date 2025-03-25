import { db } from "..";
import { weeklyReports } from "../schema/chores";
import { WeekSummary } from "./fetchWeekSummary";
import { formatWeek } from "@/model/Formats";
import { postTransaction } from "./postTransaction";

export const completeWeek = async (summary: WeekSummary) => {
  for (const result of summary.results) {
    if (result.payment > 0) {
      await postTransaction(
        result.id,
        result.payment,
        `Wypłata kieszonkowego za tydzień ${formatWeek(summary.startDate)}.`
      );
    }
  }
  await db
    .insert(weeklyReports)
    .values({
      startDate: summary.startDate,
      endDate: summary.endDate,
      summary: summary.results,
    })
    .execute();
};
