import { db } from "@/db";
import { logs, WeekDay } from "@/db/schema/chores";
import { Grid, GridItem, HStack, Tag, Text } from "@chakra-ui/react";
import { format, parse } from "date-fns";
import { Fragment } from "react";
import { DateSwitcher } from "./components/DateSwitcher";
import { redirect } from "next/navigation";
import { LogControls } from "./components/LogControls";

type DaySchedulePageProps = {
  params: Promise<{ date: string }>;
};

export default async function DaySchedulePage({
  params,
}: DaySchedulePageProps) {
  const { date } = await params;

  const dateObject = parse(date, "yyyy-MM-dd", new Date());
  const weekDay = format(dateObject, "EEEE").toLowerCase() as WeekDay;

  const dayAssignments = await db.query.assignments.findMany({
    where: (assignments, { eq }) => eq(assignments.weekDay, weekDay),
    with: {
      member: true,
      chore: true,
    },
  });

  const dayLogs = await db.query.logs.findMany({
    where: (logs, { eq }) => eq(logs.date, date),
  });

  return (
    <Grid gridTemplateColumns="min-content 1fr">
      <GridItem
        padding="3"
        colSpan={2}
        borderBottomWidth="medium"
        borderBottomColor="green.700"
      >
        <DateSwitcher
          date={dateObject}
          onChange={async (newDate) => {
            "use server";
            return redirect(`/logbook/day/${format(newDate, "yyyy-MM-dd")}`);
          }}
        />
      </GridItem>
      {dayAssignments.map(({ member, chore }) => (
        <Fragment key={`${member.id!}_${weekDay}`}>
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
          <GridItem padding="3" alignSelf="center">
            <HStack justifyContent="space-between">
              <Text textStyle={{ base: "lg", mdDown: "sm" }}>{chore.name}</Text>
              <LogControls
                log={dayLogs.find(({ memberId }) => memberId === member.id)}
                onChange={async (done: boolean) => {
                  "use server";
                  await db
                    .insert(logs)
                    .values({
                      date,
                      done,
                      memberId: member.id,
                      skip: false,
                    })
                    .onConflictDoUpdate({
                      target: [logs.date, logs.memberId],
                      set: { done },
                    });
                }}
              />
            </HStack>
          </GridItem>
        </Fragment>
      ))}
    </Grid>
  );
}
