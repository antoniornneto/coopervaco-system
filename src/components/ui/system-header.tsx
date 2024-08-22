import { logoCooperativaX } from "@/lib/utils";
import Image from "next/image";

export default function HeaderSystem() {
  return (
    <header className="flex justify-center w-full">
      <div className="bg-[#E7E7E7] w-[25%] py-4 pl-[5%] md:w-[50%]">
        <Image
          src={logoCooperativaX}
          width={0}
          height={0}
          alt="Logo da cooperativa"
          className="w-52"
        />
      </div>
      <div className="flex-1 bg-[#3D6C6D]">{/* AVATAR E MENU DE LOGIN */}</div>
    </header>
  );
}
