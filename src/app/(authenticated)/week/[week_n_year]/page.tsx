import { fetchWeekSummary } from "@/db/actions/fetchWeekSummary";
import {
  FormatNumber,
  Grid,
  GridItem,
  Progress,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";

export type WeekPageProps = {
  params: Promise<{ week_n_year: string }>;
};

export default async function WeekPage({ params }: WeekPageProps) {
  const { week_n_year } = await params;
  const [week, year] = week_n_year.split("-").map(Number);

  const summary = await fetchWeekSummary(week, year);

  return (
    <Grid
      gridTemplateColumns="min-content 1fr min-content min-content"
      gap="2"
      alignItems="center"
    >
      {summary.map(({ id, name, color, progress, award }) => {
        return (
          <React.Fragment key={id}>
            <GridItem>
              <Tag.Root
                size="xl"
                w="full"
                colorPalette={color}
                justifyContent="center"
              >
                <Tag.Label>{name}</Tag.Label>
              </Tag.Root>
            </GridItem>
            <GridItem padding="3">
              <Progress.Root
                size="lg"
                defaultValue={progress}
                colorPalette={progress < 50 ? "red" : "green"}
                striped
                animated
              >
                <Progress.Track flex="1" borderRadius="l3">
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            </GridItem>
            <GridItem>
              <Text textStyle="sm">{progress}%</Text>
            </GridItem>
            <GridItem>
              <Text textStyle="sm" fontWeight="semibold">
                <FormatNumber value={award} style="currency" currency="PLN" />
              </Text>
            </GridItem>
          </React.Fragment>
        );
      })}
    </Grid>
  );
}
