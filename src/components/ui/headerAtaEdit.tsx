"use client";
import { dayjs, FetchAPI } from "@/lib/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { contextType } from "react-signature-canvas";

interface HeaderAtaProps {
  date: {
    createdAt: Date;
    updateAt: Date;
  };
  id: string;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const HeaderEditAta = ({ id, date }: HeaderAtaProps) => {
  const [fullDate, setFullDate] = useState<any>();

  const updateDate = async (id: string, date: string) => {
    const isoDate = new Date(date);
    const callApiFetch = await fetch(`/api/ata/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ createdAt: isoDate.toISOString() }),
    });
  };

  const [formatedDates, setFormatedDates] = useState({
    created: "",
    updated: "",
  });

  useEffect(() => {
    const createdBrazilDate = dayjs(date.createdAt)
      .tz("America/Sao_Paulo")
      .locale("pt-br");
    const updatedBrazilDate = dayjs(date.updateAt)
      .tz("America/Sao_Paulo")
      .locale("pt-br");

    setFormatedDates({
      created: `${createdBrazilDate.format(
        "D [de] MMMM, YYYY"
      )}, ${createdBrazilDate.format("HH:mm")}`,
      updated: `${updatedBrazilDate.format(
        "DD/MM/YYYY"
      )}, ${updatedBrazilDate.format("HH:mm")}`,
    });
  }, [date]);

  return (
    <div className="bg-[#F0F0F0] flex justify-center items-center min-h-52 py-4">
      <div className="w-[90%] flex items-center gap-4">
        <div className="flex-1 flex items-end flex-wrap gap-10 md:gap-5 md:flex-col md:items-start">
          <h1 className="text-5xl md:flex-1 md:text-4xl">Ata de Reunião</h1>
          <div className="flex gap-10 items-center text-lg md:flex-1 md:gap-4 md:flex-col md:items-start">
            <input
              id="ata-date"
              className="bg-transparent"
              type="datetime-local"
              onChange={(e) => setFullDate(e.target.value)}
            />
            <Button type="button" onClick={() => updateDate(id, fullDate)}>
              Salvar Data
            </Button>
            <div className="text-sm font-bold">
              <p>Última atualização: {formatedDates.updated}</p>
            </div>
          </div>
        </div>
        <Link
          href={"/dashboard"}
          className="items-center bg-[#D8FFE2] rounded-lg p-2 text-[#5DA770] font-bold w-fit flex gap-2 hover:text-[#D8FFE2] hover:bg-[#5DA770]"
        >
          <ArrowLeft size={25} />
          <p className="md:hidden">Voltar</p>
        </Link>
      </div>
    </div>
  );
};

export default HeaderEditAta;
