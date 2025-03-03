import { FC, PropsWithChildren } from "react";
import { Chore } from "@/db/schema/chores";
import { Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { EditButton } from "./EditButton";
import { MdEdit } from "react-icons/md";
import { DeleteButton } from "./DeleteButton";

type ChoreCardProps = PropsWithChildren<{
  chore: Chore;
  onUpdate: (chore: Chore) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
}>;

export const ChoreCard: FC<ChoreCardProps> = ({ chore, onUpdate, onRemove }) => {
  return (
    <Grid
      boxShadow="md"
      p={4}
      gap={4}
      _hover={{ boxShadow: "lg" }}
      templateColumns="1fr min-content"
      alignItems={["center", "center", "flex-start"]}
    >
      <Stack>
        <Text textStyle="lg">
          {chore.name}
        </Text>
        <Text textStyle="xs" hideBelow="md">{chore.description}</Text>
      </Stack>
      <HStack gap="2">
        <EditButton
          value={chore}
          title="Edit member"
          icon={<MdEdit />}
          onSave={onUpdate}
        />
        <DeleteButton chore={chore} onDelete={onRemove} />
      </HStack>
    </Grid>
  );
};
