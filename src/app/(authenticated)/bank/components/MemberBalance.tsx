import { FC } from "react";
import { Member } from "@/db/schema/chores";
import {
  Avatar,
  Flex,
  FormatNumber,
  HStack,
  Separator,
  Stack,
  Stat,
  Text,
} from "@chakra-ui/react";
import { fetchMemberBalance } from "@/db/actions/fetchMemberBalance";

export type MemberBalanceProps = {
  member: Member;
};

export const MemberBalance: FC<MemberBalanceProps> = async ({ member }) => {
  const balance = await fetchMemberBalance(member.id!);

  return (
    <Stack marginBottom="4">
      <Flex>
        <HStack gap="2">
          <Avatar.Root size="xl" colorPalette={member.color}>
            <Avatar.Fallback name={member.name} />
          </Avatar.Root>
          <Text textStyle="2xl">{member.name}</Text>
        </HStack>
        <Stat.Root alignItems="flex-end" size="sm">
          <Stat.Label>Balance</Stat.Label>
          <Stat.ValueText>
            <FormatNumber value={balance.at(0)?.total ?? 0} style="currency" currency="PLN" />
          </Stat.ValueText>
        </Stat.Root>
      </Flex>
      <Separator w="full" />
    </Stack>
  );
};
