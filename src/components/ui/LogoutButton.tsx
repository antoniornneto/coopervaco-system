"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/ata`,
        })
      }
      className="bg-transparent font-normal text-base p-0 hover:bg-transparent hover:underline"
    >
      Sair
    </Button>
  );
};

export default LogoutButton;
