import { auth, signOut } from "@/auth";
import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { Sigmar } from "next/font/google";
import { LuLogOut } from "react-icons/lu";
import { ColorModeButton } from "../ui/color-mode";

const sigmar = Sigmar({
  weight: "400",
  subsets: ["latin"],
});

export default async function Navbar() {
  const session = await auth();

  return (
    <Flex maxHeight="4rem" boxShadow="lg" justifyContent="space-between">
      <HStack gap="4">
        <Image src="/housekeeping.png" alt="Logo" boxSize="4rem" />
        <Heading
          size="md"
          color="green.600"
          className={sigmar.className}
          hideBelow="md"
        >
          Housekeeping
        </Heading>
      </HStack>
      {session?.user && (
        <HStack gap="4" paddingInline="4">
          <ColorModeButton />
          <Avatar.Root shape="rounded" size="md">
            <Avatar.Fallback name={session.user.name!} />
            <Avatar.Image src={session.user.image!} />
          </Avatar.Root>
          <Button
            onClick={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <LuLogOut />
            <Text hideBelow="md">Logout</Text>
          </Button>
        </HStack>
      )}
    </Flex>
  );
}
