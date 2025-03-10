import { FC, PropsWithChildren } from "react";
import { Grid } from "@chakra-ui/react";

export const PageLayout: FC<PropsWithChildren> = ({ children }) => (
  <Grid lg={{ maxW: "1024px", mx: "auto" }} my={4} px={4}>
    {children}
  </Grid>
);
