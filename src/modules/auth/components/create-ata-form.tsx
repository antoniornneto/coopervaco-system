"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function CriarAtaForm({ id }: { id: string }) {
  const [participants, setParticipants] = React.useState<any>([]);
  const [title, setTitle] = React.useState<string>("");
  const [topics, setTopics] = React.useState<string>("");
  const [approvedTopics, setApprovedTopics] = React.useState<string>("");

  const router = useRouter();

  async function updateAta(
    title: string,
    topics: string,
    approved_topics: string,
    id: string
  ) {
    const req = await fetch(`/coopervaco-system/api/atas/update-ata/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, topics, approved_topics }),
    });

    const res = req.json();

    router.push(`/coopervaco-system`);
  }

  React.useEffect(() => {
    fetch(`/coopervaco-system/api/atas/${id}`)
      .then((req) => req.json())
      .then((res) => setParticipants(res.participants));
  }, []);

  return (
    <form>
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
                type="button"
                onClick={(e) => updateAta(title, topics, approvedTopics, id)}
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
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setTopics(e.target.value)}
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
                onChange={(e) => setApprovedTopics(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold">Participantes da reunião</h1>
              {participants.map((participant: string, index: number) => (
                <div key={index}>{participant}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
