"use client";
import { PrinterIcon } from "lucide-react";
import { Button } from "./button";
import SquarePen from "./square-pen";
import Link from "next/link";

const EditButtonInPage = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/dashboard/edit-ata/${id}`}
      className="bg-[#D8FFE2] rounded-lg p-2 text-[#5DA770] font-bold w-fit flex gap-2 hover:text-[#D8FFE2] hover:bg-[#5DA770]"
    >
      <SquarePen />
      Editar
    </Link>
  );
};

export default EditButtonInPage;
