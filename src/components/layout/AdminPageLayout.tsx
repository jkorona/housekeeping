import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export type AdminPageLayoutProps = PropsWithChildren<{
  title: string;
}>;

export const AdminPageLayout: FC<AdminPageLayoutProps> = ({
  children,
  title,
}) => {
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
          {title}
        </Heading>
      </GridItem>
      {children}
    </Grid>
  );
};
