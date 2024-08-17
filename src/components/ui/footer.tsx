import { logoCooperativaX } from "@/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import facebookLogo from "../../../public/assets/facebook.svg";
import instagramLogo from "../../../public/assets/instagram.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark_green w-full text-white flex flex-col space-y-4 py-6 justify-center items-center">
      <Image
        src={logoCooperativaX}
        width={0}
        height={0}
        alt="logo da cooperativa"
        className="w-[300px]"
      />
      <div className="flex items-center gap-8">
        <Link
          className="flex flex-col justify-center items-center"
          href={"https://www.facebook.com/"}
          target="_blank"
        >
          <SiFacebook />
          <span>Facebook</span>
        </Link>
        <Link
          className="flex flex-col justify-center items-center"
          href={"https://www.instagram.com/coopervaco1"}
          target="_blank"
        >
          <SiInstagram />
          <span>Instagram</span>
        </Link>
        <Link
          className="flex flex-col justify-center items-center"
          href={"https://painel.curia.coop/login"}
          target="_blank"
        >
          <PanelsTopLeft />
          <span>Cúria</span>
        </Link>
      </div>
      <p className="text-2xl">Tel: (31) 3668-2498</p>
      <p className="text-md md:w-[300px]">
        Avenida Castelo Branco, Número 632 - Sala 210 - Bairro Horto - Ipatinga
        - MG
      </p>
      <p className="text-xs text-[#385968]">
        Copyright © 2014 Coopervaço Todos direitos reservados.
      </p>
    </footer>
  );
}
