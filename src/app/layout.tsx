import "primeicons/primeicons.css";
import { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
