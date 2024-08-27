"use client";

import { dayjs } from "@/lib/utils";
import { Ata } from "@prisma/client";
import React from "react";

export default function AtasList() {
  const [atas, setAtas] = React.useState([]);

  React.useEffect(() => {
    fetch("api/atas")
      .then((response) => response.json())
      .then((data) => setAtas(data.atas));
  }, []);

  return (
    <div className="w-full">
      {atas.map((ata: Ata) => (
        <div
          className="flex gap-10 border-2 hover:bg-[#F0FFF4] px-4 py-6 text-xl"
          key={ata.id}
        >
          <span>{dayjs(ata.createdAt).format("DD/MM/YYYY")}</span>
          <h1>{ata.title}</h1>
        </div>
      ))}
    </div>
  );
}
