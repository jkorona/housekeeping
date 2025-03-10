"use client";

import { FC } from "react";
import { Button, Grid, GridItem, Heading } from "@chakra-ui/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { addDays, format, isToday, subDays } from "date-fns";

export type WeekdaySwitcherProps = {
  date: Date;
  onChange: (date: Date) => void;
};

export const DateSwitcher: FC<WeekdaySwitcherProps> = ({
  date,
  onChange,
}) => {

  const handlePrevDay = () => {
    onChange(subDays(date, 1));
  };
  const handleNextDay = () => {
    onChange(addDays(date, 1));
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
        <Heading size={{ base: "lg", mdDown: 'md'}} textTransform="capitalize">
          {format(date, 'cccc dd MMMM yyyy')}
        </Heading>
      </GridItem>
      <GridItem justifySelf="flex-end" asChild>
        <Button
          minW="1.5rem"
          minH="1.5rem"
          maxW="1.5rem"
          maxH="1.5rem"
          p="0"
          variant="outline"
          borderRadius={100}
          disabled={isToday(date)}
          onClick={handleNextDay}
        >
          <LuArrowRight />
        </Button>
      </GridItem>
    </Grid>
  );
};
