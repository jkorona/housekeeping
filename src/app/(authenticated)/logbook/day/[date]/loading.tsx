import { Center, Spinner } from "@chakra-ui/react";

export default function LogbookPageLoading() {
  return (
      <Center marginBlock={16}>
        <Spinner size="xl" borderWidth="4px" />
      </Center>
  );
}
