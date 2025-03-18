import { FC } from "react";
import { db } from "@/db";
import { transactions } from "@/db/schema/bank";
import { count } from "drizzle-orm";
import { Paginator } from "./Paginator";

export type TransactionsListProps = {
  accountId: number;
  page: number;
};

const LIMIT = 10;

export const TransactionsList: FC<TransactionsListProps> = async ({
  accountId,
  page,
}) => {
  const [rows, [{ total }]] = await Promise.all([
    db.query.transactions.findMany({
      where: (transactions, { eq }) => eq(transactions.accountId, accountId),
      orderBy: (transactions) => transactions.createdAt,
      offset: page * LIMIT,
      limit: LIMIT,
    }),
    db.select({ total: count() }).from(transactions),
  ]);

  return <Paginator count={total} page={page} size={LIMIT} />;
};
