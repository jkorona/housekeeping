import { FC, FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { Button, Fieldset, Input, Textarea } from "@chakra-ui/react";
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
import { Chore } from "@/db/schema/chores";

export type EditModalProps = {
  title: string;
  value?: Chore;
  onSave: (value: Chore) => void;
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
    const description = formData.get("description") as string;

    onSave({ id: value?.id, name, description });
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
              <Field label="Description">
                <Textarea
                  name="description"
                  defaultValue={value?.description ?? ""}
                />
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
