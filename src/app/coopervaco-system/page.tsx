"use client";
import { Button } from "@/components/ui/button";
import HeaderSystem from "@/components/ui/system-header";
import ListarAtas from "@/modules/gets/components/listar-atas";
import ListarUsuarios from "@/modules/gets/components/listar-usuarios";
import { redirect } from "next/navigation";
import { X } from "lucide-react";
import React from "react";

export default function Sistema() {
  const [modal, setModal] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const handleModal = (isOpen: boolean) => {
    if (!isOpen) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

  React.useEffect(() => {
    fetch("coopervaco-system/api/users")
      .then((response) => response.json())
      .then((users) => setUsers(users.users));
  }, []);

  function storageUsers() {}

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
                <Button
                  onClick={() => handleModal(modal)}
                  className="rounded-xl bg-[#5DA770] px-8 text-white py-2"
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

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white w-[712px] h-[540px] rounded-lg flex flex-col p-4 gap-2">
            <div className="flex flex-col justify-center">
              <button
                onClick={() => handleModal(modal)}
                className="bg-zinc-200 rounded-lg self-end"
              >
                <X color="#5DA770" size={32} />
              </button>
              <h1 className="text-2xl">Participantes da reunião</h1>
              <p className="text-sm">
                Selecione as pessoas que irão participar da reunião
              </p>
            </div>

            <ListarUsuarios usersList={users} />

            <div>
              <Button
                onClick={storageUsers}
                className="rounded-3xl bg-[#5DA770]"
              >
                Próximo
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
