import React, { FC } from "react";
import { WeekSummary } from "@/db/actions/fetchWeekSummary";
import { FormatNumber, Grid, GridItem, Progress, Tag, Text } from "@chakra-ui/react";
import { RxDot, RxDotFilled } from "react-icons/rx";

type MembersProgressProps = {
  summary: WeekSummary;
};

const renderDayStatus = (day: boolean | null | undefined) => {
  if (day === undefined) {
    return <RxDot size={32} />;
  }
  if (day === null) {
    return <RxDotFilled size={32} color="gray" />;
  }
  return day ? (
    <RxDotFilled size={32} color="green" />
  ) : (
    <RxDotFilled size={32} color="red" />
  );
};

const MembersProgress: FC<MembersProgressProps> = ({ summary }) => {
  return (
    <Grid
      gridTemplateColumns="min-content 1fr min-content min-content"
      gap="2"
      alignItems="center"
    >
      {summary.results.map(
        ({ id, name, color, completed, all, payment, progress, dailyCompletion }) => {
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
                {!dailyCompletion ? (
                  <Progress.Root
                    size="lg"
                    defaultValue={progress}
                    colorPalette={progress < 50 ? "red" : "green"}
                    animated={!summary.closed}
                    striped={!summary.closed}
                  >
                    <Progress.Track flex="1" borderRadius="l3">
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                ) : (
                  <Grid gridTemplateColumns="repeat(6, 1fr)">
                    {Array.from({ length: 6 }, (_, i) => (
                      <GridItem
                        key={`day_${i}`}
                        alignSelf="center"
                        justifySelf="center"
                      >
                        {renderDayStatus(dailyCompletion[i])}
                      </GridItem>
                    ))}
                  </Grid>
                )}
              </GridItem>
              <GridItem>
                <Text textStyle="sm">
                  {completed}/{all}
                </Text>
              </GridItem>
              <GridItem>
                <Text textStyle="sm" fontWeight="semibold">
                  <FormatNumber
                    value={payment}
                    style="currency"
                    currency="PLN"
                  />
                </Text>
              </GridItem>
            </React.Fragment>
          );
        }
      )}
    </Grid>
  );
};

export default MembersProgress;
