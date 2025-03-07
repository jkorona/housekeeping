import { asc } from "drizzle-orm";
import { db } from "@/db";
import {
  assignments,
  chores,
  members,
  WeekDay,
  weekDaysList,
} from "@/db/schema/chores";
import { Table, Tag } from "@chakra-ui/react";
import { ChoreSelect } from "./components/ChoreSelect";
import { fetchAssignments } from "@/db/actions/fetchAssignments";

const workingDays = weekDaysList.slice(0, -1);

export default async function SchedulePage() {
  const membersList = await db.select().from(members).orderBy(asc(members.dateOfBirth));
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
    <Table.Root
      striped
      size="md"
      gridArea="content"
      marginBlock={8}
      colorPalette="green"
    >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader></Table.ColumnHeader>
          {workingDays.map((day) => (
            <Table.ColumnHeader
              key={`header_${day}`}
              paddingInline={5}
              textTransform="capitalize"
            >
              {day}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {membersList.map((member) => (
          <Table.Row key={member.id} height="3rem">
            <Table.Cell>
              <Tag.Root
                size="xl"
                w="full"
                colorPalette={member.color}
                justifyContent="center"
              >
                <Tag.Label>{member.name}</Tag.Label>
              </Tag.Root>
            </Table.Cell>
            {workingDays.map((day) => (
              <Table.Cell key={`${member.name}_${day}`}>
                <ChoreSelect
                  options={choresList}
                  value={schedule[day][member.id]}
                  onChange={async (choreId: number) => {
                    "use server";
                    await assignChoreToMember(day, member.id, choreId);
                  }}
                />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
