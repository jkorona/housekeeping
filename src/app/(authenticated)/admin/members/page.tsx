import { db } from "@/db";
import { eq } from "drizzle-orm";
import { Member, members } from "@/db/schema/chores";
import { Flex, GridItem } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import { MdAdd } from "react-icons/md";
import { EditButton } from "./components/EditButton";
import { revalidatePath } from "next/cache";
import { MemberCard } from "./components/MemberCard";

export default async function MembersPage() {
  const results = await db.select().from(members);

  const updateMember = async (member: Member) => {
    "use server";
    await db.update(members).set(member).where(eq(members.id, member.id!));
    revalidatePath("/admin/members");
  };

  const createMemeber = async (member: Member) => {
    "use server";
    await db.insert(members).values(member);
    revalidatePath("/admin/members");
  };

  const removeMember = async (id: number) => {
    "use server";
    await db.delete(members).where(eq(members.id, id));
    revalidatePath("/admin/members");
  };

  return (
    <>
      <GridItem gridArea="add" justifySelf="flex-end" pr={4}>
        <EditButton
          title="Add new member"
          icon={<MdAdd />}
          onSave={createMemeber}
        />
      </GridItem>
      <GridItem gridArea="content" asChild>
        <Flex direction="column" gap={2} mt={8}>
          {results.length === 0 && <EmptyState />}
          {results.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onSave={updateMember}
              onRemove={removeMember}
            />
          ))}
        </Flex>
      </GridItem>
    </>
  );
}
