import { FC, PropsWithChildren } from "react";
import { Chore } from "@/db/schema/chores";
import { Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { EditButton } from "./EditButton";
import { MdEdit } from "react-icons/md";

type ChoreCardProps = PropsWithChildren<{
  chore: Chore;
  onUpdate: (chore: Chore) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
}>;

export const ChoreCard: FC<ChoreCardProps> = ({ chore, onUpdate }) => {
  return (
    <Grid
      boxShadow="md"
      p={4}
      gap={4}
      _hover={{ boxShadow: "lg" }}
      templateColumns="1fr min-content"
      alignItems="flex-start"
    >
      <Stack gap={2}>
        <Text textStyle="lg">
          {chore.name}
        </Text>
        <Text textStyle="xs" hideBelow="md">{chore.description}</Text>
      </Stack>
      <HStack justifyContent="flex-end" alignItems="flex-end" w="full" gap="2">
        <EditButton
          value={chore}
          title="Edit member"
          icon={<MdEdit />}
          onSave={onUpdate}
        />
        {/* <DeleteButton member={member} onDelete={onRemove} /> */}
      </HStack>
    </Grid>
  );
};
