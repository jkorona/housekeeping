import { auth, signOut } from "@/auth";
import { ColorModeButton } from "@/components/ui/color-mode";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";

export default async function Page() {
  const session = await auth();

  return (
    <Center w="100vw" h="100vh">
      <Box p="4" borderRadius="lg" boxShadow="lg">
        {session?.user && (
          <Flex gap="4">
            <Avatar.Root shape="rounded" size="xl">
              <Avatar.Fallback name={session.user.name!} />
              <Avatar.Image src={session.user.image!} />
            </Avatar.Root>
            <VStack align="start" gap="1">
              <Text>{session.user.name}</Text>
              <Text>{session.user.email}</Text>
              <HStack gap="4">
                <Button
                  onClick={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <LuLogOut />
                  Logout
                </Button>
                <ColorModeButton />
              </HStack>
            </VStack>
          </Flex>
        )}
      </Box>
    </Center>
  );
}
