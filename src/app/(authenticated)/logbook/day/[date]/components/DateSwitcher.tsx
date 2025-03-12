"use client";

import { ChangeEvent, FC, useRef } from "react";
import { Button, Grid, GridItem, Input } from "@chakra-ui/react";
import { LuArrowLeft, LuArrowRight, LuCalendarDays } from "react-icons/lu";
import { addDays, format, isToday, parse, subDays } from "date-fns";

export type WeekdaySwitcherProps = {
  date: Date;
  onChange: (date: Date) => void;
};

const DATE_FORMAT = "yyyy-MM-dd";

export const DateSwitcher: FC<WeekdaySwitcherProps> = ({ date, onChange }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handlePrevDay = () => {
    onChange(subDays(date, 1));
  };
  const handleNextDay = () => {
    onChange(addDays(date, 1));
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    onChange(parse(dateString, DATE_FORMAT, new Date()));
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
        <Button
          variant="plain"
          onClick={() => dateInputRef.current?.showPicker()}
          size={{ base: "lg", mdDown: "md" }}
          _hover={{ textDecoration: "underline" }}
        >
          <LuCalendarDays />
            {format(date, "cccc dd MMMM yyyy")}
        </Button>
        <Input
          type="date"
          value={format(date, DATE_FORMAT)}
          max={format(new Date(), DATE_FORMAT)}
          ref={dateInputRef}
          visibility="hidden"
          position="absolute"
          h="0"
          top="8"
          left="2"
          onChange={handleDateChange}
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
