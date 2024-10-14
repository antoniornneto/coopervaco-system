"use client";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface ProviderProps {
  children: ReactNode;
}
const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      {" "}
      <ProgressBar
        height="3px"
        color="#fff"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </SessionProvider>
  );
};

export default Provider;
