"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { User } from "@prisma/client";

interface UserProp {
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
    let inscription = arrayEmployee[0];
    let name = `${arrayEmployee[1]}  ${arrayEmployee[2]}`;
    let user = {
      inscription: inscription,
      name: name,
    };
    const index = participants.indexOf(user);

    if (elementChecked) {
      participants.push(user);
    } else {
      if (index > -1) {
        participants.splice(index, 1);
      }
    }
    setParticipants(participants);
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
    <main>
      <div>
        <h1>Participantes da reunião</h1>
        <p>Selecione as pessoas que irão participar da reunião</p>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.id} className="flex border-[1px] w-[500px] px-5">
            <label htmlFor={`${user.name}`} className="flex flex-1 gap-10">
              <p>Mat.: {user.inscription}</p>
              <p>{user.name}</p>
            </label>
            <input
              type="checkbox"
              onChange={(e) => createArrayParticipants(e.target)}
              name=""
              id={`${user.name}`}
              value={`${user.inscription} ${user.name}`}
            />
          </div>
        ))}
      </div>
      <Button onClick={(e) => createAta(participants)}>Próximo</Button>
    </main>
  );
};

export default UsersList;
