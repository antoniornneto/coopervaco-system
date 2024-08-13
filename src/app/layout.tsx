import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const open = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coopervaço",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={open.className}>{children}</body>
    </html>
  );
}
