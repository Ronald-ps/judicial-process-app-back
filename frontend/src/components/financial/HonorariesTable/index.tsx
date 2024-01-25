import { formatDate } from "@/helpers/dateUtils";
import { Honorary } from "@/services/financial/types";
import { Table, Text } from "@mantine/core";
import { useState } from "react";

const TextExpanse = ({ children }) => {
  const [lineClamp, setLineClamp] = useState<number | undefined>(1);
  return (
    <Text
      lineClamp={lineClamp}
      onClick={() => {
        setLineClamp(lineClamp ? undefined : 1);
      }}
      style={{ cursor: "pointer" }}
    >
      {children}
    </Text>
  );
};

interface HonorariesTableProps {
  honoraries: Honorary[];
}
export const HonorariesTable = (props: HonorariesTableProps) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Processo</Table.Th>
          <Table.Th>Data</Table.Th>
          <Table.Th>Histórico</Table.Th>
          <Table.Th>Valor da Ação</Table.Th>
          <Table.Th>Valor pago</Table.Th>
          <Table.Th>Valor restante</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {props.honoraries.map((honor) => (
          <Table.Tr key={honor.id}>
            <Table.Td>{honor.process_code}</Table.Td>
            <Table.Td>{formatDate({ date: honor.date })}</Table.Td>
            <Table.Td>
              <TextExpanse>{honor.description}</TextExpanse>
            </Table.Td>
            <Table.Td>{parseFloat(honor.value).toFixed(2)}</Table.Td>
            <Table.Td>{parseFloat(honor.paid_value).toFixed(2)}</Table.Td>
            <Table.Td>
              {(parseFloat(honor.value) - parseFloat(honor.paid_value)).toFixed(
                2
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
      {props.honoraries.length === 0 && (
        <Table.Caption>
          <Text size="xl">Nenhum honorário</Text>
        </Table.Caption>
      )}
    </Table>
  );
};
