"use client";
import { dayjs } from "@/lib/utils";
import { Download, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Ata } from "@prisma/client";
import { useRouter } from "next/navigation";

const AtasList = () => {
  const router = useRouter();
  const [atas, setAtas] = useState<Ata[]>([]);

  useEffect(() => {
    const getAtas = fetch("/api/ata")
      .then((res) => res.json())
      .then((data) => setAtas(data.atas));
  }, []);

  const deleteAta = async (id: string) => {
    const excluding = await fetch(`/api/ata/${id}`, {
      method: "DELETE",
    });

    setTimeout(() => {
      location.reload();
    }, 700);
  };

  return (
    <div className="py-10">
      <div className="border-x-2">
        {atas.map((ata) => (
          <div
            key={ata.id}
            className="flex border-y-[1px] items-center px-4 py-2 hover:bg-[#F0FFF4]"
          >
            <div className="flex flex-1 gap-10">
              <p className="text-lg">
                {dayjs(ata.createdAt).format("DD/MM/YYYY")}
              </p>
              <h3 className="text-lg">{ata.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span>80%</span>
              <Button className="bg-transparent w-fit hover:bg-transparent p-2">
                <Link href={`/dashboard/edit-ata/${ata.id}`}>
                  <Pencil color="black" size={20} />
                </Link>
              </Button>
              <Button
                className="bg-transparent w-fit hover:bg-transparent p-2"
                onClick={(e) => deleteAta(ata.id)}
              >
                <Trash2 color="black" size={20} />
              </Button>
              <Button className="bg-transparent w-fit hover:bg-transparent p-2">
                <Download color="black" size={20} />
              </Button>
              <Button className="bg-transparent w-fit hover:bg-transparent p-2">
                <Link href={`/dashboard/view-ata/${ata.id}`}>
                  <Eye color="black" size={20} />
                </Link>
              </Button>
              <Button className="w-28 rounded-full px-8 bg-[#5DA770] hover:bg-[#5DA770]/80">
                Assinar ata
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtasList;
