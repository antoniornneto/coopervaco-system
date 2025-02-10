import { db } from "@/lib/db";
import { CircleOff } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Signature from "@/components/ui/signature";
import { ParticipantProp, UserDataProps } from "@/types/types";
import HeaderAta from "@/components/ui/headerAta";
import DownloadButton from "@/components/ui/downloadButton";

const ata = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: {
      id: session?.user.userId,
    },
  });

  const ata = await db.ata.findUnique({
    where: {
      id: params.id,
    },
  });

  const date = ata?.createdAt as Date;

  const idArrays = ata?.participants;
  const convertString = JSON.stringify(idArrays);
  const participants: ParticipantProp[] = JSON.parse(convertString);
  let newArrayParticipants = [];
  for (let i = 0; i < participants.length; i++) {
    const user = (await db.user.findUnique({
      where: {
        id: participants[i].id,
      },
    })) as UserDataProps;
    newArrayParticipants.push(user);
  }

  return (
    <main>
      {/* Header */}
      <HeaderAta date={date}>
        <DownloadButton />
      </HeaderAta>
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
        <div className="flex flex-col w-[90%] space-y-5">
          <h2 className="text-2xl font-semibold ">
            Assinatura dos Participantes
          </h2>
          <div className="flex flex-wrap gap-10 md:justify-center">
            {participants.map((participant, index) =>
              participant.sign === false ? (
                <div
                  key={index}
                  className="flex flex-col items-center w-72 h-40"
                >
                  <div className="flex-1 text-[#989898] flex flex-col justify-center items-center gap-1">
                    <CircleOff />
                    <span>Assinatura Pendente</span>
                  </div>
                  <span className="font-semibold">{participant.name}</span>
                  <span className="text-sm text-[#989898]">
                    Mat.: {participant.inscription}
                  </span>
                </div>
              ) : (
                <Signature key={index} id={`${participant.id}`} />
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ata;
