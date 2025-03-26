import { FC } from "react";
import { fetchWeekSummary } from "@/db/actions/fetchWeekSummary";
import { Stack, Text } from "@chakra-ui/react";
import MembersProgress from "./MembersProgress";
import CloseWeek from "./CloseWeek";

export type WeekSummaryProps = {
  week: number;
  year: number;
};

export const WeekSummary: FC<WeekSummaryProps> = async ({ week, year }) => {
  const summary = await fetchWeekSummary(week, year);

  return (
    <Stack gap="4">
      <MembersProgress summary={summary} />
      {!summary.closed ? (
        <CloseWeek summary={summary} />
      ) : (
        <Text
          fontWeight="semibold"
          color="green.600"
          textAlign="right"
          paddingInline="4"
        >
          Week closed!
        </Text>
      )}
    </Stack>
  );
};
