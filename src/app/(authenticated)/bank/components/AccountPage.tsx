import { db } from "@/db";
import { FC } from "react";
import { MemberBalance } from "./MemberBalance";
import { TransactionForm } from "./TransactionForm";
import { revalidatePath } from "next/cache";
import { TransactionsList } from "./TransactionsList";
import { postTransaction } from "@/db/actions/postTransaction";

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
          await postTransaction(accountId, amount, description);
          revalidatePath("/bank");
          revalidatePath(`/bank/account/${accountId}`);
        }}
      />
      <TransactionsList accountId={+accountId} page={page ? page : 1} />
    </>
  );
};
