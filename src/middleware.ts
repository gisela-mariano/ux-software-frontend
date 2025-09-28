import { validateLogin, validateRole } from "@/middlewares";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const loginValidation = validateLogin(request);
  if (loginValidation) return loginValidation;

  const roleValidation = validateRole(request);
  if (roleValidation) return roleValidation;

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
