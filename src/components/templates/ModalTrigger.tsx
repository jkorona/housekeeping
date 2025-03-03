import { useState, ReactNode, FC } from "react";
import { Button, DialogRoot, DialogRootProps } from "@chakra-ui/react";
import { DialogTrigger } from "../ui/dialog";

type ModalTriggerProps = {
  icon?: ReactNode;
  label?: string;
} & DialogRootProps;

export const ModalTrigger: FC<ModalTriggerProps> = ({
  icon,
  label,
  children,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot {...props} open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="subtle">
          {icon} {label}
        </Button>
      </DialogTrigger>
      {children}
    </DialogRoot>
  );
};
