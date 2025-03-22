import React from "react";
import { db } from "@/db";
import { AccountModal } from "./components/AccountModal";
import { TransactionsList } from "./components/TransactionsList";
import { MemberBalance } from "./components/MemberBalance";
import { TransactionForm } from "./components/TransactionForm";
import { transactions } from "@/db/schema/bank";
import { fetchMemberBalance } from "@/db/actions/fetchMemberBalance";
import { revalidatePath } from "next/cache";

export default async function AccountModalPage({
  params,
  searchParams,
}: {
  params: Promise<{ accountId: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { accountId } = await params;
  const { page } = await searchParams;

  const member = await db.query.members
    .findFirst({
      where: (members, { eq }) => eq(members.id, +accountId),
    })
    .execute();

  return (
    <AccountModal userName={member?.name ?? ""}>
      {member && <MemberBalance member={member} />}
      <TransactionForm
        action={async (amount, description) => {
          "use server";
          const total =
            (await fetchMemberBalance(+accountId)).at(0)?.total ?? 0;
          await db.insert(transactions).values({
            accountId: +accountId,
            amount,
            description,
            total: total + amount,
          });
          revalidatePath("/bank");
          revalidatePath(`/bank/account/${accountId}`);
        }}
      />
      <TransactionsList accountId={+accountId} page={page ? +page : 1} />
    </AccountModal>
  );
}
