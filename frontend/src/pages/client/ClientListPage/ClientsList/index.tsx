import { type Client } from "@services/client/types";
import { ScrollAreaAutosize, Table } from "@mantine/core";
import { Text } from "@mantine/core";
import classes from "./ClientList.module.css";
import { useNavigate,  } from "react-router-dom";
import { useConstructRoute } from "@pages/hooks";
import { ROUTER_PATHS } from "@pages/routers"

interface ClientsListProps {
  clients: Client[];
}
export const ClientsList = (props: ClientsListProps) => {
  const navigate = useNavigate();
  const constructRoute = useConstructRoute();

  const rows = props.clients.map((client, i) => (
    <Table.Tr key={client.id}>
      <Table.Td>
        <Text opacity="0.7" px="10px">
          {client.id}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text
          opacity="0.7"
          px="10px"
          className={classes.clientRowTdText}
          onClick={() => {
            navigate(constructRoute({routerPath: ROUTER_PATHS.CLIENT_DETAIL, params: { clientId: client.id}}));
          }}
        >
          {client.first_name} {client.last_name}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <ScrollAreaAutosize h="100%">
      <Table striped>
        <Table.Tbody>{rows}</Table.Tbody>
        {rows.length === 0 && (
          <Table.Caption>
            <Text>Nenhum cliente encontrado para esses filtros</Text>
          </Table.Caption>
        )}
      </Table>
    </ScrollAreaAutosize>
  );
};
