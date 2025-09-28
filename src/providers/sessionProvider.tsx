"use client";

import { CookieKeys } from "@/types/cookies";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

type Message = { message: string; severity: "success" | "info" | "warn" | "error" };

type SessionContextType = {
  message: Message | null;
};

const SessionContext = createContext<SessionContextType>({ message: null });

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const toastRef = useRef<ToastHandle>(null);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const flash = getCookie(CookieKeys.FLASH_MESSAGE);

    if (flash) {
      const parsedFlash = JSON.parse(decodeURIComponent(flash));

      setMessage(parsedFlash);
      deleteCookie(CookieKeys.FLASH_MESSAGE);
      toastRef.current?.show({
        detail: parsedFlash.message,
        severity: parsedFlash.severity,
        translate: true,
      });
    }
  }, []);

  return (
    <SessionContext.Provider value={{ message }}>
      <Toast ref={toastRef} translate />
      {children}
    </SessionContext.Provider>
  );
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Max-Age=0; path=/`;
}
