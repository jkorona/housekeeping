"use client";
import { FC } from "react";
import { Center, Icon, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { LuBadgeHelp } from "react-icons/lu";
import { Chore } from "@/db/schema/chores";
import { ModalTrigger } from "@/components/templates/ModalTrigger";
import { ModalForm } from "@/components/templates/ModalForm";

export type DeleteButtonProps = {
  chore: Chore;
  onDelete: (id: number) => Promise<void>;
};

export const DeleteButton: FC<DeleteButtonProps> = ({ chore, onDelete }) => {
  return (
    <ModalTrigger lazyMount size="xs" icon={<MdDelete />}>
      <ModalForm
        value={chore.id!}
        submitLabel="Delete"
        onSubmit={onDelete}
        header={
          <Center>
            <Icon size="2xl" color="green.500">
              <LuBadgeHelp />
            </Icon>
          </Center>
        }
      >
        <Text textAlign="center">
          Do you really want to delete chore <strong>{chore.name}</strong>?
        </Text>
      </ModalForm>
    </ModalTrigger>
  );
};
