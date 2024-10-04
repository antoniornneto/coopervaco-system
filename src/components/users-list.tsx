"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { Toaster, toast } from "sonner";
import LoadingButton from "./ui/loadingButton";

export interface UserProp {
  inscription: string;
  name: string;
}

const UsersList = () => {
  const [action, setAction] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);
  const [participants, setParticipants] = useState<Array<UserProp>>([]);

  async function getAllUsers() {
    const res = await fetch("/api/get-all-users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  function createArrayParticipants(element: HTMLInputElement) {
    const elementChecked = element.checked;
    let arrayEmployee = element.value.split(" ");
    let inscription = arrayEmployee.shift() as string;
    let name: string = "";
    for (let i = 0; i < arrayEmployee.length; i++) {
      if (name === "") {
        name = arrayEmployee[i];
      } else {
        name += ` ${arrayEmployee[i]}`;
      }
    }

    let user = {
      inscription: inscription,
      name: name,
    };

    if (elementChecked) {
      participants.push(user);
    }

    if (!elementChecked) {
      const index = participants
        .map((participant) => participant.name)
        .indexOf(user.name);
      participants.splice(index, 1);
    }

    setParticipants(participants);
  }

  function clearArray() {
    setParticipants([]);

    router.push("/dashboard");
  }

  const router = useRouter();
  async function createAta(participants: Array<UserProp>) {
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
    <div className="h-[400px] space-y-5">
      <Toaster position="top-left" richColors />
      <div className="overflow-y-auto h-[400px]">
        {users.map((user) => (
          <div key={user.id} className="flex border-[1px] p-4 text-xl ">
            <label
              htmlFor={`${user.name}`}
              className="flex flex-1 gap-10 cursor-pointer"
            >
              <p>Mat.: {user.inscription}</p>
              <p>{user.name}</p>
            </label>
            <input
              type="checkbox"
              className="w-4 cursor-pointer"
              onChange={(e) => createArrayParticipants(e.target)}
              name={`${user.name}`}
              id={`${user.name}`}
              value={`${user.inscription} ${user.name}`}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 w-96">
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
