"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import Link from "next/link";

export interface UserProp {
  inscription: string;
  name: string;
}

const UsersList = () => {
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
      const index = participants
        .map((participant) => participant.name)
        .indexOf(user.name);
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
    const req = await fetch("/api/ata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(participants),
    });

    const res = await req.json();
    router.push(`/dashboard/create-ata/${res}`);
  }

  return (
    <div>
      <div className="overflow-y-auto h-[400px]">
        {users.map((user) => (
          <div key={user.id} className="flex border-[1px] p-4 text-xl">
            <label htmlFor={`${user.name}`} className="flex flex-1 gap-10">
              <p>Mat.: {user.inscription}</p>
              <p>{user.name}</p>
            </label>
            <input
              type="checkbox"
              className="w-4"
              onChange={(e) => createArrayParticipants(e.target)}
              name={`${user.name}`}
              id={`${user.name}`}
              value={`${user.inscription} ${user.name}`}
            />
          </div>
        ))}
      </div>
      <div className="space-x-5">
        <Button
          className="flex-1 text-lg mt-6 bg-[#5DA770] rounded-full hover:bg-[#5DA770]/80"
          onClick={() => createAta(participants)}
        >
          Próximo
        </Button>
        <Button
          onClick={clearArray}
          className="flex-1 text-lg mt-6 bg-[#E6EEE8] border-[1px] border-[#5DA770] text-[#5DA770] rounded-full hover:bg-[#E6EEE8]/60"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default UsersList;
