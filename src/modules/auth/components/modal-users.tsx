"use client";
import ListarUsuarios from "@/modules/gets/components/listar-usuarios";
import { X } from "lucide-react";
import React from "react";

const ModalUsers = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("coopervaco-system/api/users")
      .then((response) => response.json())
      .then((users) => setUsers(users.users));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white w-[712px] h-[540px] rounded-lg flex flex-col p-4 gap-2">
        <div className="flex flex-col justify-center">
          <button className="bg-zinc-200 rounded-lg self-end">
            <X color="#5DA770" size={32} />
          </button>
          <h1 className="text-2xl">Participantes da reunião</h1>
          <p className="text-sm">
            Selecione as pessoas que irão participar da reunião
          </p>
        </div>

        <ListarUsuarios usersList={users} />
      </div>
    </div>
  );
};

export default modalUsers;
