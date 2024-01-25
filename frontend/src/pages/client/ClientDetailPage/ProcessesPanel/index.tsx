import type { DetailedProcess } from "@services/client/types";
import { Button, Flex, Stack, Table } from "@mantine/core";
import { ProcessesTable } from "@components/process/ProcessesTable";
import { NewProcessModal } from "./NewProcessModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ProcessesPanelProps {
  processes: DetailedProcess[];
}
export const ProcessesPanel = (props: ProcessesPanelProps) => {
  const [newProcessModalOpened, setNewProcessModalOpened] = useState(false);
  const [processesCopy, setProcessesCopy] = useState(props.processes);

  const clientId = useParams().clientId;
  if (!clientId) {
    throw new Error("clientId is required");
  }

  const handleSaveProcess = async (process: DetailedProcess) => {
    const newProcesses = [process, ...processesCopy];
    setProcessesCopy(newProcesses);
    setNewProcessModalOpened(false);
  };

  useEffect(() => {
    setProcessesCopy(props.processes);
  }, [props.processes]);

  return (
    <>
      <Stack>
        <ProcessesTable processes={props.processes} />
        <Flex mt={16}>
          <Button px="34px" onClick={() => setNewProcessModalOpened(true)}>
            Novo processo
          </Button>
        </Flex>

        <NewProcessModal
          clientId={clientId}
          onClose={() => {
            setNewProcessModalOpened(false);
          }}
          opened={newProcessModalOpened}
          onSave={handleSaveProcess}
        />
      </Stack>
    </>
  );
};
