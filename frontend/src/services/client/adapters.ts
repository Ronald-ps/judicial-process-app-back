import { defaultClient } from "@services/api";
import type { Client, ClientForSave, SimpleProcess } from "./types";
import type {
  DetailedProcess,
  Evolution,
  ProcessForSave,
} from "@services/process/types";

export const getClients = async ({
  searchTerm,
}: {
  searchTerm?: string;
}): Promise<Client[]> => {
  const clients: Client[] = await defaultClient
    .get(`client`, { params: { search_term: searchTerm || "", limit: "15" } })
    .then((r) => r.data.results);
  return clients;
};

export const saveClient = async (client: ClientForSave): Promise<Client> => {
  const savedClient: Client = await defaultClient
    .post(`client/`, client)
    .then((r) => r.data);
  return savedClient;
};

export const updateClient = async (
  client: ClientForSave,
  clientId: number | string
): Promise<Client> => {
  const updatedClient: Client = await defaultClient
    .patch(`client/${clientId}/`, client, {
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.data);
  return updatedClient;
};

export const getClient = async (clientId: number | string) => {
  const client: Client = await defaultClient
    .get(`client/${clientId}`)
    .then(({ data }) => data);
  return client;
};

export const getLegalProcessesByClient = async (clientId: number) => {
  const process: DetailedProcess[] = await defaultClient
    .get(`client/${clientId}/legal-process`)
    .then(({ data }) => data);
  return process;
};

export const processCreate = async (params: {
  process: ProcessForSave;
  clientId: number | string;
}) => {
  let date = "";
  if (typeof params.process.start_date === "string") {
    date = params.process.start_date.split("T")[0];
  }
  if (typeof params.process.start_date === "object") {
    date = params.process.start_date.toISOString().split("T")[0];
  }
  const savedProcess: DetailedProcess = await defaultClient
    .post(`process/`, {
      ...params.process,
      start_date: date,
      client: params.clientId,
    })
    .then(({ data }) => data);
  return savedProcess;
};

export const getSimpleProcesses = async (clientId: number | string) => {
  const process: SimpleProcess[] = await defaultClient
    .get(`client/${clientId}/legal-process/simple`)
    .then(({ data }) => data);
  return process;
};

export const evolutionCreate = async (
  processId: number | string,
  description: string,
  file?: File
) => {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("process", String(processId));

  if (file) {
    formData.append("file", file);
  }

  const evolutionCreated: Evolution = await defaultClient
    .post(`evolution/`, formData)
    .then(({ data }) => data);
  return evolutionCreated;
};

export const observationCreate = async (
  processId: number | string,
  description: string
) => {
  const observationCreated: Evolution = await defaultClient
    .post(`observation/`, { description, process: processId })
    .then(({ data }) => data);
  return observationCreated;
};

export const getProfileImage = async (clientId: number | string) => {
  const profileImage: Blob = await defaultClient
    .get(`client/${clientId}/profile-image`, {
      responseType: "blob",
    })
    .then((response) => response.data);
  return profileImage;
};

export const updateProfileImage = async (params: {
  clientId: number | string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("profile-image", params.file);
  const profileImage: Blob = await defaultClient
    .post(`client/${params.clientId}/profile-image/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
  return profileImage;
};
