import { FC } from "react";
import { auth, signOut } from "@/auth";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Avatar,
  Button,
  HStack,
  Text,
  Flex,
  Image,
  Group,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import NextLink from "next/link";

const links = [
  { label: "Members", href: "/admin/members", icon: <CgProfile /> },
  { label: "Schedule", href: "/schedule/", icon: <AiOutlineSchedule /> },
];

export const MainMenu: FC = async () => {
  const session = await auth();
  return (
    <DrawerRoot size={["full", "xs"]}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <GiHamburgerMenu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <DrawerTitle color="green.700" paddingInline="4" fontSize="xl">
            <HStack gap="2">
              <Image
                src="/housekeeping.png"
                alt="Logo"
                boxSize="2rem"
                rounded="md"
              />
              Menu
            </HStack>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Flex direction="column">
            {links.map(({ label, icon, href }) => (
              <DrawerActionTrigger key={href} asChild>
                <Button
                  asChild
                  fontSize="lg"
                  variant="ghost"
                  width="full"
                  justifyContent="flex-start"
                >
                  <NextLink href={href}>
                    {icon}
                    {label}
                  </NextLink>
                </Button>
              </DrawerActionTrigger>
            ))}
          </Flex>
        </DrawerBody>
        {session?.user && (
          <DrawerFooter>
            <HStack gap="4" justifyContent="space-between" w="full">
              <Group>
                <Avatar.Root shape="rounded" size="md">
                  <Avatar.Fallback name={session.user.name!} />
                  <Avatar.Image src={session.user.image!} />
                </Avatar.Root>
                <Text>{session.user.name}</Text>
              </Group>
              <DrawerActionTrigger asChild>
                <Button
                  onClick={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <LuLogOut />
                </Button>
              </DrawerActionTrigger>
            </HStack>
          </DrawerFooter>
        )}
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
