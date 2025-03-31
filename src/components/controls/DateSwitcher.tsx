"use client";
import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  format,
  addDays,
  addWeeks,
  isToday,
  subDays,
  subWeeks,
} from "date-fns";
import { LuArrowLeft, LuArrowRight, LuCalendarDays } from "react-icons/lu";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import { DatePicker } from "@/components/ui/date-picker";
import { formatLongDate, formatWeek } from "@/model/Formats";

export type WeekdaySwitcherProps = {
  date: Date;
  baseUrl: string;
  mode?: "date" | "week";
};

const formatDate = (date: Date, mode: "date" | "week") =>
  format(date, mode === "date" ? "yyyy-MM-dd" : "I-R");

const dateUrl = (baseUrl: string, current: Date, mode: "date" | "week") =>
  `${baseUrl}/${formatDate(current, mode)}`;

const nextPageUrl = (baseUrl: string, current: Date, mode: "date" | "week") =>
  dateUrl(
    baseUrl,
    mode === "date" ? addDays(current, 1) : addWeeks(current, 1),
    mode
  );

const prevPageUrl = (baseUrl: string, current: Date, mode: "date" | "week") =>
  dateUrl(
    baseUrl,
    mode === "date" ? subDays(current, 1) : subWeeks(current, 1),
    mode
  );

export const DateSwitcher: FC<WeekdaySwitcherProps> = ({
  date,
  mode = "date",
  baseUrl,
}) => {
  const router = useRouter();
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
          asChild
        >
          <Link href={prevPageUrl(baseUrl, date, mode)}>
            <LuArrowLeft />
          </Link>
        </Button>
      </GridItem>
      <GridItem justifySelf="center" position="relative">
        <DatePicker
          selected={date}
          maxDate={new Date()}
          calendarStartDay={1}
          todayButton
          showMonthDropdown
          showWeekNumbers={mode === "week"}
          showWeekPicker={mode === "week"}
          onChange={(date) => router.push(dateUrl(baseUrl, date!, mode))}
          customInput={
            <Button
              variant="plain"
              size={{ base: "lg", mdDown: "md" }}
              _hover={{ textDecoration: "underline" }}
            >
              <LuCalendarDays />
              {mode === "date" && formatLongDate(date)}
              {mode === "week" && formatWeek(date)}
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
        >
          <Link href={nextPageUrl(baseUrl, date, mode)}>
            <LuArrowRight />
          </Link>
        </Button>
      </GridItem>
    </Grid>
  );
};
