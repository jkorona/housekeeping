"use client"

import Link, { LinkProps } from "next/link"
import { createRecipeContext } from "@chakra-ui/react"

const { withContext } = createRecipeContext({ key: "button" })

export const LinkButton = withContext<HTMLAnchorElement, LinkProps>(Link)
