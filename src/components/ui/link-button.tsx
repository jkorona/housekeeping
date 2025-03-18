"use client"

import Link from "next/link"
import type { HTMLChakraProps, RecipeProps } from "@chakra-ui/react"
import { createRecipeContext } from "@chakra-ui/react"

export type LinkButtonProps = HTMLChakraProps<"a", RecipeProps<"button">>;

const { withContext } = createRecipeContext({ key: "button" })

export const LinkButton = withContext<HTMLAnchorElement, LinkButtonProps>(Link)
