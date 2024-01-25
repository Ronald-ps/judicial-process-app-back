import { formatDate } from "@/helpers/dateUtils";
import { useNavigateWithConstructRoute } from "@/pages/hooks";
import { ROUTER_PATHS } from "@/pages/routers";
import { Box, Button, Flex, Grid, Group, Stack, Text } from "@mantine/core";
import type { Client } from "@services/client/types";
import { ClientInfoShow } from "@components/client/ClientInfoShow";

export const InformationItem = (props: { label: string; value: string }) => {
  const { label, value } = props;
  return (
    <Box>
      <Text component="span" fw={500}>
        {label}:
      </Text>
      <Text component="span" ml={12}>
        {value}
      </Text>
    </Box>
  );
};

interface InformationPanelProps {
  client: Client;
}
/**
 * @description painel de informações pessoais do cliente
 * @param {Client} cliente - cliente a ser exibido
 */
export const InformationPanel = (props: InformationPanelProps) => {
  const { client } = props;
  const navigate = useNavigateWithConstructRoute();

  return (
    <div>
      <Stack w={"80%"}>
        <Text fz="1.5em" fw={500}>
          Informações pessoais
        </Text>

        <Stack>
          <ClientInfoShow client={props.client} />

          <Flex justify={"end"} pr={40} pt={30}>
            <Button
              onClick={() => {
                navigate({
                  routerPath: ROUTER_PATHS.EDIT_CLIENT,
                  params: { clientId: client.id },
                });
              }}
            >
              Editar informações
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </div>
  );
};
