export type SessionUserProps =
  | { name: string; email: string; role: string }
  | undefined;

export interface ParticipantProp {
  name: string;
  inscription: string;
}

export type EmployeeDataProps = {
  id: string;
  cpf: string;
  name: string;
  inscription: string;
  birthday: Date;
  position: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type AtasDataProps = {
  id: string;
  title: string | null;
  topics: string | null;
  approved_topics: string | null;
  createdAt: Date;
  updatedAt: Date;
  signatures: string | null;
  participants: any;
}[];

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
}[];

export type AtaDataProps = {
  id: string;
  title: string | null;
  topics: string | null;
  approved_topics: string | null;
  createdAt: Date;
  updatedAt: Date;
  signatures: string | null;
  participants: any;
} | null;

export type UserProp = {
  inscription: string;
  name: string;
}[];
