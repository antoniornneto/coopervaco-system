import NewAtaForm from "@/components/form/NewAtaForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import dayjs from "dayjs";
import Link from "next/link";
import { X } from "lucide-react";
import { ParticipantProp } from "@/types/types";

export default async function CriarAta({
  params,
}: {
  params: { ataId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const ata = await db.ata.findUnique({
    where: {
      id: params.ataId,
    },
  });

  const participantsJSON = ata?.participants;
  const convertString = JSON.stringify(participantsJSON);
  const participants: ParticipantProp[] = JSON.parse(convertString);

  return (
    <main className="pb-10">
      <div className="text-[#606060]">
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
                Horário:{" "}
                <strong>{dayjs(ata?.updatedAt).format("HH:MM")}</strong>
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
        <div className="flex flex-col items-center">
          {/* Mid content */}
          <NewAtaForm />
          {/* Footer */}
          <div className="w-[90%] space-y-4">
            <h2 className="text-2xl">Participantes da reunião</h2>
            <div className="text-black">
              {participants.map((user) => (
                <div
                  key={user.inscription}
                  className="flex border-[1px] w-full p-4 text-xl"
                >
                  <label
                    htmlFor={`${user.name}`}
                    className="flex flex-1 gap-10"
                  >
                    <p>Mat.: {user.inscription}</p>
                    <p>{user.name}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
