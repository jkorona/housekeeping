import { Center, GridItem, Spinner } from "@chakra-ui/react";

export default function MembersPageLoading() {
  return (
    <GridItem gridArea="content" asChild>
      <Center marginBlock={16}>
        <Spinner size="xl" borderWidth="4px" />
      </Center>
    </GridItem>
  );
}
