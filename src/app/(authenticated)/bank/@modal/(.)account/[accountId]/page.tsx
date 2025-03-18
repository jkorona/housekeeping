import React from "react";
import { db } from "@/db";
import { AccountModal } from "./components/AccountModal";
import { TransactionsList } from "./components/TransactionsList";

export default async function AccountModalPage({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;
  const member = await db.query.members
    .findFirst({
      where: (members, { eq }) => eq(members.id, +accountId),
    })
    .execute();

  return (
    <AccountModal userName={member?.name ?? ""}>
      <TransactionsList accountId={+accountId} page={0} />
    </AccountModal>
  );
}
