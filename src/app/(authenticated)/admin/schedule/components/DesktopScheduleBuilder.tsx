import { FC } from "react";
import { Table, Tag } from "@chakra-ui/react";
import { Chore, Member, WeekDay, weekDaysList } from "@/db/schema/chores";
import { Schedule } from "@/db/actions/fetchAssignments";
import { ChoreSelect } from "./ChoreSelect";

const workingDays = weekDaysList.slice(0, -1);

export type DesktopScheduleBuilderProps = {
  schedule: Schedule;
  members: Member[];
  chores: Chore[];
  onChange: (weekDay: WeekDay, memberId: number, choreId: number) => void;
};

export const DesktopScheduleBuilder: FC<DesktopScheduleBuilderProps> = ({
  schedule,
  members,
  chores,
  onChange,
}) => (
  <Table.Root
    striped
    size="md"
    colorPalette="green"
    hideBelow="md"
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
      {members.map((member: Member) => (
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
                options={chores}
                value={schedule[day][member.id!]}
                onChange={onChange.bind(null, day, member.id!)}
              />
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
