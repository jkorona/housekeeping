"use client";

import Link, { LinkProps } from "next/link";
import type { JsxHtmlProps, RecipeProps } from "@chakra-ui/react";
import { createRecipeContext } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export type LinkButtonProps = JsxHtmlProps<
  PropsWithChildren<LinkProps>,
  RecipeProps<"button">
>;

const { withContext } = createRecipeContext({ key: "button" });

export const LinkButton = withContext<LinkProps, LinkButtonProps>(Link);
