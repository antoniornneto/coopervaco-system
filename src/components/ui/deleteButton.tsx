"use client";
import { Trash2 } from "lucide-react";
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
    <button
      onClick={(e) => deleteAta(ataId)}
      className="rounded-md p-1 hover:bg-gray-100 flex items-center"
    >
      <Trash2 color="black" className="mr-3" size={18} />
      <p>Deletar</p>
    </button>
  );
};

export default DeleteButton;
