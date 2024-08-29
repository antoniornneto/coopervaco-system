"use client";

import { Button } from "@/components/ui/button";
import { dayjs } from "@/lib/utils";
import { Ata } from "@prisma/client";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AtasList() {
  const [atas, setAtas] = React.useState([]);

  React.useEffect(() => {
    fetch("coopervaco-system/api/atas")
      .then((response) => response.json())
      .then((atas) => setAtas(atas));
  }, []);

  return (
    <div className="w-full">
      {atas.map((ata: Ata) => (
        <div
          className="flex gap-10 border-2 hover:bg-[#F0FFF4] px-4 py-6 text-xl"
          key={ata.id}
        >
          <div className="flex-1 flex items-center gap-10">
            <span>{dayjs(ata.createdAt).format("DD/MM/YYYY")}</span>
            <h1>{ata.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/coopervaco-system/${ata.id}`}>
              <Eye />
            </Link>
            <Button className="rounded-3xl bg-[#5DA770]">Assinar Ata</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
