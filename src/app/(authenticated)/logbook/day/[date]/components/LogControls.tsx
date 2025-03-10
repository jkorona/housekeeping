"use client";
import { FC } from "react";
import { Checkbox } from "@chakra-ui/react";
import { Log } from "@/db/schema/chores";
import { LuCheck } from "react-icons/lu";

export type LogControlsProps = {
  log?: Log;
  onChange: (done: boolean) => void;
};

export const LogControls: FC<LogControlsProps> = ({ log, onChange }) => (
  <Checkbox.Root
    checked={log?.done}
    onCheckedChange={(e) => onChange(!!e.checked)}
    size="lg"
  >
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <LuCheck />
    </Checkbox.Control>
  </Checkbox.Root>
);
