"use client";
import { FC, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { TableRow } from "@chakra-ui/react";

type LinkTableRowProps = PropsWithChildren<{
  href: string;
}>;

const LinkTableRow: FC<LinkTableRowProps> = ({ children, href }) => {
  const router = useRouter();
  const handleClick = () => router.push(href);
  return (
    <TableRow onClick={handleClick} cursor="pointer">
      {children}
    </TableRow>
  );
};

export default LinkTableRow;
