export type SessionUserProps =
  | {
      userId: string;
      employeeId: string;
      name: string;
      email: string;
      role: string;
    }
  | undefined;

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
  participants: any;
}[];

export type UsersDataProps = {
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
  title: string | null;
  topics: string | null;
  approved_topics: string | null;
  createdAt: Date;
  updatedAt: Date;
  participants: any;
} | null;

export type UserProp = {
  id: string;
  sign: boolean;
}[];

export interface ParticipantProp {
  id: string;
  name: string;
  inscription: string;
  sign: boolean;
}
