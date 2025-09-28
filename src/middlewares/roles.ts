import { TokenData, UserRoles } from "@/types";
import { CookieKeys } from "@/types/cookies";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const roleMap: Record<string, string[]> = {
  "/admin": [UserRoles.ADMIN],
};

export const validateRole = (request: NextRequest) => {
  const token = request.cookies.get(CookieKeys.TOKEN)?.value;
  if (!token) return null;

  let decoded: TokenData;

  try {
    decoded = jwt.decode(token) as TokenData;
  } catch {
    return null;
  }

  const role = decoded.role;

  for (const path in roleMap) {
    if (request.nextUrl.pathname.startsWith(path)) {
      if (!roleMap[path].includes(role)) {
        const res = NextResponse.redirect(new URL("/", request.url));

        const flashData = {
          message: "toast.message.error.unauthorizedAccess",
          severity: "error",
        };

        res.cookies.set(CookieKeys.FLASH_MESSAGE, JSON.stringify(flashData), {
          path: "/",
          httpOnly: false,
          maxAge: 10,
        });

        return res;
      }
    }
  }

  return null;
};
