"use client";
import { FC, useState } from "react";
import { Button } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { DialogRoot, DialogTrigger } from "@/components/ui/dialog";
import { EditModal } from "./EditModal";

export type EditButtonProps = {
  id: number;
};

export const EditButton: FC<EditButtonProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={['full', 'md']}
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <MdEdit />
        </Button>
      </DialogTrigger>
      <EditModal />
    </DialogRoot>
  );
};
