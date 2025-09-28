import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "primeicons/primeicons.css";
import { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
  params?: { locale?: "pt" | "en" };
};

export default function RootLayout({ children, params }: Props) {
  const locale = params?.locale ?? "pt";

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
