import HeaderSystem from "@/components/ui/system-header";
import ListarAtas from "@/modules/gets/components/listar-atas";
import Link from "next/link";

import React from "react";

export default function Sistema() {
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
                  className="rounded-lg bg-transparent border-zinc-500 border-[1px] py-2 px-6 text-lg font-semibold"
                  name=""
                  id=""
                >
                  <option value="2024">2024</option>
                </select>
                <Link
                  href="/coopervaco-system/criar-ata"
                  className="rounded-xl bg-[#5DA770] px-8 text-white py-2"
                >
                  Criar Ata
                </Link>
              </div>
            </div>

            {/* SESSÃO LISTA DE ATAS */}
            <ListarAtas />
          </div>
        </div>
      </div>
    </main>
  );
}
