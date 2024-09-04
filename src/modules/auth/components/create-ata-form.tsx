import { Button } from "@/components/ui/button";
import SystemActions from "@/modules/actions/actions";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();
const year = date.getFullYear();
const timeHour = date.getHours();
const timeMinutes = date.getMinutes();
const today = `${day < 10 ? `0${day}` : day}/${
  month < 10 ? `0${month}` : month
}/${year}`;
const hour = `${timeHour}:${timeMinutes}`;

export default function CriarAtaForm() {
  return (
    <form action={SystemActions.createAta}>
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
                Data: <strong>{today}</strong>
              </span>
              <span>
                Hora: <strong>{hour}</strong>
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
            <div className="flex flex-col gap-4">
              <label className="text-2xl" htmlFor="title">
                Título da ata
              </label>
              <input
                className="bg-zinc-300 rounded-lg p-4"
                type="text"
                id="title"
                name="title"
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
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold">Participantes da reunião</h1>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
