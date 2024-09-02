import { User } from "@prisma/client";

interface UserlistProps {
  usersList: never[];
}

export default function ListarUsuarios({ usersList }: UserlistProps) {
  return (
    <ul className="overflow-y-auto border-[1px] border-zinc-300">
      {usersList.map((user: User, index) => (
        <li
          className="border-y-[1px] border-zinc-300 p-3 flex items-center gap-10"
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
