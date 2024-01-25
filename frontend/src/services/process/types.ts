import { Honorary, type Client } from "@services/client/types";

export interface Observation {
  id: number;
  description: string;
  process_id: number;
  process_code: string;
  created_at: string;
}

export interface Evolution {
  id: number;
  description: string;
  process_id: number;
  process_code: string;
  file?: string /* file link */;
  created_at: string;
}

export interface Process {
  id: number;
  code: string;
  client: number;
  start_date: string | Date;
  description: string;
  type: string;
}

export interface ProcessForSave extends Partial<Process> {
  client?: number;
}

export interface DetailedProcess extends Process {
  id: number;
  code: string;
  client: Client;
  start_date: string;
  description: string;
  observations: Observation[];
  evolutions: Evolution[];
  honoraries: Honorary[];
  type: string;
}

export interface ProcessForSave extends Omit<Process, "id"> {}
