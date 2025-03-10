"use client";
import { FC } from "react";
import { Checkbox, CheckboxCheckedChangeDetails } from "@chakra-ui/react";
import { Log } from "@/db/schema/chores";
import { LuCheck } from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";

export type LogControlsProps = {
  log?: Log;
  onChange: (done: boolean) => Promise<void>;
};

export const LogControls: FC<LogControlsProps> = ({ log, onChange }) => {
  const handleChange = async (event: CheckboxCheckedChangeDetails) => {
    try {
      await onChange(!!event.checked);
    } catch {
      toaster.error({
        title: "Connection error",
        description: "Failed to save data in storage.",
      });
    }
  };

  return (
    <Checkbox.Root checked={log?.done} onCheckedChange={handleChange} size="lg">
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        {log?.done && <LuCheck />}
      </Checkbox.Control>
    </Checkbox.Root>
  );
};
