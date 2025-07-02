"use client";

import useDelete from "@/hooks/use-delete";

type DeleteModalProps = {
  id: string;
};

export const DeleteModal = ({ id }: DeleteModalProps) => {
  const { modalOpen, setModalOpen, handleModal, deleteAta } = useDelete();
  return (
    <div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"></div>
      )}
    </div>
  );
};
