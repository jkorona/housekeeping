"use client";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AccountModal({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const router = useRouter();
  const { accountId } = use(params);

  return (
    <DialogRoot open size={["full", "xl"]} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hello {accountId}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <h1>Account</h1>
        </DialogBody>
        <DialogFooter>Footer</DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
