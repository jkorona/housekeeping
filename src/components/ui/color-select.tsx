import { ColorPalette, colorPalette } from "@/model/ColorPalette";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectValueText,
  SelectTrigger,
} from "./select";
import {
  ColorSwatch,
  createListCollection,
  Select as ChakraSelect,
  HStack,
} from "@chakra-ui/react";

const list = createListCollection<ColorPalette>({ items: colorPalette });

const SelectedValueRenderer = () => (
  <SelectValueText>
    {(items: ColorPalette[]) => {
      if (items.length > 0) {
        return (
          <HStack gap={4}>
            <ColorSwatch value={items.at(0)!} />
            {items.at(0)}
          </HStack>
        );
      }
      return "";
    }}
  </SelectValueText>
);

export const ColorSelect = (
  props: Omit<ChakraSelect.RootProps, "collection">
) => {
  return (
    <SelectRoot collection={list} positioning={{ sameWidth: true }} {...props}>
      <SelectTrigger>
        <SelectedValueRenderer />
      </SelectTrigger>
      <SelectContent portalled={false}>
        {colorPalette.map((item) => (
          <SelectItem item={item} key={item} justifyContent="flex-start">
            <ColorSwatch value={item} />
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
