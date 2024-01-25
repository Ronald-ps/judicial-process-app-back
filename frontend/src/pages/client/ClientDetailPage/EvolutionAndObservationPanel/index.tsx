import type {
  DetailedProcess,
  Evolution,
  Observation,
} from "@services/process/types";
import { EvolutionTimeline } from "@components/process/EvolutionTimeline";
import { ObservationTimeline } from "@components/process/ObservationTimeline";
import { useEffect, useState } from "react";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { NewEvolutionModal } from "./NewEvolutionModal";
import { NewObservationModal } from "./NewObservationModal";
import { useParams } from "react-router-dom";
interface EvolutionAndObservationPanelProps {
  processes: DetailedProcess[];
}
export const EvolutionAndObservationPanel = (
  props: EvolutionAndObservationPanelProps
) => {
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);

  const [openModalNewEvolution, setOpenModalNewEvolution] = useState(false);
  const [openModalNewObservation, setOpenModalNewObservation] = useState(false);

  const clientId = useParams().clientId;
  if (!clientId) {
    throw new Error("clientId is required");
  }

  const handleNewEvolution = async ({
    evolution,
  }: {
    evolution: Evolution;
  }) => {
    setEvolutions([evolution, ...evolutions]);
    setOpenModalNewEvolution(false);
  };

  useEffect(() => {
    const evolutions = props.processes
      .map((process) => process.evolutions)
      .flat();
    setEvolutions(evolutions);
  }, [props.processes]);

  const handleNewObservation = async ({
    observation,
  }: {
    observation: Observation;
  }) => {
    setObservations([observation, ...observations]);
    setOpenModalNewObservation(false);
  };

  useEffect(() => {
    const observations = props.processes
      .map((process) => process.observations)
      .flat();
    setObservations(observations);
  }, [props.processes]);

  return (
    <Stack>
      <Group
        className="EvolutionAndObservationPanelContainer"
        gap={48}
        align="top"
      >
        <Box w="500px" mih="400px">
          <Text fw={400} mb="24px">
            Evoluções
          </Text>
          <EvolutionTimeline evolutions={evolutions} maxHeight="350px" />
          <Button
            mt={20}
            onClick={() => {
              setOpenModalNewEvolution(true);
            }}
          >
            {" "}
            Nova evolução
          </Button>
        </Box>
        <Box w="500px">
          <Text fw={400} mb="24px">
            Observações
          </Text>
          <ObservationTimeline observations={observations} maxHeight="350px" />
          <Button mt={20} onClick={() => setOpenModalNewObservation(true)}>
            {" "}
            Nova observação
          </Button>
        </Box>
      </Group>
      <NewEvolutionModal
        opened={openModalNewEvolution}
        onClose={() => {
          setOpenModalNewEvolution(false);
        }}
        onSave={handleNewEvolution}
        clientId={clientId}
      />
      <NewObservationModal
        opened={openModalNewObservation}
        onClose={() => {
          setOpenModalNewObservation(false);
        }}
        onSave={handleNewObservation}
        clientId={clientId}
      />
    </Stack>
  );
};
