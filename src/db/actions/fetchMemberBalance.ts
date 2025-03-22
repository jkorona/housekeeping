import { desc, eq } from "drizzle-orm";
import { transactions } from "../schema/bank";
import { db } from "..";

export const fetchMemberBalance = async (memberId: number) => {
  return await db
    .selectDistinct()
    .from(transactions)
    .where(eq(transactions.accountId, memberId))
    .orderBy(transactions.accountId, desc(transactions.createdAt));
};
