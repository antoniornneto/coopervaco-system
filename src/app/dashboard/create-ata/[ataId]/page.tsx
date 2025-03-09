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
        </div>
      </div>
    </main>
  );
}
