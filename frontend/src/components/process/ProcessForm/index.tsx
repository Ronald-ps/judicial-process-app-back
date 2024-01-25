import { useForm } from "@mantine/form";
import { TextInput, Button, Stack, Select, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import type { Process, ProcessForSave } from "@/services/process/types";
import { PROCESS_SERVICES } from "@/services/process/constants";

interface ProcessFormProps {
  onSubmit: (process: ProcessForSave) => void;
  process?: Process;
}
export const ProcessForm = (props: ProcessFormProps) => {
  const initialValues = {
    code: "",
    description: "",
    start_date: new Date(),
    type: "",
  };
  if (props.process) {
    initialValues.code = props.process.code;
    initialValues.description = props.process.description;
    initialValues.start_date = new Date(props.process.start_date);
    initialValues.type = props.process.type;
  }

  const processForm = useForm({
    initialValues,
    transformValues: (values) => ({
      ...values,
      start_date: values.start_date.toISOString().split("T")[0],
    }),
  });
  return (
    <form
      onSubmit={processForm.onSubmit(async (values) => {
        await props.onSubmit(values);
      })}
    >
      <Stack>
        <TextInput
          label="Número"
          {...processForm.getInputProps("code")}
          required
        />
        <Textarea
          autosize
          label="Descrição"
          {...processForm.getInputProps("description")}
          required
        />
        <DateInput
          label="Data de início"
          {...processForm.getInputProps("start_date")}
          required
        />
        <Select
          label="Serviços"
          data={Object.keys(PROCESS_SERVICES).map((key: string) => ({
            // @ts-expect-error typescript as vezes é burro
            value: PROCESS_SERVICES[key],
            // @ts-expect-error typescript as vezes é burro
            label: PROCESS_SERVICES[key],
          }))}
          {...processForm.getInputProps("type")}
          required
        />
        <Button type="submit">Salvar</Button>
      </Stack>
    </form>
  );
};
