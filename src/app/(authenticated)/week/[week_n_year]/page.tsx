import { fetchWeekSummary } from "@/db/actions/fetchWeekSummary";
import MembersProgress from "./component/MembersProgress";
import CloseWeek from "./component/CloseWeek";
import { Stack } from "@chakra-ui/react";

export type WeekPageProps = {
  params: Promise<{ week_n_year: string }>;
};

export default async function WeekPage({ params }: WeekPageProps) {
  const { week_n_year } = await params;
  const [week, year] = week_n_year.split("-").map(Number);

  const summary = await fetchWeekSummary(week, year);

  return (
    <Stack gap="4">
      <MembersProgress summary={summary} />
      {!summary.closed && <CloseWeek summary={summary} />}
    </Stack>
  );
}
