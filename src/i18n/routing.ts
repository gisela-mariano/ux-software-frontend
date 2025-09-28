import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/login": {
      en: "/login",
      pt: "/entrar",
    },
    "/register": {
      en: "/register",
      pt: "/cadastrar",
    },
    "/products": {
      en: "/products",
      pt: "/produtos",
    },
    "/cart": {
      en: "/cart",
      pt: "/carrinho",
    },
  },
});
