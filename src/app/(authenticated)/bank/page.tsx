import { db } from "@/db";
import { transactions } from "@/db/schema/bank";
import { members } from "@/db/schema/chores";
import { Heading } from "@chakra-ui/react";
import { desc } from "drizzle-orm";

export default async function BankPage() {
  const latestTransactions = await db
    .selectDistinctOn([transactions.accountId])
    .from(transactions)
    .orderBy(transactions.accountId, desc(transactions.createdAt));
  const transactionToAccount = latestTransactions.reduce(
    (acc, transaction) => ({ ...acc, [transaction.accountId]: transaction }),
    {}
  );

  const membersList = await db.query.members
    .findMany({
      orderBy: members.dateOfBirth,
    })
    .execute();

  return (
    <>
      <Heading as="h1" size="3xl">
        Bank
      </Heading>
      {JSON.stringify(membersList, null, 3)}
      {JSON.stringify(transactionToAccount, null, 3)}
    </>
  );
}
