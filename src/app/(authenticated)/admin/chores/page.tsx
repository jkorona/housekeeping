import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Flex, GridItem } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import { Chore, chores } from "@/db/schema/chores";
import { db } from "@/db";
import { ChoreCard } from "./components/ChoreCard";
import { EditButton } from "./components/EditButton";
import { MdAdd } from "react-icons/md";

export default async function ChoresSchedulePage() {
  const results = await db.select().from(chores);

  const updateChore = async (chore: Chore) => {
    "use server";
    await db.update(chores).set(chore).where(eq(chores.id, chore.id!));
    revalidatePath("/admin/chores");
  };

  const createChore = async (chore: Chore) => {
    "use server";
    await db.insert(chores).values(chore);
    revalidatePath("/admin/chores");
  };

  const removeChore = async (id: number) => {
    "use server";
    await db.delete(chores).where(eq(chores.id, id));
    revalidatePath("/admin/chores");
  };

  return (
    <>
      <GridItem gridArea="add" justifySelf="flex-end" pr={4}>
        <EditButton
          title="Add new chore"
          icon={<MdAdd />}
          onSave={createChore}
        />
      </GridItem>
      <GridItem gridArea="content" asChild>
        <GridItem gridArea="content" asChild>
          <Flex direction="column" gap={2} mt={8}>
            {results.length === 0 && <EmptyState />}
            {results.map((chore) => (
              <ChoreCard
                key={chore.id}
                chore={chore}
                onUpdate={updateChore}
                onRemove={removeChore}
              />
            ))}
          </Flex>
        </GridItem>
      </GridItem>
    </>
  );
}
