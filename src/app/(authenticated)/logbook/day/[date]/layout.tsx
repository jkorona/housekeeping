import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { format, parse } from "date-fns";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@chakra-ui/react";
import { DateSwitcher } from "./components/DateSwitcher";

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
        <DateSwitcher
          date={dateObject}
          onChange={async (newDate) => {
            "use server";
            return redirect(`/logbook/day/${format(newDate, "yyyy-MM-dd")}`);
          }}
        />
      </Container>
      {children}
    </PageLayout>
  );
}
