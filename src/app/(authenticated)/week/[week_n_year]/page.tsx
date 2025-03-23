import { fetchWeekSummary } from "@/db/actions/fetchWeekSummary";

export type WeekPageProps = {
  params: Promise<{ week_n_year: string }>;
};

export default async function WeekPage({ params }: WeekPageProps) {
  const { week_n_year } = await params;
  const [week, year] = week_n_year.split("-").map(Number);

  const summary = await fetchWeekSummary(week, year);

  return (
    <div>
      <ul>
        {summary.map(({ id, name, completed, all }) => (
          <li key={id}>
            {`${name}\t|\t${Math.floor((100 * completed) / all)}%`}
          </li>
        ))}
      </ul>
    </div>
  );
}
