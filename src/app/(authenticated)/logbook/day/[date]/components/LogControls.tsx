"use client";
import { FC, useState } from "react";
import { Checkbox, CheckboxCheckedChangeDetails } from "@chakra-ui/react";
import { Log } from "@/db/schema/chores";
import { LuCheck } from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";

export type LogControlsProps = {
  log?: Log;
  onChange: (done: boolean) => Promise<void>;
};

export const LogControls: FC<LogControlsProps> = ({ log, onChange }) => {
  const [checked, setChecked] = useState(log?.done);
  
  const handleChange = async (event: CheckboxCheckedChangeDetails) => {
    setChecked(!!event.checked);
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
    <Checkbox.Root checked={checked} onCheckedChange={handleChange} size="lg">
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        {checked && <LuCheck />}
      </Checkbox.Control>
    </Checkbox.Root>
  );
};
