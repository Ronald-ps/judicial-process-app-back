import {
  observationCreate,
  getSimpleProcesses,
} from "@/services/client/adapters";
import { Observation } from "@/services/process/types";
import { SimpleProcess } from "@/services/client/types";
import { Modal, Stack, Select, Textarea, Button } from "@mantine/core";
import { useEffect, useState } from "react";

interface NewObservationModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: ({ observation }: { observation: Observation }) => void;
  title?: string;
  clientId: string;
}

export const NewObservationModal = (props: NewObservationModalProps) => {
  const [availableProcesses, setAvailableProcesses] = useState(
    [] as SimpleProcess[]
  );
  const [selectedProcess, setSelectedProcess] = useState("" as string | null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const getAvailableProcesses = async () => {
    const simpleProcessList = await getSimpleProcesses(props.clientId);
    setAvailableProcesses(simpleProcessList);
  };

  const handleSubmit = async () => {
    if (!selectedProcess) {
      throw new Error("selectedProcess is required");
    }
    setLoading(true);
    try {
      const observation = await observationCreate(selectedProcess, description);
      await props.onSave({ observation });
      setSelectedProcess(null);
      setDescription("");
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAvailableProcesses();
  }, []);

  return (
    <>
      <Modal
        opened={props.opened}
        onClose={props.onClose}
        title={props.title}
        centered
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <Stack>
            <Select
              data={availableProcesses.map(
                (process): { label: string; value: string } => ({
                  label: process.code,
                  value: process.id.toString(),
                })
              )}
              label="Processo"
              required
              value={selectedProcess}
              onChange={(value) => setSelectedProcess(value)}
            />
            <Textarea
              label="Observação"
              required
              variant="filled"
              size="sm"
              autosize
              value={description}
              data-autofocus
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
            <Button type="submit" loading={loading}>
              Salvar
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
