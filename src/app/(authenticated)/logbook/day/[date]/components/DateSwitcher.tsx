"use client";

import { FC } from "react";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import { LuArrowLeft, LuArrowRight, LuCalendarDays } from "react-icons/lu";
import { addDays, format, isToday, subDays } from "date-fns";
import { DatePicker } from "@/components/ui/date-picker";

export type WeekdaySwitcherProps = {
  date: Date;
  onChange: (date: Date) => void;
};

export const DateSwitcher: FC<WeekdaySwitcherProps> = ({ date, onChange }) => {
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
      <GridItem justifySelf="center" position="relative">
        <DatePicker
          selected={date}
          maxDate={new Date()}
          showMonthDropdown
          onChange={(date) => onChange(date!)}
          customInput={
            <Button
              variant="plain"
              size={{ base: "lg", mdDown: "md" }}
              _hover={{ textDecoration: "underline" }}
            >
              <LuCalendarDays />
              {format(date, "cccc dd MMMM yyyy")}
            </Button>
          }
        />
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
