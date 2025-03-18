import React from "react";
import { db } from "@/db";
import { AccountModal } from "./components/AccountModal";
import { TransactionsList } from "./components/TransactionsList";

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
      <TransactionsList accountId={+accountId} page={page ? +page : 1} />
    </AccountModal>
  );
}
