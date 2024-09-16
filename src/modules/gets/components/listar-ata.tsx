import React from "react";
import { dayjs } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/prisma";

const prisma = db;

export default async function ListarAta({ id }: { id: string }) {
  const ata = await prisma.ata.findUnique({
    where: {
      id,
    },
  });

  return (
    <div className="pb-10">
      <div className="bg-[#FCFCFC] flex justify-center">
        {/* ATA's HEADER */}
        <div className="w-[90%] py-5">
          <div className="flex flex-col">
            <div className="flex">
              <div className="flex-1"></div>
              <Link
                className="bg-[#D8FFE2] rounded-md"
                href={"/coopervaco-system"}
              >
                <X color="#5DA770" size={35} />
              </Link>
            </div>
            <div className="flex items-end gap-10 py-5">
              <h1 className="text-4xl">Ata de Reunião</h1>
              <span>
                Data:{" "}
                <strong>{dayjs(ata?.createdAt).format("DD/MM/YYYY")}</strong>
              </span>
              <span>
                Hora: <strong>{dayjs(ata?.createdAt).format("hh:mm")}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ATA's BODY */}
      <div className="flex justify-center">
        <div className="w-[90%] space-y-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl">Título da ata</h1>
            <span className="flex-1">{ata?.title}</span>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl">Pauta do dia</h1>
            {ata?.topics}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl">Discussões aprovadas</h1>
            {ata?.approved_topics}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold">Participantes</h1>
            {ata?.participants.map((participant, index) => (
              <div key={index} className="flex flex-col">
                {participant}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold">Assinaturas de participantes</h1>
            {ata?.signatures}
            *Assinaturas pendentes
          </div>
        </div>
      </div>
    </div>
  );
}
