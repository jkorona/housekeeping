import { db } from "..";
import { transactions } from "../schema/bank";
import { fetchMemberBalance } from "./fetchMemberBalance";

export const postTransaction = async (
  accountId: number,
  amount: number,
  description?: string
) => {
  const total = (await fetchMemberBalance(accountId)).at(0)?.total ?? 0;
  await db.insert(transactions).values({
    accountId,
    amount,
    description,
    total: total + amount,
  });
};
