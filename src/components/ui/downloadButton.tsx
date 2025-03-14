"use client";
import { PrinterIcon } from "lucide-react";
import { Button } from "./button";

const DownloadButton = () => {
  const printPage = () => {
    window.print();
  };
  return (
    <Button
      onClick={printPage}
      className="bg-[#D8FFE2] md:hidden rounded-lg p-2 text-[#5DA770] font-bold w-fit flex gap-2 hover:text-[#D8FFE2] hover:bg-[#5DA770]"
    >
      <PrinterIcon size={25} />
      <p className="md:hidden">Imprimir</p>
    </Button>
  );
};

export default DownloadButton;
