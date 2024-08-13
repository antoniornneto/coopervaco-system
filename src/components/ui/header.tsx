"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/logo.png";
import { Menu } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    name: "Home",
    path_name: "/",
  },
  {
    name: "Sobre",
    path_name: "/sobre",
  },
  {
    name: "Equipe",
    path_name: "/equipe",
  },
  {
    name: "Eventos Dia C",
    path_name: "/eventos",
  },
  {
    name: "Orientações",
    path_name: "/orientacoes",
  },
  {
    name: "Contato",
    path_name: "/contato",
  },
  {
    name: "Ata",
    path_name: "/ata",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [orientacoesModal, setOrientacoesModal] = useState(false);

  return (
    <header className="flex w-full h-16 bg-dark_green text-white justify-around items-center">
      <div className="flex w-[75%] justify-between items-center h-full">
        <div className="">
          <Image src={logo} alt="logo da cooperativa" />
        </div>
        <nav className="h-full flex justify-center items-center">
          <ul className="flex h-full gap-2 text-sm md:hidden transition-all">
            {navLinks.map((link, index) => (
              <li
                className={` ${
                  link.name === "Orientações" ? "relative group" : ""
                } ${
                  link.name === "Eventos Dia C" || link.name === "Orientações"
                    ? "w-32"
                    : "w-20"
                } text-sm h-full space-y-3 flex justify-center items-center cursor-pointer text-center uppercase transition-all rounded-lg active:font-bold`}
                key={index}
              >
                <Link
                  className={`${
                    pathname === link.path_name
                      ? "bg-light_green font-bold py-2 px-3 rounded"
                      : ""
                  } hover:bg-light_green hover:font-bold hover:rounded hover:px-3 hover:py-2`}
                  href={link.path_name}
                >
                  {link.name}
                </Link>
                <div className="absolute transition-all rounded-lg gap-1 hidden justify-around flex-col right-0 top-10 bg-light_green py-3 group-hover:flex w-full h-28">
                  <Link
                    href={"/orientacoes/convenios"}
                    className={`${
                      pathname === link.path_name
                        ? "bg-light_green py-2 px-3 rounded"
                        : ""
                    } hover:underline`}
                  >
                    Convênios
                  </Link>
                  <Link
                    href={"/orientacoes/parceiros"}
                    className={`${
                      pathname === link.path_name
                        ? "bg-light_green py-2 px-3 rounded"
                        : ""
                    } hover:underline`}
                  >
                    Parceiros
                  </Link>
                  <Link
                    href={"/orientacoes/noticias"}
                    className={`${
                      pathname === link.path_name
                        ? "bg-light_green py-2 px-3 rounded"
                        : ""
                    } hover:underline`}
                  >
                    Notícias
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Navbar mobile */}
    </header>
  );
}
