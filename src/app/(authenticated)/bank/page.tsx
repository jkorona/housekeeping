import { db } from "@/db";
import { transactions } from "@/db/schema/bank";
import { members } from "@/db/schema/chores";
import { Heading } from "@chakra-ui/react";
import { desc, eq, sql } from "drizzle-orm";

export default async function BankPage() {
  const latestTransactionsByAccount = await db
    .selectDistinct({
      id: members.id,
      name: members.name,
      total: sql`COALESCE(last_transaction.total, 0)`.as("total"),
    })
    .from(members)
    .leftJoin(
      db
        .selectDistinctOn([transactions.accountId])
        .from(transactions)
        .orderBy(transactions.accountId, desc(transactions.createdAt))
        .as("last_transaction"),
      eq(members.id, sql.raw("last_transaction.account_id"))
    );

  return (
    <>
      <Heading as="h1" size="3xl">
        Bank
      </Heading>
      {JSON.stringify(latestTransactionsByAccount, null, 3)}
    </>
  );
}
