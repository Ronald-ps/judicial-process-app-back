import { defaultClient } from "@services/api";
import { ProcessForSave } from "./types";

export const getDetaildProcess = async (processId: number | string) => {
  const process = await defaultClient
    .get(`process/${processId}`)
    .then((r) => r.data);
  return process;
};

export const getProcesses = async (searchTerm: string) => {
  const processes = await defaultClient
    .get(`process`, {
      params: { code: searchTerm, limit: /* page_size */ "15" },
    })
    .then((r) => r.data.results);
  return processes;
};

export const updateProcess = async (params: {
  process: ProcessForSave;
  processId: number;
}) => {
  const processUpdated = await defaultClient
    .patch(`process/${params.processId}/`, params.process)
    .then((r) => r.data);
  return processUpdated;
};

export const constructEvolutionFileUrl = async (fileLink: string) => {
  const fileBlob = await defaultClient
    .get(fileLink, {
      responseType: "blob",
    })
    .then((r) => r.data);
  const fileUrl = window.URL.createObjectURL(fileBlob);
  return fileUrl;
};
