import { Stack } from "@mantine/core";
import { HonoraryForm } from "@components/financial/HonoraryForm";
import { saveHonorary } from "@/services/financial/adapters";
import { HonoraryForSave } from "@/services/financial/types";

interface NewHonoraryProps {
  onSaveHonorary: () => void;
  clientId: number;
}
export const NewHonorary = (props: NewHonoraryProps) => {
  const handleSubmit = async (honorary: HonoraryForSave) => {
    await saveHonorary({ honorary });
    props.onSaveHonorary();
  };

  return (
    <Stack>
      <HonoraryForm onSubmit={handleSubmit} clientId={props.clientId} />
    </Stack>
  );
};
