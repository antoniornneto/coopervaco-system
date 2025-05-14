"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      className="bg-[#11414C] px-2 hover:border-[#11414C] border-[1px] border-transparent"
    >
      <DoorOpen color="#5DA770" />
    </Button>
  );
};

export default LogoutButton;
