"use client";
import { FC, useState } from "react";
import { Button, DialogHeader, HStack, Icon, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuBadgeHelp, LuMessageCircleQuestion } from "react-icons/lu";

export type DeleteButtonProps = {
  id: number;
  onClick: (id: number) => void;
};

export const DeleteButton: FC<DeleteButtonProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="subtle">
          <MdDelete />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HStack>
            <Icon size="xl" color="green.500">
              <LuBadgeHelp />
            </Icon>
            <Text> Do you really want to delete this item?</Text>
          </HStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
