import { fetchMembersBalances } from "@/db/actions/fetchMembersBalances";
import { Grid, GridItem, Heading, HStack, Tag, Text } from "@chakra-ui/react";
import { Fragment } from "react";

export default async function BankPage() {
  const membersWithBalances = await fetchMembersBalances();

  return (
    <>
      <Heading as="h1" size="3xl">
        Bank
      </Heading>
      <Grid gridTemplateColumns="min-content 1fr">
        {membersWithBalances.map(({ id, name, color, total }) => (
          <Fragment key={`${id}`}>
            <GridItem padding="3">
              <Tag.Root
                size="xl"
                w="full"
                colorPalette={color}
                justifyContent="center"
              >
                <Tag.Label>{name}</Tag.Label>
              </Tag.Root>
            </GridItem>
            <GridItem padding="3" alignSelf="center" justifySelf="flex-end">
              <HStack justifyContent="space-between">
                <Text textStyle="xl">{`${total} PLN`}</Text>
              </HStack>
            </GridItem>
          </Fragment>
        ))}
      </Grid>
    </>
  );
}
