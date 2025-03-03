import { PropsWithChildren } from "react";
import { AdminPageLayout } from "@/components/layout/AdminPageLayout";

export default function MembersPageLayout({ children }: PropsWithChildren) {
  return <AdminPageLayout title="Members">{children}</AdminPageLayout>;
}
