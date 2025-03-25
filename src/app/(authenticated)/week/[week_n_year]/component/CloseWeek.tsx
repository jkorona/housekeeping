import { FC } from "react";
import { WeekSummary } from "@/db/actions/fetchWeekSummary";
import {
  FormatNumber,
  Heading,
  HStack,
  Icon,
  List,
  Text,
} from "@chakra-ui/react";
import { ModalTrigger } from "@/components/templates/ModalTrigger";
import { LuCircleCheck, LuCircleX, LuTrophy } from "react-icons/lu";
import { ModalForm } from "@/components/templates/ModalForm";
import { formatWeek } from "@/model/Formats";
import { completeWeek } from "@/db/actions/completeWeek";

interface CompleteWeekProps {
  summary: WeekSummary;
}

const CloseWeek: FC<CompleteWeekProps> = ({ summary }) => {
  return (
    <HStack justifyContent="flex-end">
      <ModalTrigger icon={<LuTrophy />} label="Complete week">
        <ModalForm
          value={summary}
          submitLabel="Complete"
          onSubmit={completeWeek}
          header={
            <HStack gap="4">
              <Heading as="h5">{formatWeek(summary.startDate)}</Heading>
              <Icon size="2xl" color="green.500">
                <LuTrophy />
              </Icon>
            </HStack>
          }
        >
          <Heading as="h4">Do you really want to complete the week?</Heading>
          <Text marginBlock="3">Following payments will be made:</Text>
          <List.Root variant="plain">
            {summary.results.map(({ id, name, payment, progress }) => (
              <List.Item key={id}>
                <List.Indicator
                  asChild
                  color={progress < 50 ? "red.500" : "green.500"}
                >
                  {progress < 50 ? <LuCircleX /> : <LuCircleCheck />}
                </List.Indicator>
                {name}:{" "}
                {
                  <FormatNumber
                    value={payment}
                    style="currency"
                    currency="PLN"
                  />
                }
              </List.Item>
            ))}
          </List.Root>
        </ModalForm>
      </ModalTrigger>
    </HStack>
  );
};

export default CloseWeek;
