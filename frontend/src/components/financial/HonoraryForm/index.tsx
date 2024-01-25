import { getSimpleProcesses } from "@/services/client/adapters";
import { Button, NumberInput, Select, Stack, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import type { SimpleProcess } from "@services/client/types";

import { HonoraryForSave } from "@services/financial/types";
import { useEffect, useState } from "react";

interface HonoraryFormProps {
  clientId: string | number;
  onSubmit: (honorary: HonoraryForSave) => void;
}
export const HonoraryForm = (props: HonoraryFormProps) => {
  const [processes, setProcesses] = useState([] as SimpleProcess[]);

  const form = useForm({
    initialValues: {
      date: new Date(),
      value: 0,
      paid_value: 0,
      description: "",
      process: "",
    },
  });

  const getProcesses = async () => {
    const simpleProcessList = await getSimpleProcesses(props.clientId);
    setProcesses(simpleProcessList);
  };

  useEffect(() => {
    if (!props.clientId) {
      return;
    }
    getProcesses();
  }, [props.clientId]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const valuesCopy = {
          ...form.values,
          date: form.values.date.toISOString().split("T")[0],
        };
        props.onSubmit(valuesCopy as HonoraryForSave);
      }}
    >
      <Stack>
        <Select
          data={processes.map((proc): { value: string; label: string } => ({
            value: proc.id.toString(),
            label: proc.code,
          }))}
          required
          label="Processo"
          {...form.getInputProps("process")}
        />
        <DateInput label="Data" required {...form.getInputProps("date")} />
        <NumberInput label="Valor" required {...form.getInputProps("value")} />
        <NumberInput
          label="Valor pago"
          required
          {...form.getInputProps("paid_value")}
        />
        <Textarea
          label="Descrição"
          required
          variant="filled"
          size="sm"
          {...form.getInputProps("description")}
        />
        <Button type="submit">Salvar</Button>
      </Stack>
    </form>
  );
};
