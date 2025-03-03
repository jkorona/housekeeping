import { FC } from "react";
import { EmptyState as ChakraEmptyState } from "@chakra-ui/react";
import { LuPackageSearch } from "react-icons/lu";

export type EmptyStateProps = {
  title?: string;
  description?: string;
  indicator?: React.ReactNode;
};

export const EmptyState: FC<EmptyStateProps> = ({
  title = "No results found",
  description,
  indicator,
}) => (
  <ChakraEmptyState.Root>
    <ChakraEmptyState.Content>
      <ChakraEmptyState.Indicator>
        {indicator ?? <LuPackageSearch />}
      </ChakraEmptyState.Indicator>
      <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
      {description && (
        <ChakraEmptyState.Description>
          {description}
        </ChakraEmptyState.Description>
      )}
    </ChakraEmptyState.Content>
  </ChakraEmptyState.Root>
);
