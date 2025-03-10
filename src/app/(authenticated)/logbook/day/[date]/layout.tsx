import { PropsWithChildren } from "react";
import { PageLayout } from "@/components/layout/PageLayout";

export default function LogbookLayout({ children }: PropsWithChildren) {
  return <PageLayout>{children}</PageLayout>;
}
