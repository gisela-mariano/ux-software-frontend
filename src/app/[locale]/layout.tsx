import { Header } from "@/components/atoms/header";
import { routing } from "@/i18n/routing";
import { SessionProvider } from "@/providers/sessionProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { PrimeReactProvider } from "primereact/api";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <PrimeReactProvider>
      <NextIntlClientProvider messages={messages}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </NextIntlClientProvider>
    </PrimeReactProvider>
  );
}
