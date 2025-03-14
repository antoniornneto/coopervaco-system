import SquarePen from "./square-pen";
import Link from "next/link";

const EditButtonInPage = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/dashboard/edit-ata/${id}`}
      className="bg-[#D8FFE2] md:hidden rounded-lg p-2 text-[#5DA770] font-bold w-fit items-center flex gap-2 hover:text-[#D8FFE2] hover:bg-[#5DA770]"
    >
      <SquarePen size="30" />
      <p className="md:hidden">Editar</p>
    </Link>
  );
};

export default EditButtonInPage;
