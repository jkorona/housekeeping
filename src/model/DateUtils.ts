import { setISOWeek } from "date-fns";

export const parseWeek = (dateString: string): Date => {
  const [week, year] = dateString.split("-").map(Number);
  return weekToDate(week, year);
};

export const weekToDate = (week: number, year: number): Date =>
  setISOWeek(Date.UTC(year, 1, 1), week);
