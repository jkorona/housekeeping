import { FC } from "react";
import { Chore } from "@/db/schema/chores";
import { NativeSelect } from "@chakra-ui/react";

export type ChoreSelectProps = {
  values: Chore[];
};

export const ChoreSelect: FC<ChoreSelectProps> = ({ values }) => (
  <NativeSelect.Root size="xs" variant="plain">
    <NativeSelect.Field paddingInline={2} whiteSpace="normal" placeholder="Not selected" height="fit-content">
      <option value=""></option>
      {values.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </NativeSelect.Field>
  </NativeSelect.Root>
);
