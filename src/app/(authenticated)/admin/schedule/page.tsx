import { asc } from "drizzle-orm";
import { db } from "@/db";
import { Box } from "@chakra-ui/react";
import { assignments, chores, members, WeekDay } from "@/db/schema/chores";
import { fetchAssignments } from "@/db/actions/fetchAssignments";
import { DesktopScheduleBuilder } from "./components/DesktopScheduleBuilder";
import { MobileScheduleBuilder } from "./components/MobileScheduleBuilder";

export default async function SchedulePage() {
  const membersList = await db
    .select()
    .from(members)
    .orderBy(asc(members.dateOfBirth));
  const choresList = await db.select().from(chores);
  const schedule = await fetchAssignments();

  const assignChoreToMember = async (
    weekDay: WeekDay,
    memberId: number,
    choreId: number
  ) => {
    "use server";

    await db
      .insert(assignments)
      .values({ weekDay, choreId, memberId })
      .onConflictDoUpdate({
        target: [assignments.weekDay, assignments.memberId],
        set: { choreId },
      });
  };

  return (
    <Box gridArea="content" marginBlock={8}>
      <MobileScheduleBuilder
        schedule={schedule}
        members={membersList}
        chores={choresList}
        onChange={assignChoreToMember}
      />
      <DesktopScheduleBuilder
        schedule={schedule}
        members={membersList}
        chores={choresList}
        onChange={assignChoreToMember}
      />
    </Box>
  );
}
