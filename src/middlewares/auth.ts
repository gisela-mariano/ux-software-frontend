import { CookieKeys } from "@/types/cookies";
import { NextRequest, NextResponse } from "next/server";

export const validateLogin = (request: NextRequest) => {
  const token = request.cookies.get(CookieKeys.TOKEN)?.value;

  const protectedPaths = ["/cart", "/carrinho", "/admin"];

  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !token) {
    const res = NextResponse.redirect(new URL("/login", request.url));

    const flashData = {
      message: "toast.message.error.expiredSession",
      severity: "warn",
    };

    res.cookies.set(CookieKeys.FLASH_MESSAGE, JSON.stringify(flashData), {
      path: "/",
      httpOnly: false,
      maxAge: 10,
    });

    return res;
  }

  return null;
};
