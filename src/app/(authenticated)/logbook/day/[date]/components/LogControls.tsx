"use client";
import { FC, useState } from "react";
import {
  Checkbox,
  CheckboxCheckedChangeDetails,
  HStack,
  Switch,
} from "@chakra-ui/react";
import { Log } from "@/db/schema/chores";
import { LuCheck } from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";

export type LogControlsProps = {
  log?: Log;
  onChange: (done: boolean, skip: boolean) => Promise<void>;
};

export const LogControls: FC<LogControlsProps> = ({ log, onChange }) => {
  const [checked, setChecked] = useState(log?.done);
  const [skipped, setSkipped] = useState(log?.skip);

  const save = async (done: boolean, skip: boolean) => {
    try {
      setChecked(done);
      setSkipped(skip);
      await onChange(done, skip);
    } catch {
      toaster.create({
        title: "Connection error",
        description: "Failed to save data in storage.",
        type: "error",
      });
    }
  };

  const handleDoneChange = async (event: CheckboxCheckedChangeDetails) => {
    setChecked(!!event.checked);
    await save(!!event.checked, log?.skip ?? false);
  };

  const handleSkipChange = async (event: CheckboxCheckedChangeDetails) => {
    setSkipped(!!event.checked);
    await save(log?.done ?? false, !!event.checked);
  };

  return (
    <HStack gap="2">
      <Checkbox.Root
        checked={checked}
        disabled={skipped}
        onCheckedChange={handleDoneChange}
        size="lg"
      >
        <Checkbox.HiddenInput name="done" />
        <Checkbox.Control>{checked && <LuCheck />}</Checkbox.Control>
      </Checkbox.Root>
      <Switch.Root
        size="lg"
        checked={skipped}
        disabled={checked}
        onCheckedChange={handleSkipChange}
      >
        <Switch.HiddenInput name="skip" />
        <Switch.Control />
      </Switch.Root>
    </HStack>
  );
};
