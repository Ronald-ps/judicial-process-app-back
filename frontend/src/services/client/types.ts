type ClientMaritalStatus = "solteiro" | "casado" | "divorciado" | "viuvo";
export const clientMaritalStatus: {
  [key: string]: { label: string; value: ClientMaritalStatus };
} = {
  solteiro: { label: "Solteiro", value: "solteiro" },
  casado: { label: "Casado", value: "casado" },
  divorciado: { label: "Divorciado", value: "divorciado" },
  viuvo: { label: "Viúvo", value: "viuvo" },
};

type EducationLevel = "fundamental" | "medio" | "superior";
export const educationLevel: {
  [key: string]: { label: string; value: EducationLevel };
} = {
  fundamental: { label: "Ensino fundamental", value: "fundamental" },
  medio: { label: "Ensino médio", value: "medio" },
  superior: { label: "superior", value: "superior" },
};

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  cellphone: string;
  email: string;
  father_name: string;
  mother_name: string;
  childrens_quantity: number;
  education_level: EducationLevel;
  profession: string;
  marital_status: ClientMaritalStatus;
  address: string;
  city: string;
}

export interface ClientForSave extends Omit<Client, "id"> {
  birth_date: string | Date;
}

export interface SimpleProcess {
  id: number;
  code: string;
}
