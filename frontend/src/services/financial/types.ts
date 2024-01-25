export interface Honorary {
  id: number;
  date: Date | string;
  process: number;
  process_code: string;
  description: string;
  value: string;
  paid_value: string;
  created_at: Date | string;
  created_by: number /* id do criador */;
}

export interface HonoraryForSave {
  date?: Date | string;
  process?: number | string;
  description?: string;
  value?: number;
  paid_value?: number;
}
