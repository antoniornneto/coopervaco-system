import { db } from "@/lib/db";
import { X } from "lucide-react";
import { dayjs } from "@/lib/utils";
import { ParticipantProp } from "../../create-ata/[ataId]/page";
import Link from "next/link";

const ata = async ({ params }: { params: { id: string } }) => {
  const ata = await db.ata.findUnique({
    where: {
      id: params.id,
    },
  });

  const participantsJSON = ata?.participants;
  const convertJSONToString = JSON.stringify(participantsJSON);
  const participants: ParticipantProp[] = JSON.parse(convertJSONToString);

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
      <div className="flex flex-col items-center my-10 space-y-10">
        <div className="w-[90%] space-y-5">
          <div className="flex flex-col gap-5">
            <span className="text-4xl text-[#606060]">Título da Ata</span>
            <h1 className="bg-[#F4F4F7] rounded-xl p-4 text-xl">
              {ata?.title}
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-4xl text-[#606060]">Pauta</span>
            <h1 className="bg-[#F4F4F7] rounded-xl p-4 text-xl h-96">
              {ata?.topics}
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-4xl text-[#606060]">
              Discussões aprovadas
            </span>
            <h1 className="bg-[#F4F4F7] rounded-xl p-4 text-xl h-96">
              {ata?.approved_topics}
            </h1>
          </div>
        </div>
        {/* Footer */}
        <div className="w-[90%]">
          <h1 className="text-2xl">Participantes da reunião</h1>
          <div>
            {participants.map((participant) => (
              <div key={participant.inscription}>
                <p>{participant.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ata;
