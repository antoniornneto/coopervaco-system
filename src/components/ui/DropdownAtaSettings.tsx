"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import Ellipsis from "./ellipsis";
import DeleteButton from "./deleteButton";

type DropdownProps = {
  id: string;
};

const DropdownAtaSettings = ({ id }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-fit p-2" asChild>
        <Button variant={"outline"}>
          <Ellipsis size={"20"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40 md:flex">
        <DropdownMenuGroup className="flex flex-col gap-1 text-sm md:gap-3 md:text-base">
          {/* <EditButton ataId={ata.id} />
          <DeleteButton ataId={ata.id} /> */}
          <button className="rounded-md p-1 hover:bg-gray-100">
            <Link
              className="flex justify-start items-center"
              href={`/dashboard/edit-ata/${id}`}
            >
              <Pencil className="mr-3" size={18} />
              <p>Editar</p>
            </Link>
          </button>
          <DeleteButton ataId={id} />
          <button className="rounded-md p-1 hover:bg-gray-100">
            <Link
              className="flex justify-start items-center"
              href={`/dashboard/view-ata/${id}`}
            >
              <Eye color="black" className="mr-3" size={18} />
              <p>Visualizar</p>
            </Link>
          </button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAtaSettings;
