import { FC } from "react";
import { db } from "@/db";
import { transactions } from "@/db/schema/bank";
import { count } from "drizzle-orm";
import { Paginator } from "./Paginator";
import { Table } from "@chakra-ui/react";
import { format } from "date-fns";

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
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    }),
    db.select({ total: count() }).from(transactions),
  ]);

  return (
    <>
      <Paginator count={total} page={page} size={LIMIT} />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader width="30%">Date</Table.ColumnHeader>
            <Table.ColumnHeader width="50%">Description</Table.ColumnHeader>
            <Table.ColumnHeader width="10%">Amount</Table.ColumnHeader>
            <Table.ColumnHeader width="10%" textAlign="end">
              Total
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                {format(row.createdAt, "cccc dd MMMM yyyy hh:mm")}
              </Table.Cell>
              <Table.Cell>{row.description}</Table.Cell>
              <Table.Cell>{row.amount}</Table.Cell>
              <Table.Cell textAlign="end">{row.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
