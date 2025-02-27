import { db } from "@/db";
import { eq } from "drizzle-orm";
import { Member, members } from "@/db/schema/chores";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import { EditButton } from "./EditButton";
import { revalidatePath } from "next/cache";

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
    <Box lg={{ maxW: "1024px", mx: "auto" }} my={4} px={4}>
      <HStack justifyContent="space-between" paddingInline={4}>
        <Heading as="h1" size="3xl">
          Members
        </Heading>
        <EditButton
          title="Add new member"
          icon={<MdAdd />}
          onSave={createMemeber}
        />
      </HStack>
      <Flex direction="column" gap={2} mt={8}>
        {results.length === 0 && <Box>No members found</Box>}
        {results.map((member) => (
          <HStack
            key={member.id}
            boxShadow="md"
            p={4}
            gap={4}
            _hover={{ boxShadow: "lg" }}
          >
            <Avatar.Root bg={member.color}>
              <Avatar.Fallback name={member.name} />
            </Avatar.Root>
            <Text textStyle="lg">{member.name}</Text>
            <HStack
              justifyContent="flex-end"
              alignItems="flex-end"
              w="full"
              gap="2"
            >
              <EditButton
                value={member}
                title="Edit member"
                icon={<MdEdit />}
                onSave={updateMember}
              />
              <Button
                variant="subtle"
                onClick={removeMember.bind(null, member.id)}
              >
                <MdDelete />
              </Button>
            </HStack>
          </HStack>
        ))}
      </Flex>
    </Box>
  );
}
