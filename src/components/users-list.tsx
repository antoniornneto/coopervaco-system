"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

interface UsersProps {
  id: string;
  cpf: string;
  name: string;
  inscription: string;
  birthday: Date;
  function: string;
  createdAt: Date;
  updatedAt: Date;
}

const UsersList = ({ users }: { users: Array<UsersProps> }) => {
  const [participants, setParticipants] = useState<any>([]);

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
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.inscription}</span>
          <label htmlFor={user.name}>{user.name}</label>
          <input
            onChange={createArrayParticipants}
            type="checkbox"
            name="Employee"
            id={user.name}
            value={user.name}
          />
        </div>
      ))}
      <Button onClick={(e) => createAta(participants)}>Próximo</Button>
    </div>
  );
};

export default UsersList;
