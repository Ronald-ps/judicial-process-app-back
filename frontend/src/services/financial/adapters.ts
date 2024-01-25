import { type Honorary, type HonoraryForSave } from "./types";
import { defaultClient } from "@services/api";

export const getHonoraries = async (clientId: number | string) => {
  const honoraries: Honorary[] = await defaultClient
    .get("honorary", { params: { client: clientId } })
    .then((r) => r.data.results);
  return honoraries;
};

export const saveHonorary = async ({
  honorary,
}: {
  honorary: HonoraryForSave;
}) => {
  return (await defaultClient
    .post("honorary/", honorary)
    .then((r) => r.data)) as Honorary;
};
