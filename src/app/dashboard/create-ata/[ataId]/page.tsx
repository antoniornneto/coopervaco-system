import NewAtaForm from "@/components/form/NewAtaForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ParticipantProp, UsersDataProps, UserDataProps } from "@/types/types";
import HeaderAta from "@/components/ui/headerAta";

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

  const date = {
    createdAt: ata?.createdAt as Date,
    updateAt: ata?.updatedAt as Date
  };

  const idArrays = ata?.participants;
  const convertString = JSON.stringify(idArrays);
  const participants: ParticipantProp[] = JSON.parse(convertString);

  let newArrayParticipants: UsersDataProps[] = [];
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
        <HeaderAta date={date} />
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
