import { db } from "@/db";
import { chores } from "@/db/schema/chores";
import { GridItem } from "@chakra-ui/react";

export default async function ChoresSchedulePage() {
  const results = await db.select().from(chores);

  // const updateChore = async (chore: Chore) => {
  //   "use server";
  //   await db.update(chores).set(chore).where(eq(chores.id, chore.id!));
  //   revalidatePath("/admin/chores");
  // };

  // const createChore = async (chore: Chore) => {
  //   "use server";
  //   await db.insert(chores).values(chore);
  //   revalidatePath("/admin/chores");
  // };

  // const removeChore = async (id: number) => {
  //   "use server";
  //   await db.delete(chores).where(eq(chores.id, id));
  //   revalidatePath("/admin/chores");
  // };

  return (
    <>
      <GridItem gridArea="add" justifySelf="flex-end" pr={4}></GridItem>
      <GridItem gridArea="content" asChild>
        <div>{results.length}</div>
      </GridItem>
    </>
  );
}
