import { db } from "@/db";
import { transactions } from "@/db/schema/bank";
import { members } from "@/db/schema/chores";
import { desc, eq, sql } from "drizzle-orm";

export const fetchMembersBalances = async () =>
  await db
    .selectDistinct({
      id: members.id,
      name: members.name,
      color: members.color,
      total: sql<number>`COALESCE(last_transaction.total, 0)`.as("total"),
    })
    .from(members)
    .orderBy(members.dateOfBirth)
    .leftJoin(
      db
        .selectDistinctOn([transactions.accountId])
        .from(transactions)
        .orderBy(transactions.accountId, desc(transactions.createdAt))
        .as("last_transaction"),
      eq(members.id, sql.raw("last_transaction.account_id"))
    );
