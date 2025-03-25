import { WeekSummary } from "./fetchWeekSummary";

export const completeWeek = async (summary: WeekSummary) => {
  "use server";
  console.log(summary);
};