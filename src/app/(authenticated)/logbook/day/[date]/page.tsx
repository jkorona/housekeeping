import { db } from "@/db";
import { Fragment } from "react";
import { format, parse } from "date-fns";
import { revalidatePath } from "next/cache";
import { logs, WeekDay } from "@/db/schema/chores";
import { Grid, GridItem, HStack, Tag, Text } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
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
    where: (logs, { eq }) => eq(logs.date, dateObject),
  });

  if (dayAssignments.length === 0) {
    return <EmptyState />;
  }

  return (
    <Grid gridTemplateColumns="min-content 1fr">
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
                      done,
                      date: dateObject,
                      memberId: member.id,
                      skip: false,
                    })
                    .onConflictDoUpdate({
                      target: [logs.date, logs.memberId],
                      set: { done },
                    }).execute();
                  revalidatePath(`/logbook/day/${date}`);
                }}
              />
            </HStack>
          </GridItem>
        </Fragment>
      ))}
    </Grid>
  );
}
