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
  const [done, setDone] = useState(log?.done ?? false);
  const [skip, setSkip] = useState(log?.skip ?? false);

  const save = async (done: boolean, skip: boolean) => {
    try {
      setDone(done);
      setSkip(skip);
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
    setDone(!!event.checked);
    await save(!!event.checked, skip);
  };

  const handleSkipChange = async (event: CheckboxCheckedChangeDetails) => {
    setSkip(!!event.checked);
    await save(done, !!event.checked);
  };

  return (
    <HStack gap="2">
      <Checkbox.Root
        checked={done}
        disabled={skip}
        onCheckedChange={handleDoneChange}
        size="lg"
      >
        <Checkbox.HiddenInput name="done" />
        <Checkbox.Control>{done && <LuCheck />}</Checkbox.Control>
      </Checkbox.Root>
      <Switch.Root
        size="lg"
        checked={skip}
        disabled={done}
        onCheckedChange={handleSkipChange}
      >
        <Switch.HiddenInput name="skip" />
        <Switch.Control />
      </Switch.Root>
    </HStack>
  );
};
