import { db } from "@/db";
import { Fragment } from "react";
import { compareAsc, format, getWeek, getYear, parse } from "date-fns";
import { revalidatePath } from "next/cache";
import { Container, Grid, GridItem, HStack, Tag, Text } from "@chakra-ui/react";
import { logs, WeekDay } from "@/db/schema/chores";
import { EmptyState } from "@/components/ui/empty-state";
import { WeekSummary } from "@/app/(authenticated)/component/WeekSummary";
import { LogControls } from "./components/LogControls";

type DaySchedulePageProps = {
  params: Promise<{ date: string }>;
};

export default async function DaySchedulePage({
  params,
}: DaySchedulePageProps) {
  const { date } = await params;

  const dateWithTz = parse(date, "yyyy-MM-dd", new Date());
  const dateObject = new Date(
    Date.UTC(
      dateWithTz.getFullYear(),
      dateWithTz.getMonth(),
      dateWithTz.getDate()
    )
  );
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

  if (weekDay === "sunday") {
    return (
      <Container marginBlock="7">
        <WeekSummary
          week={getWeek(dateObject, { weekStartsOn: 1 })}
          year={getYear(dateObject)}
        />
      </Container>
    );
  }

  if (dayAssignments.length === 0) {
    return <EmptyState />;
  }

  return (
    <Grid gridTemplateColumns="min-content 1fr">
      <HStack
        justifyContent="flex-end"
        gridColumn="span 2"
        gap="4"
        paddingTop="3"
        paddingRight="6"
      >
        <Text textStyle="xs" fontWeight="semibold">
          Done
        </Text>
        <Text textStyle="xs" fontWeight="semibold">
          Skip
        </Text>
      </HStack>
      {dayAssignments
        .sort((a, b) => compareAsc(a.member.dateOfBirth, b.member.dateOfBirth))
        .map(({ member, chore }) => {
          const log = dayLogs.find(({ memberId }) => memberId === member.id);
          return (
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
                  <Text
                    textStyle={{ base: "lg", mdDown: "sm" }}
                    {...(log?.skip ? { textDecoration: "line-through" } : {})}
                  >
                    {chore.name}
                  </Text>
                  <LogControls
                    log={log}
                    onChange={async (done: boolean, skip: boolean) => {
                      "use server";
                      await db
                        .insert(logs)
                        .values({
                          done,
                          date: dateObject,
                          memberId: member.id,
                          skip,
                        })
                        .onConflictDoUpdate({
                          target: [logs.date, logs.memberId],
                          set: { done, skip },
                        })
                        .execute();
                      revalidatePath(`/logbook/day/${date}`);
                    }}
                  />
                </HStack>
              </GridItem>
            </Fragment>
          );
        })}
    </Grid>
  );
}
