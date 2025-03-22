"use client";
import { FC } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

export type PaginatorProps = {
  page: number;
  count: number;
  size: number;
};

const getHref = (page: number): string => `?page=${page < 1 ? 1 : page}`;

export const Paginator: FC<PaginatorProps> = ({ page, count, size }) => (
  <PaginationRoot
    page={page}
    pageSize={size}
    count={count}
    getHref={getHref}
    variant="subtle"
  >
    <PaginationPrevTrigger replace />
    <PaginationItems replace />
    <PaginationNextTrigger replace />
  </PaginationRoot>
);
