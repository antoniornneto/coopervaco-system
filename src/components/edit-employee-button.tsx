import { Pen } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { EditEmployeeModal } from "./pages/EditEployeeModal";
import { UsersDataProps } from "@/types/types";

type Props = {
  id: string;
  isLoading: boolean;
};
export const EditEmployeeButton = ({ id, isLoading }: Props) => {
  const [employee, setEmployee] = useState<UsersDataProps>();
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Button
        onClick={handleModal}
        type="button"
        variant={"outline"}
        disabled={isLoading}
        title="Editar Cooperado"
      >
        <Pen size={15} />
      </Button>
      {modal && <EditEmployeeModal id={id} closeModal={handleModal} />}
    </>
  );
};
