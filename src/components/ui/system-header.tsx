import { logoCooperativaX } from "@/lib/utils";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HeaderSystem() {
  const session = await getServerSession(authOptions);
  const name = session?.user.name as string;
  const letterName = name.slice(0, 2).toUpperCase();
  return (
    <header className="flex justify-center w-full">
      <div className="bg-[#E7E7E7] w-[25%] flex justify-center items-center md:w-[50%]">
        <Image
          src={logoCooperativaX}
          width={0}
          height={0}
          alt="Logo da cooperativa"
          className="w-52"
          priority
        />
      </div>

      <div className="flex-1 bg-[#3D6C6D] flex justify-end py-2 px-4">
        <div className="flex flex-col items-center w-fit">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{letterName}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-4">
            <Link
              className="text-white hover:underline"
              href={"/dashboard/profile"}
            >
              Perfil
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
