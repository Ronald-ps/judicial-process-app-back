import { type Honorary } from "@/services/financial/types";
import { Button, Flex, Modal, Stack, Table, Text } from "@mantine/core";
import { NewHonorary } from "./NewHonorary";
import { useEffect, useState } from "react";
import { HonorariesTable } from "@components/financial/HonorariesTable";
import { getHonoraries as getHonorariesService } from "@/services/financial/adapters";
import { useParams } from "react-router-dom";

interface FinancialPanelProps {
  honoraries: Honorary[];
}
export const FinancialPanel = (props: FinancialPanelProps) => {
  const [newHonoraryOpen, setNewHonoraryOpen] = useState(false);
  const [honoraries, setHonoraries] = useState<Honorary[]>([]);

  const clientId = useParams().clientId;
  if (!clientId) {
    throw new Error("Sem informações do cliente!");
  }

  const getHonoraries = async () => {
    const honoraries_ = await getHonorariesService(clientId);
    setHonoraries(honoraries_);
  };

  useEffect(() => {
    if (!props.honoraries.length) {
      return;
    }
    setHonoraries(props.honoraries);
  }, [props.honoraries]);

  return (
    <>
      <Stack>
        <HonorariesTable honoraries={honoraries} />

        <Flex>
          <Button onClick={() => setNewHonoraryOpen(true)}>
            Novo honorário
          </Button>
        </Flex>
      </Stack>
      <Modal
        opened={newHonoraryOpen}
        onClose={() => {
          setNewHonoraryOpen(false);
        }}
      >
        <NewHonorary
          onSaveHonorary={() => {
            getHonoraries();
            setNewHonoraryOpen(false);
          }}
          clientId={clientId}
        />
      </Modal>
    </>
  );
};
