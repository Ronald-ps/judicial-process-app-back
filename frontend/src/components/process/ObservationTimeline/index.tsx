import type { Observation } from "@services/client/types";
import { Box, Stack } from "@mantine/core";
import { ScrollAreaAutosize, Timeline, Text } from "@mantine/core";
import { IconMessageDots } from "@tabler/icons-react";
import { formatDate } from "@/helpers/dateUtils";

interface ProcessItemProps {
  observation: Observation;
}
export const ObservationItem = (props: ProcessItemProps) => {
  return (
    <>
      <Text fw={100} mb="2">
        Nº {props.observation.process_code}
      </Text>
      <Box maw="80%">
        <Text c="dimmed" size="sm">
          {props.observation.description}
        </Text>
      </Box>
      <Text size="xs" mt={4} fw={300} c="#595959">
        {formatDate({ date: props.observation.created_at })}
      </Text>
    </>
  );
};

interface ObservationTimelineProps {
  observations: Observation[];
  maxHeight?: string;
}
export const ObservationTimeline = (props: ObservationTimelineProps) => {
  return (
    <Stack>
      <ScrollAreaAutosize mah={props.maxHeight || "500px"}>
        <Timeline active={-1} bulletSize={24} lineWidth={2}>
          {props.observations.map((observation) => (
            <Timeline.Item
              bullet={<IconMessageDots size={12} />}
              key={observation.id}
            >
              <ObservationItem observation={observation} />
            </Timeline.Item>
          ))}
          {props.observations.length === 0 ? (
            <Text c="dimmed">Nenhuma observação registrada</Text>
          ) : null}
        </Timeline>
      </ScrollAreaAutosize>
    </Stack>
  );
};
