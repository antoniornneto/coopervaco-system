"use client";

import { Button } from "@/components/ui/button";
import HeaderSystem from "@/components/ui/system-header";
import ListarAtas from "@/modules/gets/components/listar-atas";
import ListarUsuarios from "@/modules/gets/components/listar-usuarios";
import Link from "next/link";
import React from "react";

export default function Sistema() {
  const [modal, setModal] = React.useState(false);

  function handleModal(isOpen: boolean): void {
    if (!isOpen) {
      setModal(true);
    } else {
      setModal(false);
    }
  }
  return (
    <main>
      <HeaderSystem />
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          <div className="flex flex-col justify-center">
            {/* SESSÃO PRIMÁRIA */}
            <div className="bg-[#F0F0F0] flex justify-center">
              <div className="w-[80%] flex items-center py-10 gap-10">
                <h1 className="text-4xl text-[#606060]">Atas de Reuniões</h1>
                <select
                  className="rounded-lg bg-transparent border-zinc-500 border-[1px] px-6 text-lg font-semibold"
                  name=""
                  id=""
                >
                  <option value="2024">2024</option>
                </select>
                <Button
                  onClick={() => handleModal(modal)}
                  className="rounded-xl bg-[#5DA770] px-8"
                >
                  Criar Ata
                </Button>
              </div>
            </div>

            {/* SESSÃO LISTA DE ATAS */}
            <div className="flex justify-center">
              <div className="w-[80%] flex flex-col py-10">
                <ListarAtas />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CRIAR ATAS */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-[754px] h-[526px] rounded-lg space-y-4 p-4">
            <div>
              <h1 className="text-2xl font-semibold">
                Participantes da Reunião
              </h1>
              <p className="text-sm">
                Selecione as pessoas que irão participar da reunião
              </p>
            </div>

            <div>
              <ListarUsuarios />
            </div>

            <div className="flex gap-4 items-center">
              <Link
                className="bg-[#5DA770] text-white rounded-3xl px-4 py-2"
                href={"/coopervaco-system/criar-ata"}
              >
                Próximo
              </Link>
              <Button
                className="rounded-3xl bg-zinc-300 text-[#5DA770] border-[#5DA770] border-[1px]"
                onClick={() => handleModal(modal)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
