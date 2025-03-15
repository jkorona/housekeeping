import {
  Heading,
  LinkBox,
  LinkOverlay,
  Table,
  Tag,
  Text,
} from "@chakra-ui/react";
import { fetchMembersBalances } from "@/db/actions/fetchMembersBalances";
import Link from "next/link";

export default async function BankPage() {
  const membersWithBalances = await fetchMembersBalances();

  return (
    <>
      <Heading as="h1" size="3xl" marginBottom="4">
        Bank
      </Heading>
      <Table.Root size="md" interactive colorPalette="green">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textStyle="md">Name</Table.ColumnHeader>
            <Table.ColumnHeader textStyle="md" textAlign="end">
              Balance
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {membersWithBalances.map(({ id, name, color, total }) => (
            <LinkBox key={id} asChild>
              <Table.Row _hover={{ cursor: "pointer" }}>
                <Table.Cell>
                  <Tag.Root
                    size="xl"
                    w="80px"
                    colorPalette={color}
                    justifyContent="center"
                  >
                    <Tag.Label>{name}</Tag.Label>
                  </Tag.Root>
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <LinkOverlay asChild>
                    <Link href={`/bank/account/${id}`}>
                      <Text textStyle="lg">{`${total} PLN`}</Text>
                    </Link>
                  </LinkOverlay>
                </Table.Cell>
              </Table.Row>
            </LinkBox>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
