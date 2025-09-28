import { UserRoles } from "@/types";
import { CookieKeys } from "@/types/cookies";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  role: UserRoles | null;
  setAuthenticated: (value: boolean) => void;
  setRoleFromCookie: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated:
    typeof window !== "undefined"
      ? document.cookie.includes(`${CookieKeys.IS_LOGGED_IN}=1`)
      : false,
  role: (typeof window !== "undefined"
    ? document.cookie
        .split("; ")
        .find((row) => row.startsWith("role="))
        ?.split("=")[1] || null
    : null) as UserRoles | null,

  setAuthenticated: (value) => {
    set({ isAuthenticated: value });

    if (typeof window !== "undefined") {
      document.cookie = `${CookieKeys.IS_LOGGED_IN}=${value ? "1" : "0"}; path=/; max-age=3600`;
    }
  },

  setRoleFromCookie: () => {
    if (typeof window === "undefined") return;

    const role = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${CookieKeys.ROLE}=`))
      ?.split("=")[1] as UserRoles | null;

    set({ role });
  },

  logout: () => {
    set({ isAuthenticated: false, role: null });

    if (typeof window !== "undefined") {
      document.cookie = `${CookieKeys.IS_LOGGED_IN}=0; path=/; max-age=0`;
      document.cookie = `${CookieKeys.ROLE}=; path=/; max-age=0`;
    }
  },
}));
