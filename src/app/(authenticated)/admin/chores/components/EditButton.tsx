"use client";
import { FC, useState } from "react";
import { Button } from "@chakra-ui/react";
import { DialogRoot, DialogTrigger } from "@/components/ui/dialog";
import { EditModal } from "./EditModal";
import { Chore } from "@/db/schema/chores";

export type EditButtonProps = {
  title: string;
  icon: React.ReactNode;
  value?: Chore;
  onSave: (value: Chore) => Promise<void>;
};

export const EditButton: FC<EditButtonProps> = ({
  value,
  icon,
  title,
  onSave,
}) => {
  const [open, setOpen] = useState(false);

  const handleSave = async (value: Chore) => {
    await onSave(value);
    setOpen(false);
  };

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={["full", "md"]}
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Button variant="outline">{icon}</Button>
      </DialogTrigger>
      <EditModal title={title} value={value} onSave={handleSave} />
    </DialogRoot>
  );
};
