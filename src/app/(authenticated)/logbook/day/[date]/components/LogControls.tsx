"use client";
import { FC, useState } from "react";
import { Checkbox, CheckboxCheckedChangeDetails } from "@chakra-ui/react";
import { Log } from "@/db/schema/chores";
import { LuCheck } from "react-icons/lu";
import { Spinner } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster";

export type LogControlsProps = {
  log?: Log;
  onChange: (done: boolean) => Promise<void>;
};

export const LogControls: FC<LogControlsProps> = ({ log, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (event: CheckboxCheckedChangeDetails) => {
    setIsLoading(true);
    try {
      await onChange(!!event.checked);
    } catch {
      toaster.error({
        title: "Connection error",
        description: "Failed to save data in storage.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    <Spinner />
  }

  return (
    <Checkbox.Root checked={log?.done} onCheckedChange={handleChange} size="lg">
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <LuCheck />
      </Checkbox.Control>
    </Checkbox.Root>
  );
};
