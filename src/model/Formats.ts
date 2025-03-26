import { endOfWeek, format, setWeek, setYear, startOfWeek } from "date-fns";

export const DATE_FORMAT = "dd-MM-yyyy";

export const formatWeek = (date: Date | { week: number; year: number }) => {
  if (!(date instanceof Date)) {
    date = setYear(setWeek(new Date(), date.week), date.year);
  }
  return `${format(
    startOfWeek(date, { weekStartsOn: 1 }),
    "dd MMMM yyyy"
  )} - ${format(endOfWeek(date, { weekStartsOn: 1 }), "dd MMMM yyyy")}`;
};
export const formatLongDate = (date: Date) => format(date, "cccc dd MMMM yyyy");
