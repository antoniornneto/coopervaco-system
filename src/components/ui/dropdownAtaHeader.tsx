"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditButtonInPage from "./editButtonInPage";
import DownloadButton from "./downloadButton";
import { Pen, Pencil, PrinterIcon, Settings2 } from "lucide-react";
import Link from "next/link";
import SquarePen from "./square-pen";

type DropdownProps = {
  id: string;
};

const DropdownAtaHeader = ({ id }: DropdownProps) => {
  const printPage = () => {
    window.print();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="bg-[#D8FFE2] text-[#5DA770] w-fit p-2 hidden md:flex hover:text-[#D8FFE2] hover:bg-[#5DA770]"
        asChild
      >
        <Button variant={"outline"}>
          <Settings2 size={25} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:flex">
        <DropdownMenuGroup className="flex flex-col">
          <Button variant={"ghost"} className="flex justify-start">
            <Link href={`/dashboard/edit-ata/${id}`}>
              <DropdownMenuItem className="flex gap-2">
                <Pencil />
                Editar
              </DropdownMenuItem>
            </Link>
          </Button>
          <Button
            className="flex justify-start"
            variant={"ghost"}
            onClick={printPage}
          >
            <DropdownMenuItem>
              <PrinterIcon />
              Download
            </DropdownMenuItem>
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAtaHeader;
