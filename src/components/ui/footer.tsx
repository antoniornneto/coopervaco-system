import { logoCooperativaX } from "@/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import facebookLogo from "../../../public/assets/facebook.svg";
import instagramLogo from "../../../public/assets/instagram.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark_green w-full h-full text-white space-y-8 py-10 flex flex-col  justify-center items-center md:flex-col">
      <div className="flex items-center gap-4 md:flex-col">
        <div className="w-[1/3]">
          <Image
            src={logoCooperativaX}
            width={0}
            height={0}
            alt="logo da cooperativa"
            className="w-[300px]"
          />
        </div>
        <hr className="border-white border-[1px] border-y-[100px] md:border-y-[1px] md:border-x-[150px]" />
        <div className="w-96 space-y-5 flex flex-col justify-center items-center md:w-fit">
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
          <p className="text-md text-center md:w-[300px]">
            Avenida Castelo Branco, Número 632 - Sala 210 - Bairro Horto -
            Ipatinga - MG
          </p>
        </div>
      </div>
      <p className="text-xs text-[#385968]">
        Copyright © 2014 Coopervaço Todos direitos reservados.
      </p>
    </footer>
  );
}
