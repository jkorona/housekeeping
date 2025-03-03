import { FC } from "react";
import { MdEdit } from "react-icons/md";
import { Avatar, HStack, Text } from "@chakra-ui/react";
import { Member } from "@/db/schema/chores";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";

type MemberCardProps = {
  member: Member;
  onSave: (value: Member) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
};

export const MemberCard: FC<MemberCardProps> = ({
  member,
  onSave,
  onRemove,
}) => (
  <HStack boxShadow="md" p={4} gap={4} _hover={{ boxShadow: "lg" }}>
    <Avatar.Root colorPalette={member.color}>
      <Avatar.Fallback name={member.name} />
    </Avatar.Root>
    <Text textStyle="lg">{member.name}</Text>
    <HStack justifyContent="flex-end" alignItems="flex-end" w="full" gap="2">
      <EditButton
        value={member}
        title="Edit member"
        icon={<MdEdit />}
        onSave={onSave}
      />
      <DeleteButton member={member} onDelete={onRemove} />
    </HStack>
  </HStack>
);
