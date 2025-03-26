import { WeekSummary } from "../../component/WeekSummary";

export type WeekPageProps = {
  params: Promise<{ week_n_year: string }>;
};

export default async function WeekPage({ params }: WeekPageProps) {
  const { week_n_year } = await params;
  const [week, year] = week_n_year.split("-").map(Number);

  return <WeekSummary week={week} year={year} />;
}
