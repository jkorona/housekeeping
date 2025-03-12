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
  Stack,
  Separator,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  LuCalendarCheck,
  LuHammer,
  LuLogOut,
  LuPiggyBank,
  LuSwords,
  LuUsers,
} from "react-icons/lu";
import NextLink from "next/link";

const links = [
  { label: "Logbook", href: "/logbook/", icon: <LuCalendarCheck /> },
  { label: "Bank", href: "/bank/", icon: <LuPiggyBank /> },
  { separator: true },
  { label: "Members", href: "/admin/members", icon: <LuUsers /> },
  { label: "Chores", href: "/admin/chores", icon: <LuSwords /> },
  { label: "Schedule", href: "/admin/schedule", icon: <LuHammer /> },
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
            {links.map(({ label, icon, href, separator }) => {
              if (separator) {
                return <Separator key="separator" variant="solid" size="sm" />;
              }
              return (
                <DrawerActionTrigger key={href} asChild>
                  <Button
                    asChild
                    fontSize="lg"
                    variant="ghost"
                    width="full"
                    justifyContent="flex-start"
                  >
                    <NextLink href={href!}>
                      {icon}
                      {label}
                    </NextLink>
                  </Button>
                </DrawerActionTrigger>
              );
            })}
          </Flex>
        </DrawerBody>
        {session?.user && (
          <DrawerFooter>
            <HStack gap="4" justifyContent="space-between" w="full">
              <HStack gap="4">
                <Avatar.Root shape="rounded" size="md">
                  <Avatar.Fallback name={session.user.name!} />
                  <Avatar.Image src={session.user.image!} />
                </Avatar.Root>
                <Stack gap="0">
                  <Text fontWeight="medium">{session.user.name}</Text>
                  <Text color="fg.muted" textStyle="sm">
                    {session.user.email}
                  </Text>
                </Stack>
              </HStack>
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
