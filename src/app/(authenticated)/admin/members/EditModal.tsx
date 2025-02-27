import { FC } from "react";
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

export const EditModal: FC = () => (
  <DialogContent minH={["100vh", "unset"]} marginBlock={[0, 16]}>
    <DialogHeader>
      <DialogTitle>Add new member</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <Fieldset.Root>
        <Fieldset.Content>
          <Field label="Name" required>
            <Input name="name" />
          </Field>
          <Field label="Color" required>
            <ColorPickerRoot defaultValue={parseColor("#eb5e41")}>
              <ColorPickerControl>
                <ColorPickerTrigger />
                <ColorPickerInput w="full"/>
              </ColorPickerControl>
              <ColorPickerContent zIndex={1000000}>
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
      <Button>Save</Button>
    </DialogFooter>
    <DialogCloseTrigger />
  </DialogContent>
);
