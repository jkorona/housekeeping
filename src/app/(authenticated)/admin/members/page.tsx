import { db } from "@/db";
import { members } from "@/db/schema/chores";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { EditButton } from "./EditButton";

export const dynamic = "force-dynamic"; // Forces dynamic rendering

export default async function MembersPage() {
  const results = await db.select().from(members);

  return (
    <Box lg={{ maxW: "1024px", mx: "auto" }} my={4} px={4}>
      <Heading as="h1" size="3xl">
        Members
      </Heading>
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
            <Avatar.Root colorPalette={member.color}>
              <Avatar.Fallback name={member.name} />
            </Avatar.Root>
            <Text textStyle="lg">{member.name}</Text>
            <HStack
              justifyContent="flex-end"
              alignItems="flex-end"
              w="full"
              gap="2"
            >
              <EditButton id={member.id} />
              <Button variant="subtle">
                <MdDelete />
              </Button>
            </HStack>
          </HStack>
        ))}
      </Flex>
    </Box>
  );
}
