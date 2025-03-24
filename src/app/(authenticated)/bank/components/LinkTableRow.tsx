"use client";
import { FC, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TableRow } from "@chakra-ui/react";

type LinkTableRowProps = PropsWithChildren<{
  href: string;
}>;

const LinkTableRow: FC<LinkTableRowProps> = ({ children, href }) => {
  const router = useRouter();
  const handleClick = () => router.push(href);
  useEffect(() => router.prefetch(href), [router, href]);
  return (
    <TableRow onClick={handleClick} cursor="pointer">
      {children}
    </TableRow>
  );
};

export default LinkTableRow;
