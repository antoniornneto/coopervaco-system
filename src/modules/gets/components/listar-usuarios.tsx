"use client";

import { User } from "@prisma/client";
import React from "react";

export default function ListarUsuarios() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("coopervaco-system/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
  }, []);

  return (
    <ul>
      {users.map((user: User, index) => (
        <li
          className="border-[1px] border-zinc-300 p-3 flex items-center gap-10"
          key={index}
        >
          <p>Mat.: {user.registration}</p>
          <label className="flex-1 uppercase" htmlFor={user.id}>
            {user.name}
          </label>
          <input type="checkbox" name={user.id} id={user.id} />
        </li>
      ))}
    </ul>
  );
}
