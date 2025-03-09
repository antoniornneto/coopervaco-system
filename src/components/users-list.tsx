"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import LoadingButton from "./ui/loadingButton";
import { UserProp, UsersDataProps } from "@/types/types";

const UsersList = ({ users }: { users: UsersDataProps[] }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState<UserProp>([]);

  const sortedUsers = [...users].sort((a, b) =>
    (a.name || "").localeCompare(b.name || "")
  );

  const handleParticipantToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const [id, inscription, name] = value.split("/");

    setParticipants((prev) => {
      // Create a copy to avoid mutating state directly
      const updatedParticipants = [...prev];

      if (checked) {
        // Add user to participants
        updatedParticipants.push({
          id,
          name,
          inscription,
          sign: false,
          email: users.find((user) => user.id === id)?.email || "",
        });
      } else {
        // Remove user from participants
        const index = updatedParticipants.findIndex(
          (participant) => participant.id === id
        );
        if (index !== -1) {
          updatedParticipants.splice(index, 1);
        }
      }

      return updatedParticipants;
    });
  };

  const handleCancel = () => {
    setParticipants([]);
    router.push("/dashboard");
  };

  const handleCreateAta = async () => {
    if (participants.length === 0) {
      toast.error("Selecione pelo menos um usuário.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/ata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(participants),
      });

      if (!response.ok) {
        toast.error(
          "Desculpe, parece que tivemos um problema no servidor. Consulte o administrador."
        );
        router.replace("/dashboard");
        throw new Error("Falha ao criar ata");
      }

      const result = await response.json();
      router.push(`/dashboard/create-ata/${result}`);
    } catch (error) {
      console.error("Error creating ata:", error);
      toast.error("Erro ao criar ata. Tente novamente.");
    }
  };

  return (
    <div className="h-[400px] space-y-5 w-full">
      <div className="overflow-y-auto h-[400px]">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            className="flex border-[1px] p-4 text-xl md:text-base"
          >
            <label
              htmlFor={`user-${user.id}`}
              className="flex flex-1 gap-5 items-center cursor-pointer"
            >
              <p className="w-28 md:w-20">Mat.: {user.inscription}</p>
              <p className="flex-1">{user.name}</p>
            </label>
            <input
              type="checkbox"
              className="w-4 cursor-pointer"
              onChange={handleParticipantToggle}
              name={`user-${user.id}`}
              id={`user-${user.id}`}
              value={`${user.id}/${user.inscription}/${user.name}/${user.email}`}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4 md:flex-col">
        <Button
          onClick={handleCancel}
          className="flex-1 text-lg bg-[#E6EEE8] border-[1px] border-[#5DA770] text-[#5DA770] rounded-full hover:bg-[#E6EEE8]/60"
        >
          Cancelar
        </Button>
        {isLoading ? (
          <LoadingButton rounded="rounded-full flex-1" />
        ) : (
          <Button
            className="flex-1 text-lg bg-[#5DA770] rounded-full hover:bg-[#5DA770]/80"
            onClick={handleCreateAta}
          >
            Próximo
          </Button>
        )}
      </div>
    </div>
  );
};

export default UsersList;
