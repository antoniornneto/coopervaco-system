import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { dayjs } from "@/lib/utils";
import SystemActions from "@/modules/actions/actions";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const prisma = db;

export default async function CriarAtaForm({ id }: { id: string }) {
  const ata = await prisma.ata.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <form action={SystemActions.updateAta}>
      <div className="bg-[#FCFCFC] flex flex-col items-center">
        {/* CABEÇALHO DA ATA */}
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
            <div className="flex items-end gap-20 py-5">
              <h1 className="text-4xl">Ata de Reunião</h1>
              <span>
                Data:{" "}
                <strong>{dayjs(ata?.createdAt).format("DD/MM/YYYY")}</strong>
              </span>
              <span>
                Hora: <strong>{dayjs(ata?.createdAt).format("HH:MM")}</strong>
              </span>
            </div>
            <div className="self-end">
              <Button
                className="bg-[#5DA770] rounded-3xl text-xl"
                type="submit"
              >
                Criar Ata
              </Button>
            </div>
          </div>
        </div>

        {/* CORPO DA ATA */}
        <div className="w-[90%]">
          <div className="w-[90%] space-y-10">
            <div className="hidden">
              <label htmlFor="id"></label>
              <input id="id" name="id" defaultValue={ata?.id} />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-2xl" htmlFor="title">
                Título da ata
              </label>
              <input
                className="bg-zinc-300 rounded-lg p-4"
                type="text"
                id="title"
                name="title"
                placeholder="Insira o título da ata"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-2xl" htmlFor="topics">
                Pauta do dia
              </label>
              <textarea
                className="bg-zinc-300 rounded-lg p-4"
                id="topics"
                name="topics"
                rows={10}
                placeholder="Insira a(s) pauta(a) do dia"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-2xl" htmlFor="approved_topics">
                Discussões aprovadas
              </label>
              <textarea
                className="bg-zinc-300 rounded-lg p-4"
                id="approved_topics"
                name="approved_topics"
                rows={10}
                placeholder="Acrescente as discussões que foram realizadas e aprovadas "
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Participantes da reunião</h1>
              <ul>
                {ata?.participants.map((participant: string, index: number) => (
                  <li
                    className="border-[1px] border-zinc-300 p-3 flex items-center gap-10"
                    key={index}
                  >
                    {participant}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
