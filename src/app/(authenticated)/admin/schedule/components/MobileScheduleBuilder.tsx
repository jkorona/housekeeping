"use client";
import React, { FC, Fragment, useState } from "react";
import { Schedule } from "@/db/actions/fetchAssignments";
import { Chore, Member, WeekDay, weekDays } from "@/db/schema/chores";
import { Grid, GridItem, Tag } from "@chakra-ui/react";
import { WeekdaySwitcher } from "./WeekdaySwitcher";
import { ChoreSelect } from "./ChoreSelect";

export type MobileScheduleBuilderProps = {
  schedule: Schedule;
  members: Member[];
  chores: Chore[];
  onChange: (weekDay: WeekDay, memberId: number, choreId: number) => void;
};

export const MobileScheduleBuilder: FC<MobileScheduleBuilderProps> = ({
  schedule,
  members,
  chores,
  onChange,
}) => {
  const [currentDay, setCurrentDay] = useState<WeekDay>(weekDays.enumValues[0]);
  return (
    <Grid gridTemplateColumns="min-content 1fr" hideFrom="md">
      <GridItem
        padding="3"
        borderBottomWidth="medium"
        borderBottomColor="green.700"
      />
      <GridItem
        padding="3"
        borderBottomWidth="medium"
        borderBottomColor="green.700"
      >
        <WeekdaySwitcher day={currentDay} onChange={setCurrentDay} />
      </GridItem>
      {members.map((member) => (
        <Fragment key={`${member.id!}_${currentDay}`}>
          <GridItem padding="3">
            <Tag.Root
              size="xl"
              w="full"
              colorPalette={member.color}
              justifyContent="center"
            >
              <Tag.Label>{member.name}</Tag.Label>
            </Tag.Root>
          </GridItem>
          <GridItem
            padding="3"
            alignSelf="center"
            animationName="fade-in, fade-out"
            animationDuration="slow"
          >
            <ChoreSelect
              options={chores}
              value={schedule[currentDay][member.id!]}
              onChange={onChange.bind(null, currentDay, member.id!)}
            />
          </GridItem>
        </Fragment>
      ))}
    </Grid>
  );
};
