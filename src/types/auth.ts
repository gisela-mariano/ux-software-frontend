import { User } from "@/types/user";

export type LoginResponse = {
  user: User;
  accessToken: string;
};

export type RegisterResponse = LoginResponse;

export type TokenData = {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};
