import { PropsWithChildren, ReactNode } from "react";
import { PageLayout } from "@/components/layout/PageLayout";

export default async function LogbookLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  return (
    <PageLayout>
      {children}
      {modal}
    </PageLayout>
  );
}
