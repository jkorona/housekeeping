"use client";
import { FC } from "react";
import { Chore } from "@/db/schema/chores";
import { NativeSelect } from "@chakra-ui/react";

export type ChoreSelectProps = {
  options: Chore[];
  value: number;
  onChange: (choreId: number) => Promise<void>;
};

export const ChoreSelect: FC<ChoreSelectProps> = ({ value, options, onChange }) => (
  <NativeSelect.Root size="xs" variant="plain">
    <NativeSelect.Field
      paddingInline={2}
      whiteSpace="normal"
      placeholder="Not selected"
      height="fit-content"
      defaultValue={value}
      onChange={(e) => onChange(+e.currentTarget.value)}
    >
      {options.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </NativeSelect.Field>
  </NativeSelect.Root>
);
