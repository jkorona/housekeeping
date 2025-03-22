import { db } from "@/db";
import { FC } from "react";
import { MemberBalance } from "./MemberBalance";
import { TransactionForm } from "./TransactionForm";
import { fetchMemberBalance } from "@/db/actions/fetchMemberBalance";
import { transactions } from "@/db/schema/bank";
import { revalidatePath } from "next/cache";
import { TransactionsList } from "./TransactionsList";

export type AccountPageProps = {
  accountId: number;
  page: number;
};

export const AccountPage: FC<AccountPageProps> = async ({
  accountId,
  page,
}) => {
  const member = await db.query.members
    .findFirst({
      where: (members, { eq }) => eq(members.id, accountId),
    })
    .execute();

  return (
    <>
      {member && <MemberBalance member={member} />}
      <TransactionForm
        action={async (amount, description) => {
          "use server";
          const total = (await fetchMemberBalance(accountId)).at(0)?.total ?? 0;
          await db.insert(transactions).values({
            accountId,
            amount,
            description,
            total: total + amount,
          });
          revalidatePath("/bank");
          revalidatePath(`/bank/account/${accountId}`);
        }}
      />
      <TransactionsList accountId={+accountId} page={page ? page : 1} />
    </>
  );
};
