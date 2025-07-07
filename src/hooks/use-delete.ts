"use cliente";
import { useState } from "react";
import { toast } from "sonner";

const useDelete = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = (modalState: boolean) => {
    setModalOpen(!modalState);
  };

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

  return { modalOpen, setModalOpen, handleModal, deleteAta };
};

export default useDelete;
