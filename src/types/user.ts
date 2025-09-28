export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  cpf: string;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
};

export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}
