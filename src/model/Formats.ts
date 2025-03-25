import { endOfWeek, format, startOfWeek } from "date-fns";

export const DATE_FORMAT = "dd-MM-yyyy";

export const formatWeek = (date: Date) =>
  `${format(startOfWeek(date, { weekStartsOn: 1 }), "dd MMMM yyyy")} - ${format(
    endOfWeek(date, { weekStartsOn: 1 }),
    "dd MMMM yyyy"
  )}`;
export const formatLongDate = (date: Date) => format(date, "cccc dd MMMM yyyy");
