import { Box, Center, Text } from "@chakra-ui/react";

type DaySchedulePageProps = {
  params: Promise<{ date: string }>;
};

export default async function DaySchedulePage({ params }: DaySchedulePageProps) {
  const { date } = await params;
  
  return (
    <Center>
      <Box p="4" borderRadius="lg" boxShadow="lg">
        <Text>Day Schedule: {date}</Text>
      </Box>
    </Center>
  );
}
