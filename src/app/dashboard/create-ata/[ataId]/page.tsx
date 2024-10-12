import NewAtaForm from "@/components/form/NewAtaForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import dayjs from "dayjs";
import Link from "next/link";
import { X } from "lucide-react";
import { ParticipantProp, UsersDataProps, UserDataProps } from "@/types/types";

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

  const idArrays = ata?.participants;
  const convertString = JSON.stringify(idArrays);
  const participants: ParticipantProp[] = JSON.parse(convertString);

  let newArrayParticipants: UsersDataProps = [];
  for (let i = 0; i < participants.length; i++) {
    const user = (await db.user.findUnique({
      where: {
        id: participants[i].id,
      },
    })) as UserDataProps;
    newArrayParticipants.push(user);
  }

  return (
    <main className="pb-10">
      <div className="text-[#606060]">
        {/* Header */}
        <div className="bg-[#F0F0F0] flex justify-center items-center h-44">
          <div className="w-[90%] flex items-center">
            <div className="flex-1 flex items-end flex-wrap gap-10 md:gap-5 md:justify-center md:items-center">
              <h1 className="text-5xl md:flex-1 md:text-4xl">Ata de Reunião</h1>
              <div className="flex gap-10 md:flex-1 md:justify-between md:gap-0">
                <span>
                  Data:{" "}
                  <strong>{dayjs(ata?.updatedAt).format("DD/MM/YYYY")}</strong>
                </span>
                <span>
                  Horário:{" "}
                  <strong>{dayjs(ata?.updatedAt).format("HH:MM")}</strong>
                </span>
              </div>
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
              {newArrayParticipants.map((user) => (
                <div
                  key={user.id}
                  className="flex border-[1px] w-full p-4 text-xl"
                >
                  <label
                    htmlFor={`${user.name}`}
                    className="flex flex-1 gap-5 items-center"
                  >
                    <p className="w-28">Mat.: {user.inscription}</p>
                    <p className="flex-1">{user.name}</p>
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
