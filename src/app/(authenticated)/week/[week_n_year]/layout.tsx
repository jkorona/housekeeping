import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Container } from "@chakra-ui/react";
import { DateSwitcher } from "@/components/controls/DateSwitcher";
import { parseWeek } from "@/model/DateUtils";

export default async function LogbookLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ week_n_year: string }> }>) {
  const { week_n_year } = await params;
  const dateObject = parseWeek(week_n_year);

  return (
    <>
      <Container
        padding="3"
        marginBottom="3"
        borderBottomWidth="medium"
        borderBottomColor="green.700"
      >
        <DateSwitcher
          date={dateObject}
          mode="week"
          onChange={async (newDate) => {
            "use server";
            return redirect(`/week/${format(newDate, "I-R")}`);
          }}
        />
      </Container>
      {children}
    </>
  );
}
