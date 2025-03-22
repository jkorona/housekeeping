import { AccountPage } from "../../components/AccountPage";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ accountId: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { accountId } = await params;
  const { page } = await searchParams;

  return <AccountPage accountId={+accountId} page={+page} />;
}
