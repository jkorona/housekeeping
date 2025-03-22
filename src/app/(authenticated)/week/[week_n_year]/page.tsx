import { endOfISOWeek, format, parse, startOfISOWeek } from "date-fns";

export type WeekPageProps = {
  params: Promise<{ week_n_year: string }>;
};

export default async function WeekPage({ params }: WeekPageProps) {
  const { week_n_year } = await params;
  const weekDate = parse(week_n_year, "I-R", new Date());

  const startDate = startOfISOWeek(weekDate);
  const endDate = endOfISOWeek(weekDate);

  return (
    <div>
      <h1>
        Week Page: {format(startDate, "dd-MM-yyyy")} -{" "}
        {format(endDate, "dd-MM-yyyy")}
      </h1>
      <p>This is a server-side rendered component for the week page.</p>
    </div>
  );
}
