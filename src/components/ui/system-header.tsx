import { logoCooperativaIcon, logoCooperativaX } from "@/lib/utils";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Settings, UserCog } from "lucide-react";
import { Button } from "./button";

export default async function HeaderSystem() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === "admin";
  const name = session?.user.name as string;
  // const letterName = name.slice(0, 2).toUpperCase();
  const user = await db.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  return (
    <header className="flex justify-center w-full bg-[#0C343D] py-5">
      <div className="w-[90%] flex justify-between items-center">
        <div>
          <Link href={"/dashboard"}>
            <Image
              src={logoCooperativaX}
              width={0}
              height={0}
              alt="Logo da cooperativa"
              className="w-52 md:hidden"
              priority
            />
          </Link>
          <Link href={"/dashboard"}>
            <Image
              src={logoCooperativaIcon}
              width={0}
              height={0}
              alt="Logo da cooperativa"
              className="w-10 hidden md:flex"
              priority
            />
          </Link>
        </div>
        <div className="flex flex-col items-center w-fit">
          {/* <Avatar>
            <AvatarImage src={avatarImage} />
            <AvatarFallback>{letterName}</AvatarFallback>
          </Avatar> */}
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Button className="bg-[#11414C] px-2 hover:border-[#11414C] border-[1px] border-transparent">
                <Link href={"/dashboard/manage-employee"}>
                  <Settings color="#5DA770" />
                </Link>
              </Button>
            )}
            <Button className="bg-[#11414C] px-2 hover:border-[#11414C] border-[1px] border-transparent">
              <Link href={"/dashboard/profile"}>
                <UserCog color="#5DA770" />
              </Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
