import { PropsWithChildren } from "react";
import { PageLayout } from "@/components/layout/PageLayout";

export default async function LogbookLayout({ children }: PropsWithChildren) {
  return <PageLayout>{children}</PageLayout>;
}
