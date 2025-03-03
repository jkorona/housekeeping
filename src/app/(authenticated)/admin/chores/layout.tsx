import { PropsWithChildren } from "react";
import { AdminPageLayout } from "@/components/layout/AdminPageLayout";

export default function ChoresPageLayout({ children }: PropsWithChildren) {
  return <AdminPageLayout title="Chores">{children}</AdminPageLayout>;
}
