import { useParams } from "react-router-dom";
import { getClient as getClientService } from "@/services/client/adapters";
import { type Client, } from "@/services/client/types";
import { type DetailedProcess } from "@/services/process/types";
import { useEffect, useState } from "react";
import { getLegalProcessesByClient } from "@/services/client/adapters";
import { Box, Flex, Stack, Tabs, rem } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { InformationPanel } from "./InformationPanel";
import { ProcessesPanel } from "./ProcessesPanel";
import { EvolutionAndObservationPanel } from "./EvolutionAndObservationPanel";
import { ContainerVerticalAnimation } from "./ContainerVerticalAnimation";
import { useIntersection } from "@mantine/hooks";
import { ClientProfile } from "./ClientProfile";
import { FinancialPanel } from "./FinancialPanel";
import { getHonoraries } from "@services/financial/adapters";
import { type Honorary } from "@services/financial/types";
import { PageDefaultMarginsContainer } from "@/pages/PageDefaultMarginsContainer";
import { AnimationPageContainer } from "@/components/generic/animation/AnimationPageContainer";
import { IconFileDollar } from "@tabler/icons-react";

export const ClientDetailPage = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [processes, setProcesses] = useState<DetailedProcess[]>([]);
  const [honoraries, setHonoraries] = useState([] as Honorary[]);
  const { ref: refProcesses, entry: entryProcesses } = useIntersection();
  const { ref: refInformation, entry: entryInformation } = useIntersection();
  const { ref: refEvolutionAndObservation, entry: entryEAndO } =
    useIntersection();

  const iconStyle = { width: rem(12), height: rem(12) };

  const clientId = useParams().clientId;
  if (!clientId)
    throw new Error(
      "Impossível acessa página sem fornecer o id do client na rota"
    );

  const getClient = async () => {
    const client = await getClientService(Number(clientId));
    setClient(client);
  };

  const getProcessesByClient = async (clientId: number) => {
    const processes = await getLegalProcessesByClient(clientId);
    setProcesses(processes);
  };

  const getHonorariesByClient = async (clientId: number) => {
    const honoraries = await getHonoraries(clientId);
    console.log(honoraries);
    setHonoraries(honoraries);
  };

  useEffect(() => {
    getClient();
  }, []);

  useEffect(() => {
    if (!client) return;
    getProcessesByClient(client.id);
  }, [client]);

  useEffect(() => {
    if (!client) return;
    getHonorariesByClient(client.id);
  }, [client]);

  return (
    <PageDefaultMarginsContainer>
      <AnimationPageContainer>
        <Stack>
          <Flex>
            <ClientProfile client={client} />
          </Flex>
          <Tabs defaultValue="information">
            <Tabs.List>
              <Tabs.Tab
                value="information"
                leftSection={<IconPhoto style={iconStyle} />}
              >
                Informações pessoais
              </Tabs.Tab>
              <Tabs.Tab
                value="processes"
                leftSection={<IconMessageCircle style={iconStyle} />}
              >
                Processos
              </Tabs.Tab>
              <Tabs.Tab
                value="evolutionAdnObservations"
                leftSection={<IconSettings style={iconStyle} />}
              >
                Evoluções e observações
              </Tabs.Tab>
              <Tabs.Tab
                value="financial"
                leftSection={<IconFileDollar style={iconStyle} />}
              >
                Financeiro
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="information">
              <Box h={24} />
              <ContainerVerticalAnimation
                inView={entryInformation?.isIntersecting ?? true}
                ref={refInformation}
              >
                {client && <InformationPanel client={client} />}
              </ContainerVerticalAnimation>
            </Tabs.Panel>

            <Tabs.Panel value="processes">
              <Box h={24} />
              <ContainerVerticalAnimation
                inView={entryProcesses?.isIntersecting ?? true}
                ref={refProcesses}
              >
                <ProcessesPanel processes={processes || []} />
              </ContainerVerticalAnimation>
            </Tabs.Panel>

            <Tabs.Panel value="evolutionAdnObservations">
              <Box h={24} />
              <ContainerVerticalAnimation
                inView={entryEAndO?.isIntersecting ?? true}
                ref={refEvolutionAndObservation}
              >
                <EvolutionAndObservationPanel processes={processes || []} />
              </ContainerVerticalAnimation>
            </Tabs.Panel>

            <Tabs.Panel value="financial">
              <Box h={24} />
              <ContainerVerticalAnimation inView={true}>
                <FinancialPanel honoraries={honoraries} />
              </ContainerVerticalAnimation>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </AnimationPageContainer>
    </PageDefaultMarginsContainer>
  );
};
