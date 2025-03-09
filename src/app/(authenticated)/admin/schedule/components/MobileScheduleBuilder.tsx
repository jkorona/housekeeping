import React, { FC, Fragment } from "react";
import { Schedule } from "@/db/actions/fetchAssignments";
import { Chore, Member, WeekDay } from "@/db/schema/chores";
import { Grid, GridItem, Tag } from "@chakra-ui/react";

// const workingDays = weekDaysList.slice(0, -1);

export type MobileScheduleBuilderProps = {
  schedule: Schedule;
  members: Member[];
  chores: Chore[];
  onChange: (weekDay: WeekDay, memberId: number, choreId: number) => void;
};

export const MobileScheduleBuilder: FC<MobileScheduleBuilderProps> = ({
  members,
}) => (
  <Grid gridTemplateColumns="min-content 1fr" gap="4" hideFrom="md">
    <GridItem />
    <GridItem>HEADER</GridItem>
    {members.map((member) => (
      <Fragment key={member.id!}>
        <GridItem>
          <Tag.Root
            size="xl"
            w="full"
            colorPalette={member.color}
            justifyContent="center"
          >
            <Tag.Label>{member.name}</Tag.Label>
          </Tag.Root>
        </GridItem>
        <GridItem></GridItem>
      </Fragment>
    ))}
  </Grid>
);
