"use client";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

export type AccountModalProps = PropsWithChildren<{
  userName: string;
}>;

export const AccountModal: FC<AccountModalProps> = ({ children }) => {
  const router = useRouter();

  return (
    <DialogRoot open size={["full", "xl"]} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account details</DialogTitle>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
