import React, { FC } from "react";
import { WeekSummary } from "@/db/actions/fetchWeekSummary";
import {
  FormatNumber,
  Grid,
  GridItem,
  Icon,
  Progress,
  Tag,
  Text,
} from "@chakra-ui/react";
import { RxDot, RxDotFilled } from "react-icons/rx";

type MembersProgressProps = {
  summary: WeekSummary;
};

const renderDayStatus = (day: boolean | null | undefined) => {
  if (day === undefined) {
    return <RxDot />;
  }
  if (day === null) {
    return <RxDotFilled color="gray" />;
  }
  return day ? (
    <RxDotFilled color="green" />
  ) : (
    <RxDotFilled color="red" />
  );
};

function renderLegacyProgress(
  progress: number,
  closed: boolean
): React.ReactNode {
  return (
    <Progress.Root
      size="lg"
      defaultValue={progress}
      colorPalette={progress < 50 ? "red" : "green"}
      animated={!closed}
      striped={!closed}
    >
      <Progress.Track flex="1" borderRadius="l3">
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  );
}

const MembersProgress: FC<MembersProgressProps> = ({ summary }) => {
  return (
    <Grid
      gridTemplateColumns="min-content 1fr min-content min-content"
      gap="2"
      alignItems="center"
    >
      {summary.results.map(
        ({
          id,
          name,
          color,
          completed,
          all,
          payment,
          progress,
          dailyCompletion,
        }) => {
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
                  renderLegacyProgress(progress, summary.closed)
                ) : (
                  <Grid gridTemplateColumns="repeat(6, 1fr)">
                    {Array.from({ length: 6 }, (_, i) => (
                      <GridItem
                        key={`day_${i}`}
                        alignSelf="center"
                        justifySelf="center"
                      >
                        <Icon size={["sm", "md", "lg"]}>
                          {renderDayStatus(dailyCompletion[i])}
                        </Icon>
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
