import { Process, ProcessForSave } from "@/services/process/types";
import { ProcessForm } from "@components/process/ProcessForm";
import { updateProcess as updateProcessService } from "@/services/process/adapters";

interface EditProcessForm {
  process: Process;
  onSave: () => void;
}
export const EditProcessForm = (props: EditProcessForm) => {
  const updateProcess = async (processForSave: ProcessForSave) => {
    await updateProcessService({
      process: processForSave,
      processId: props.process.id,
    });
    props.onSave();
  };

  return <ProcessForm onSubmit={updateProcess} process={props.process} />;
};
