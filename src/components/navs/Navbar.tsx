import { Flex, Heading, HStack, Image } from "@chakra-ui/react";
import { Sigmar } from "next/font/google";
import { ColorModeButton } from "../ui/color-mode";
import { MainMenu } from "./MainMenu";

const sigmar = Sigmar({
  weight: "400",
  subsets: ["latin"],
});

export default async function Navbar() {
  return (
    <Flex maxHeight="4rem" boxShadow="lg" justifyContent="space-between">
      <HStack gap="4">
        <Image src="/housekeeping.png" alt="Logo" boxSize="4rem" />
        <Heading
          size="md"
          color="green.700"
          className={sigmar.className}
          hideBelow="md"
        >
          Housekeeping
        </Heading>
      </HStack>
      <HStack gap="4" paddingInline="4">
        <ColorModeButton />
        <MainMenu />
      </HStack>
    </Flex>
  );
}
