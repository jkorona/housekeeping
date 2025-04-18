"use client";
import React, { FC, FormEvent, useState } from "react";
import { LuPlus } from "react-icons/lu";
import {
  Button,
  Card,
  Fieldset,
  Presence,
  SegmentGroup,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { useFormStatus } from "react-dom";

const animation = {
  animationStyle: { _open: "scale-fade-in", _closed: "scale-fade-out" },
  animationDuration: "moderate",
};

const SaveButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="surface"
      loading={pending}
      disabled={pending}
    >
      Save
    </Button>
  );
};

export type TransactionFormProps = {
  action: (amount: number, description: string) => Promise<void>;
};

export const TransactionForm: FC<TransactionFormProps> = ({ action }) => {
  const { open, onToggle } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) {
      return;
    }
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const type = formData.get("type") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const description = formData.get("description") as string;

    try {
      await action(
        type === "Withdrawal" && amount > 0 ? -amount : amount,
        description
      );
    } finally {
      onToggle();
      setSubmitting(false);
    }
  };
  return (
    <Stack alignItems="flex-end" marginBottom="4">
      <Presence lazyMount unmountOnExit present={open} {...animation} w="full">
        <Card.Root asChild>
          <form onSubmit={handleSubmit}>
            <Fieldset.Root>
              <Card.Body gap="2">
                <Card.Title mt="2">Add new transaction</Card.Title>
                <Fieldset.Content>
                  <Field label="Type" required>
                    <SegmentGroup.Root
                      name="type"
                      size="md"
                      defaultValue="Deposit"
                    >
                      <SegmentGroup.Indicator />
                      <SegmentGroup.Items items={["Deposit", "Withdrawal"]} />
                    </SegmentGroup.Root>
                  </Field>
                  <Field label="Amount" required>
                    <NumberInputRoot name="amount" defaultValue="0" w="full">
                      <NumberInputField inputMode="decimal" />
                    </NumberInputRoot>
                  </Field>
                  <Field label="Description">
                    <Textarea name="description" rows={5} />
                  </Field>
                </Fieldset.Content>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button variant="outline" onClick={onToggle}>
                  Cancel
                </Button>
                <SaveButton />
              </Card.Footer>
            </Fieldset.Root>
          </form>
        </Card.Root>
      </Presence>
      {!open && (
        <Button onClick={onToggle} variant="surface">
          <LuPlus />
          Add new transaction
        </Button>
      )}
    </Stack>
  );
};
