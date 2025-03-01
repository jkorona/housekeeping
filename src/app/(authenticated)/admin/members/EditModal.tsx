import { FC, FormEvent } from "react";
import { Button, Fieldset, HStack, Input, parseColor } from "@chakra-ui/react";
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
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerTrigger,
} from "@/components/ui/color-picker";
import { Member } from "@/db/schema/chores";
import { useFormStatus } from "react-dom";

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

    onSave({ id: value?.id, name, color });
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
              <Field label="Color" required>
                <ColorPickerRoot
                  defaultValue={parseColor(value?.color ?? "#eb5e41")}
                >
                  <ColorPickerControl w="full">
                    <ColorPickerTrigger />
                    <ColorPickerInput name="color" w="full" required />
                  </ColorPickerControl>
                  <ColorPickerContent zIndex={100000}>
                    <ColorPickerArea />
                    <HStack>
                      <ColorPickerEyeDropper />
                      <ColorPickerSliders />
                    </HStack>
                  </ColorPickerContent>
                </ColorPickerRoot>
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
