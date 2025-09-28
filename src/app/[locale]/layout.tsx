import { Header } from "@/components/atoms/header";
import { SessionProvider } from "@/providers/sessionProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { PrimeReactProvider } from "primereact/api";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children }: Readonly<Props>) {
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
