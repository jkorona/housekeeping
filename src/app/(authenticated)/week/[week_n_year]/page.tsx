import { format } from "date-fns";
import { DATE_FORMAT } from "@/model/Formats";
import { fetchWeekSummary } from "@/db/actions/fetchWeekSummary";

export type WeekPageProps = {
  params: Promise<{ week_n_year: string }>;
};

export default async function WeekPage({ params }: WeekPageProps) {
  const { week_n_year } = await params;
  const [week, year] = week_n_year.split('-').map(Number);

  const logs = await fetchWeekSummary(week, year)

  return (
    <div>
      <ul>
        {logs.map(({ memberId, date, member }) => (
          <li key={memberId + "_" + date}>
            {member.name} {format(date, DATE_FORMAT)}
          </li>
        ))}
      </ul>
    </div>
  );
}
