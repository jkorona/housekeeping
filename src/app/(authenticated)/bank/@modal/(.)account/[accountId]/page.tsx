"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@chakra-ui/react";

export default function AccountModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <Dialog.Root open>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>Hello</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body >
            <h1>Account</h1>
          </Dialog.Body>
          <Dialog.Footer >
            <button>ok</button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
