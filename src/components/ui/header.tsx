"use client";

import Image from "next/image";
import Link from "next/link";
import { logoCooperativa } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
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
  const [burguerMenuState, setBurguerMenuState] = useState(false);
  const pathname = usePathname();

  const menuBurguerOpenAndClose = (state: boolean) => {
    if (!state) {
      setBurguerMenuState(true);
      return;
    } else {
      setBurguerMenuState(false);
    }
  };

  return (
    <header className="flex relative w-full h-16 bg-dark_green text-white justify-around items-center">
      <div className="flex w-[75%] justify-between items-center h-full lg:w-[90%]">
        <div>
          <Image
            className="h-auto w-48"
            priority
            src={logoCooperativa}
            width={0}
            height={0}
            alt="logo da cooperativa"
          />
        </div>
        <nav className="h-full flex justify-center items-center">
          <button
            className="hidden md:block"
            onClick={() => menuBurguerOpenAndClose(burguerMenuState)}
          >
            <Menu size={44} className="cursor-pointer" />
          </button>
          {/* Menu Desktop */}
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
                      ? "bg-light_green font-bold py-2 px-3 rounded-lg"
                      : ""
                  } hover:bg-light_green hover:font-bold hover:rounded-lg hover:px-3 hover:py-2`}
                  href={link.path_name}
                >
                  {link.name}
                </Link>
                <ul className="absolute transition-all rounded-lg py-4 space-y-2 hidden flex-col right-0 top-10 bg-light_green group-hover:flex w-full">
                  <li>
                    <Link
                      href={"/orientacoes/convenios"}
                      className={`${
                        pathname === link.path_name
                          ? "bg-light_green px-3 rounded"
                          : ""
                      } hover:underline`}
                    >
                      Convênios
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/orientacoes/parceiros"}
                      className={`${
                        pathname === link.path_name
                          ? "bg-light_green px-3 rounded"
                          : ""
                      } hover:underline`}
                    >
                      Parceiros
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/orientacoes/noticias"}
                      className={`${
                        pathname === link.path_name
                          ? "bg-light_green px-3 rounded"
                          : ""
                      } hover:underline`}
                    >
                      Notícias
                    </Link>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {burguerMenuState && (
        <aside
          className={`fixed top-0 right-0 flex-col bg-dark_green h-screen w-1/3 text-2xl space-y-4 hidden md:flex`}
        >
          <button onClick={() => menuBurguerOpenAndClose(burguerMenuState)}>
            <X size={44} className="m-auto" />
          </button>
          <nav>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <li className={`m-auto flex flex-col gap-2`} key={index}>
                  <Link
                    className="flex hover:underline items-center gap-2"
                    href={link.path_name}
                  >
                    {link.name}
                    <ChevronDown
                      className={
                        link.name === "Orientações" ? "block" : "hidden"
                      }
                    />
                  </Link>
                  <ul
                    className={`${
                      link.name === "Orientações" ? "flex flex-col" : "hidden"
                    } rounded-lg gap-2 items-center py-4 bg-light_green`}
                  >
                    <li>
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
                    </li>
                    <li>
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
                    </li>
                    <li>
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
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </header>
  );
}
