export type SessionUserProps =
  | {
      userId: string;
      employeeId: string;
      name: string;
      email: string;
      role: string;
    }
  | undefined;

export interface HandleErrorParams {
  data: any;
  status: number;
  ok: boolean;
}

export interface EmailTemplateProps {
  titleAta: string;
  date: string;
}

export interface FetchAPIParams {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: Record<string, unknown>;
}

export type FormatedDataParams = {
  id?: string;
  cpf?: string;
  name?: string;
  position?: string;
  email?: string;
  inscription?: string;
  password?: string;
};

export type EmployeeDataProps = {
  id: string;
  cpf: string;
  name: string;
  inscription: string;
  email?: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AtasDataProps = {
  id: string;
  title: string | null;
  topics: string | null;
  approved_topics: string | null;
  createdAt: Date;
  updatedAt: Date;
  participants: any;
}[];

export interface UsersDataProps {
  id: string;
  name: string | null;
  role: string | null;
  image: string | null;
  inscription: string | null;
  position: string | null;
  signature: string | null;
  cpf: string | null;
  email: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  employeeId: string;
}

export type UserDataProps = {
  id: string;
  name: string | null;
  role: string | null;
  image: string;
  inscription: string | null;
  signature: string | null;
  cpf: string | null;
  email: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  employeeId: string;
};

export type AtaDataProps = {
  id: string;
  title?: string | null;
  topics?: string | null;
  approved_topics?: string | null;
  createdAt?: Date;
  updatedAt: Date;
  participants: any;
} | null;

export type UserProp = {
  id?: string;
  sign?: boolean;
  email?: string;
  name?: string;
  inscription?: string;
}[];

export interface ParticipantProp {
  id: string;
  name: string;
  inscription: string;
  sign: boolean;
  email: string;
}
