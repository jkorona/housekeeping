"use client";

import { FC } from "react";
import { WeekDay, weekDaysList } from "@/db/schema/chores";
import { Button, Grid, GridItem, Heading } from "@chakra-ui/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const workingDays = weekDaysList.slice(0, -1);

export type WeekdaySwitcherProps = {
  day: WeekDay;
  onChange: (day: WeekDay) => void;
};

export const WeekdaySwitcher: FC<WeekdaySwitcherProps> = ({
  day,
  onChange,
}) => {
  const currentIndex = workingDays.indexOf(day);
  const handlePrevDay = () => {
    const prevIndex =
      currentIndex - 1 < 0 ? workingDays.length - 1 : currentIndex - 1;
    onChange(workingDays[prevIndex]);
  };
  const handleNextDay = () => {
    const nextIndex = (currentIndex + 1) % workingDays.length;
    onChange(workingDays[nextIndex]);
  };

  return (
    <Grid gridTemplateColumns="min-content 1fr min-content" alignItems="center">
      <GridItem justifySelf="flex-start" asChild>
        <Button
          minW="1.5rem"
          minH="1.5rem"
          maxW="1.5rem"
          maxH="1.5rem"
          p="0"
          borderRadius={100}
          variant="outline"
          onClick={handlePrevDay}
        >
          <LuArrowLeft />
        </Button>
      </GridItem>
      <GridItem justifySelf="center" asChild>
        <Heading size="lg" textTransform="capitalize">
          {day}
        </Heading>
      </GridItem>
      <GridItem justifySelf="flex-end" asChild>
        <Button
          minW="1.5rem"
          minH="1.5rem"
          maxW="1.5rem"
          maxH="1.5rem"
          p="0"
          borderRadius={100}
          variant="outline"
          onClick={handleNextDay}
        >
          <LuArrowRight />
        </Button>
      </GridItem>
    </Grid>
  );
};
