"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";

const DeleteButton = ({ ataId }: { ataId: string }) => {
  const deleteAta = async (id: string) => {
    setTimeout(() => {
      const reqDelete = fetch(`/api/ata/${id}`, {
        method: "DELETE",
      });

      toast.promise(reqDelete, {
        loading: "Só um momento...",
        success: (data) => {
          location.reload();
          return "Ata deletada";
        },
        error: "Desculpe, algo deu errado.",
      });
    }, 2000);
  };
  return (
    <Button
      className="bg-transparent w-fit hover:bg-transparent p-2"
      onClick={(e) => deleteAta(ataId)}
    >
      <Trash2 color="black" size={20} />
    </Button>
  );
};

export default DeleteButton;
