import React, { FC } from "react";
import { WeekSummary } from "@/db/actions/fetchWeekSummary";
import {
  FormatNumber,
  Grid,
  GridItem,
  Progress,
  Tag,
  Text,
} from "@chakra-ui/react";

type MembersProgressProps = {
  summary: WeekSummary;
};

const MembersProgress: FC<MembersProgressProps> = ({ summary }) => {
  return (
    <Grid
      gridTemplateColumns="min-content 1fr min-content min-content"
      gap="2"
      alignItems="center"
    >
      {summary.results.map(({ id, name, color, progress, payment }) => {
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
                <FormatNumber value={payment} style="currency" currency="PLN" />
              </Text>
            </GridItem>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default MembersProgress;
