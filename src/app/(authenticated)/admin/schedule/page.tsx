import { db } from "@/db";
import { chores, members, weekDaysList } from "@/db/schema/chores";
import { Table, Tag } from "@chakra-ui/react";
import { ChoreSelect } from "./components/ChoreSelect";

export default async function SchedulePage() {
  const membersList = await db.select().from(members);
  const choresList = await db.select().from(chores);

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
          {weekDaysList.map((day) => (
            <Table.ColumnHeader
              key={`header_${day}`}
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
              <Tag.Root size="xl" colorPalette={member.color}>
                <Tag.Label>{member.name}</Tag.Label>
              </Tag.Root>
            </Table.Cell>
            {weekDaysList.map((day) => (
              <Table.Cell key={`${member.name}_${day}`}>
                <ChoreSelect values={choresList} />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
