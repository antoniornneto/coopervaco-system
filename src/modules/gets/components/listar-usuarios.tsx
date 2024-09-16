"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface UsersProps {
  usersList: {
    id: string;
    registration: string;
    cpf: string;
    name: string;
    email: string;
    password: string;
    admin: boolean;
    createdAt: Date;
    updateAt: Date;
  }[];
}

export default function ListarUsuarios(listUsers: UsersProps) {
  const usersList = listUsers.usersList;

  const [participants, setParticipants] = React.useState<any>([]);
  function createArrayParticipants(element: any) {
    const elementChecked: HTMLInputElement = element.target.checked;
    let participant: HTMLInputElement = element.target.value;
    const index = participants.indexOf(participant);

    if (elementChecked) {
      participants.push(participant);
    } else {
      if (index > -1) {
        participants.splice(index, 1);
      }
    }
    setParticipants(participants);
  }

  const router = useRouter();
  async function createAta(participants: string[]) {
    const req = await fetch("/coopervaco-system/api/atas/new-ata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participants }),
    });

    const res = await req.json();
    router.push(`/coopervaco-system/criar-ata/${res}`);
  }

  return (
    <div className="space-y-4">
      <ul className="overflow-y-auto h-[350px] border-[1px] border-zinc-300">
        {usersList.map((user: User) => (
          <li
            className="border-y-[1px] border-zinc-300 p-3 flex items-center gap-10"
            key={user.id}
          >
            <p>Mat.: {user.registration}</p>
            <label className="flex-1 uppercase" htmlFor={user.id}>
              {user.name}
            </label>
            <input
              type="checkbox"
              name="name"
              id={user.id}
              value={user.name}
              onChange={(e) => createArrayParticipants(e)}
            />
          </li>
        ))}
      </ul>

      <Button
        className="rounded-xl bg-[#5DA770] px-8 text-white py-2"
        onClick={(e) => createAta(participants)}
      >
        Próximo
      </Button>
    </div>
  );
}
