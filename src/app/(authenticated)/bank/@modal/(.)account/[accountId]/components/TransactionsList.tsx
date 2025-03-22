import { FC } from "react";
import { db } from "@/db";
import { transactions } from "@/db/schema/bank";
import { count, desc, eq } from "drizzle-orm";
import { Paginator } from "./Paginator";
import { Table, Text } from "@chakra-ui/react";
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
      orderBy: (transactions) => desc(transactions.createdAt),
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    }),
    db
      .select({ total: count() })
      .from(transactions)
      .where(eq(transactions.accountId, accountId)),
  ]);

  return (
    <>
      {total > LIMIT && <Paginator count={total} page={page} size={LIMIT} />}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader width="30%">Date</Table.ColumnHeader>
            <Table.ColumnHeader width="50%">Description</Table.ColumnHeader>
            <Table.ColumnHeader width="10%" textAlign="end">
              Amount
            </Table.ColumnHeader>
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
              <Table.Cell textAlign="end">
                <Text color={row.amount > 0 ? "green.600" : "red.600"}>
                  {row.amount}
                </Text>
              </Table.Cell>
              <Table.Cell textAlign="end">{row.total}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
