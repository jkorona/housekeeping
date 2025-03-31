import { PropsWithChildren } from "react";
import { parse } from "date-fns";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@chakra-ui/react";
import { DateSwitcher } from "@/components/controls/DateSwitcher";

export default async function LogbookLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ date: string }> }>) {
  const { date } = await params;

  const dateObject = parse(date, "yyyy-MM-dd", new Date());
  return (
    <PageLayout>
      <Container
        padding="3"
        borderBottomWidth="medium"
        borderBottomColor="green.700"
      >
        <DateSwitcher date={dateObject} baseUrl="/logbook/day" mode="date" />
      </Container>
      {children}
    </PageLayout>
  );
}
