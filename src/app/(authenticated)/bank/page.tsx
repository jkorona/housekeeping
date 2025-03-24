import { Heading, Table, Tag, Text } from "@chakra-ui/react";
import { fetchMembersBalances } from "@/db/actions/fetchMembersBalances";
import LinkTableRow from "./components/LinkTableRow";

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
            <LinkTableRow key={id} href={`/bank/account/${id}`}>
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
                <Text textStyle="lg">{`${total} PLN`}</Text>
              </Table.Cell>
            </LinkTableRow>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
