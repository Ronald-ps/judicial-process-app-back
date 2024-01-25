import { formatDate } from "@/helpers/dateUtils";
import { Box, Grid, Stack, Text } from "@mantine/core";
import type { Client } from "@services/client/types";

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

interface ClientInfoShowProps {
  client: Client;
}
/**
 * @description painel de informações pessoais do cliente
 * @param {Client} cliente - cliente a ser exibido
 */
export const ClientInfoShow = (props: ClientInfoShowProps) => {
  const { client } = props;

  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age.toString();
  };
  return (
    <Stack
      gap={32}
      p="32px"
      style={{ border: "2px solid #D3D3D3", borderRadius: "5x" }}
    >
      <Grid>
        <Grid.Col span={4}>
          <InformationItem label="Nome" value={client.first_name} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem label="Sobrenome" value={client.last_name} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem
            label="Data de nascimento"
            value={formatDate({
              date: client.birth_date,
              withTime: false,
            })}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <InformationItem label="CPF" value={client.cpf} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem label="RG" value={client.rg} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem
            label="Idade"
            value={calculateAge(client.birth_date)}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <InformationItem
            label="Nível de escolaridade"
            value={client.education_level}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem label="Profissão" value={client.profession} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem label="Estado civil" value={client.marital_status} />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <InformationItem label="Nome do pai" value={client.father_name} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem label="Nome da mãe" value={client.mother_name} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem
            label="Quantidade de filhos"
            value={client.childrens_quantity.toString()}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <InformationItem label="Telefone" value={client.phone} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem label="Celular" value={client.cellphone} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem label="Email" value={client.email} />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={8}>
          <InformationItem label="Endereço" value={client.address} />
        </Grid.Col>
        <Grid.Col span={4}>
          <InformationItem label="Cidade" value={client.city} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
