import { db } from "@/lib/db";
import { X } from "lucide-react";
import { dayjs } from "@/lib/utils";
import Link from "next/link";
import EditAtaForm from "@/components/form/EditAtaForm";

const editAta = async ({ params }: { params: { id: string } }) => {
  const ata = await db.ata.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <main>
      {/* Header */}
      <div className="bg-[#F0F0F0] flex justify-center items-center h-44">
        <div className="w-[90%] flex items-center">
          <div className="flex-1 flex items-end gap-20">
            <h1 className="text-5xl">Ata de Reunião</h1>
            <p>
              Data:{" "}
              <strong>{dayjs(ata?.updatedAt).format("DD/MM/YYYY")}</strong>
            </p>
            <p>
              Horário: <strong>{dayjs(ata?.updatedAt).format("HH:MM")}</strong>
            </p>
          </div>
          <Link href={"/dashboard"}>
            <X
              className="bg-[#D8FFE2] rounded-lg m-10"
              size={50}
              color="#5DA770"
            />
          </Link>
        </div>
      </div>
      {/* Body */}
      <div className="flex justify-center">
        <EditAtaForm ata={ata} />
      </div>
    </main>
  );
};

export default editAta;
