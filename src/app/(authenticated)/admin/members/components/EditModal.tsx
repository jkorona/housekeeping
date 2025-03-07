import { FC, FormEvent } from "react";
import { Button, Fieldset, Group, Input, InputAddon } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Member } from "@/db/schema/chores";
import { useFormStatus } from "react-dom";
import { ColorPalette } from "@/model/ColorPalette";
import { ColorSelect } from "@/components/ui/color-select";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { format } from "date-fns";

export type EditModalProps = {
  title: string;
  value?: Member;
  onSave: (value: Member) => void;
};

const SaveButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      Save
    </Button>
  );
};

export const EditModal: FC<EditModalProps> = ({ title, value, onSave }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const color = formData.get("color") as string;
    const rate = parseInt(formData.get("rate") as string, 10);
    const dateOfBirth = formData.get("dateOfBirth") as string;

    onSave({ id: value?.id, name, color, rate, dateOfBirth });
  };

  return (
    <DialogContent minH={["100vh", "unset"]} marginBlock={[0, 16]} asChild>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Fieldset.Root>
            <Fieldset.Content>
              <Field label="Name" required>
                <Input name="name" defaultValue={value?.name} required />
              </Field>
              <Field label="Date of birth" required>
                <Input
                  type="date"
                  min="2000-01-01"
                  max={format(Date.now(), "yyyy-MM-dd")}
                  name="dateOfBirth"
                  defaultValue={value?.dateOfBirth}
                  placeholder={""}
                  required
                />
              </Field>
              <Field label="Color" required>
                <ColorSelect
                  name="color"
                  defaultValue={
                    value?.color ? [value.color as ColorPalette] : undefined
                  }
                  required
                />
              </Field>
              <Field label="Weekly Rate" required>
                <Group attached w="full">
                  <InputAddon>PLN</InputAddon>
                  <NumberInputRoot
                    name="rate"
                    defaultValue={`${value?.rate ?? "0"}`}
                    min={0}
                    w="full"
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Group>
              </Field>
            </Fieldset.Content>
          </Fieldset.Root>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <SaveButton />
        </DialogFooter>
        <DialogCloseTrigger />
      </form>
    </DialogContent>
  );
};
