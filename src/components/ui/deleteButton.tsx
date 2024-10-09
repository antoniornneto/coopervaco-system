"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";

const DeleteButton = ({ ataId }: { ataId: string }) => {
  const deleteAta = async (id: string) => {
    toast.success("Ata deletada");
    const excluding = await fetch(`/api/ata/${id}`, {
      method: "DELETE",
    });

    setTimeout(() => {
      location.reload();
    }, 700);
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
