import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Provider from "@/components/ui/Provider";
import { Toaster } from "sonner";

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
      <body className={open.className}>
        <Provider>
          {children}
          <Toaster position="top-left" richColors />
        </Provider>
      </body>
    </html>
  );
}
