import { FC } from "react";
import { Button } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const EditModal: FC = () => (
  <DialogContent
    minH={["100vh", "unset"]}
    marginBlock={[0, 16]}
  >
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <DialogBody>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
      fermentum nunc. Nullam auctor, nunc nec ultricies ultricies, nunc elit
      ultricies nunc, nec ultricies nunc nunc nec elit.
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
