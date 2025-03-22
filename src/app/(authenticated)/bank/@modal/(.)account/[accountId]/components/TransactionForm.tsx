"use client";
import React, { FC } from "react";
import { Button, Presence, Stack, useDisclosure } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

const animation = {
  animationStyle: { _open: "scale-fade-in", _closed: "scale-fade-out" },
  animationDuration: "moderate",
};

export const TransactionForm: FC = () => {
  const { open, onToggle } = useDisclosure();
  return (
    <Stack alignItems="flex-end" marginBottom="4">
      <Presence present={!open} {...animation}>
        <Button onClick={onToggle} variant="surface">
          <LuPlus />
          Add new transaction
        </Button>
      </Presence>
      <Presence lazyMount unmountOnExit present={open} {...animation}>
        <div>Presence content</div>
      </Presence>
    </Stack>
  );
};
