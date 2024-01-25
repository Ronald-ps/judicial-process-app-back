import type { Evolution } from "@services/process/types";
import { Box, Group, Stack } from "@mantine/core";
import { ScrollAreaAutosize, Timeline, Text } from "@mantine/core";
import { IconMessageDots } from "@tabler/icons-react";
import { formatDate } from "@/helpers/dateUtils";
import { IconFile } from "@tabler/icons-react";
import { constructEvolutionFileUrl } from "@/services/process/adapters";

interface ProcessItemProps {
  evolution: Evolution;
}
export const EvolutionItem = (props: ProcessItemProps) => {
  const extractNameByFileLink = (fileLink: string) => {
    const fileLinkList = fileLink.split("/");
    return fileLinkList[fileLinkList.length - 1];
  };

  return (
    <>
      <Text fw={100} mb="2">
        Nº {props.evolution.process_code}
      </Text>
      <Box className={"evolutionItemBoxContainer"} maw="80%">
        <Text c="dimmed" size="sm">
          {props.evolution.description}
        </Text>
      </Box>
      {props.evolution.file && (
        <Group align="center" style={{ cursor: "pointer" }} my={8} onClick={async () => {
          // @ts-expect-error - já garanti em cima que o valor nao é null
          const fileUrl = await constructEvolutionFileUrl(props.evolution.file)
          window.open(fileUrl, "_blank")
        }}>
          <IconFile style={{ width: "13px" }} />
          <Text c="dimmed" size="sm">
            {extractNameByFileLink(props.evolution.file)}
          </Text>
        </Group>
      )}
      <Text size="xs" mt={4} fw={300} c="#595959">
        {formatDate({ date: props.evolution.created_at })}
      </Text>
    </>
  );
};

interface EvolutionTimelineProps {
  evolutions: Evolution[];
  maxHeight?: string;
}
export const EvolutionTimeline = (props: EvolutionTimelineProps) => {
  return (
    <Stack>
      <ScrollAreaAutosize mah={props.maxHeight || "500px"}>
        <Timeline active={-1} bulletSize={24} lineWidth={2}>
          {props.evolutions.map((evolution) => (
            <Timeline.Item
              bullet={<IconMessageDots size={12} />}
              key={evolution.id}
            >
              <EvolutionItem evolution={evolution} />
            </Timeline.Item>
          ))}
          {props.evolutions.length === 0 ? (
            <Text c="dimmed">Nenhuma evolução registrada</Text>
          ) : null}
        </Timeline>
      </ScrollAreaAutosize>
    </Stack>
  );
};
