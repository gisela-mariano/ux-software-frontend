"use server";

import { apiFetch } from "@/lib/api";
import { CreateUser, LoginResponse, RegisterResponse, TokenData } from "@/types";
import { CookieKeys } from "@/types/cookies";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getTokenFromCookies = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();

  return cookieStore.get("token")?.value;
};

export const setTokenInCookies = async (token: string): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });

  cookieStore.set(CookieKeys.IS_LOGGED_IN, "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });
};

export const setRoleInCookies = async (token: string): Promise<void> => {
  const cookieStore = await cookies();

  try {
    const decoded = jwt.decode(token) as TokenData;

    const role = decoded.role;

    cookieStore.set(CookieKeys.ROLE, role, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60,
    });
  } catch {}
};

export const removeTokenFromCookies = async (): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.set(CookieKeys.IS_LOGGED_IN, "0", {
    path: "/",
    maxAge: 0,
  });
};

export const login = async (email: string, password: string): Promise<void> => {
  const res = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const { accessToken } = res;

  await Promise.all([setTokenInCookies(accessToken), setRoleInCookies(accessToken)]);
};

export const logout = async (): Promise<void> => {
  await removeTokenFromCookies();
};

export const createUser = async (user: CreateUser): Promise<void> => {
  const res = await apiFetch<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
  });

  const { accessToken } = res;

  await setTokenInCookies(accessToken);
};
