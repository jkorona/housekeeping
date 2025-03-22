import React from "react";
import { AccountModal } from "../../../components/AccountModal";
import { AccountPage } from "../../../components/AccountPage";

export default async function AccountModalPage({
  params,
  searchParams,
}: {
  params: Promise<{ accountId: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { accountId } = await params;
  const { page } = await searchParams;

  return (
    <AccountModal>
      <AccountPage accountId={+accountId} page={+page} />
    </AccountModal>
  );
}
