import { PropsWithChildren } from "react";
import { Grid, GridItem, Heading } from "@chakra-ui/react";

export default function MembersPageLayout({ children }: PropsWithChildren) {
  return (
    <Grid
      lg={{ maxW: "1024px", mx: "auto" }}
      my={4}
      px={4}
      templateColumns="repeat(2, 1fr)"
      templateAreas="'title add' 'content content'"
    >
      <GridItem asChild gridArea="title">
        <Heading as="h1" size="3xl">
          Members
        </Heading>
      </GridItem>
      {children}
    </Grid>
  );
}
