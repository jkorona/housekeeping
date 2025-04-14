"use client";
import { FC, FormEvent, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button, useDialogContext } from "@chakra-ui/react";

type ModalFormProps<T> = {
  value: T;
  header: ReactNode | string;
  children: ReactNode;
  submitLabel: string;
  onSubmit: (value: T) => Promise<void>;
};

export const SubmitButton: FC<{ label: string }> = ({ label }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {label}
    </Button>
  );
};

export function ModalForm<T>({
  value,
  submitLabel,
  header,
  children,
  onSubmit,
}: ModalFormProps<T>) {
  const { setOpen } = useDialogContext();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      value
    );

    await onSubmit(payload);
    setOpen(false);
  };
  return (
    <DialogContent asChild height="100svh">
      <form onSubmit={handleSubmit}>
        <DialogHeader>{header}</DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <SubmitButton label={submitLabel} />
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
