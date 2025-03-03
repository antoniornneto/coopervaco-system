"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

import { toast } from "sonner";
import LoadingButton from "./ui/loadingButton";
import { UsersDataProps, UserProp } from "@/types/types";

const UsersList = ({ users }: { users: UsersDataProps }) => {
  const [action, setAction] = useState(false);
  const [participants, setParticipants] = useState<UserProp>([]);

  function createArrayParticipants(element: HTMLInputElement) {
    const elementChecked = element.checked;
    let arrayEmployee = element.value.split("/");
    let id = arrayEmployee[0] as string;
    let inscription = arrayEmployee[1] as string;
    let name = arrayEmployee[2] as string;

    let user = {
      id: id,
      name: name,
      inscription: inscription,
      sign: false,
      email: users.find(user => user.id === id)?.email || ''
    };

    if (elementChecked) {
      participants.push(user);
    }

    if (!elementChecked) {
      const index = participants
        .map((participant) => participant.id)
        .indexOf(user.id);
      participants.splice(index, 1);
    }
    setParticipants(participants);
  }

  function clearArray() {
    setParticipants([]);

    router.push("/dashboard");
  }

  const router = useRouter();
  async function createAta(participants: UserProp) {
    setAction(true);
    if (participants.length > 0) {
      const req = await fetch("/api/ata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(participants),
      });
      const res = await req.json();
      setTimeout(() => {
        router.push(`/dashboard/create-ata/${res}`);
      }, 700);
    } else {
      setAction(false);
      toast.error("Selecione pelo menos um usuário");
    }
  }

  return (
    <div className="h-[400px] space-y-5 w-full">
      <div className="overflow-y-auto h-[400px]">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex border-[1px] p-4 text-xl md:text-base"
          >
            <label
              htmlFor={`${user.name}`}
              className="flex flex-1 gap-5 items-center cursor-pointer"
            >
              <p className="w-28 md:w-20">Mat.: {user.inscription}</p>
              <p className="flex-1">{user.name}</p>
            </label>
            <input
              type="checkbox"
              className="w-4 cursor-pointer"
              onChange={(e) => createArrayParticipants(e.target)}
              name={`${user.name}`}
              id={`${user.name}`}
              value={`${user.id}/${user.inscription}/${user.name}`}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 md:flex-col">
        {action ? (
          <LoadingButton rounded="rounded-full" />
        ) : (
          <Button
            className="flex-1 text-lg bg-[#5DA770] rounded-full hover:bg-[#5DA770]/80"
            onClick={() => createAta(participants)}
          >
            Próximo
          </Button>
        )}
        <Button
          onClick={clearArray}
          className="flex-1 text-lg bg-[#E6EEE8] border-[1px] border-[#5DA770] text-[#5DA770] rounded-full hover:bg-[#E6EEE8]/60"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default UsersList;
