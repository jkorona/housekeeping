"use client";
import { FC, FormEvent, useState } from "react";
import {
  Button,
  Center,
  DialogHeader,
  Icon,
  Text,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuBadgeHelp } from "react-icons/lu";
import { Member } from "@/db/schema/chores";
import { useFormStatus } from "react-dom";

export type DeleteButtonProps = {
  member: Member;
  onDelete: (id: number) => Promise<void>;
};

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      Delete
    </Button>
  );
};

export const DeleteButton: FC<DeleteButtonProps> = ({ member, onDelete }) => {
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onDelete(member.id!);
    setOpen(false);
  };
  return (
    <DialogRoot
      lazyMount
      open={open}
      size="xs"
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <Button variant="subtle">
          <MdDelete />
        </Button>
      </DialogTrigger>
      <DialogContent asChild>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <Center>
              <Icon size="2xl" color="green.500">
                <LuBadgeHelp />
              </Icon>
            </Center>
          </DialogHeader>
          <DialogBody>
            <Text textAlign="center">
              Do you really want to delete member <strong>{member.name}</strong>?
            </Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};
