import { db } from "@/lib/db";
import DisableButtonAta from "./disableButtonAta";
import { ParticipantProp } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignInButton from "./signInButton";

interface SessionProps {
  user: {
    name: string;
    email: string;
    image: string;
    userId: string;
    employeeId: string;
    role: string;
  };
}

const SignAta = async ({ ataId, atas }: { ataId: string; atas: string[] }) => {
  const session = (await getServerSession(authOptions)) as SessionProps;
  const ata = await db.ata.findUnique({
    where: {
      id: ataId,
    },
  });

  const user = await db.user.findUnique({
    where: {
      id: session.user.userId,
    },
  });

  const idArrays = ata?.participants;
  const convertString = JSON.stringify(idArrays);
  const participants: ParticipantProp[] = JSON.parse(convertString);

  const isSigned = participants.some(
    (participant) =>
      participant.sign === true && participant.id === session?.user.userId
  );

  if (user?.signature === null) {
    return (
      <DisableButtonAta
        tooltip="Você não possui uma assinatura"
        text="Indisponível"
      />
    );
  }

  return (
    <div>
      {atas.includes(ataId) ? (
        isSigned ? (
          <DisableButtonAta
            tooltip="Você já assinou esta ATA"
            text="Assinado"
          />
        ) : (
          <SignInButton
            ataId={ataId}
            sessionUserName={`${session?.user.name}`}
          />
        )
      ) : (
        <DisableButtonAta
          tooltip="Você não pode assinar essa ATA"
          text="Indisponível"
        />
      )}
    </div>
  );
};

export default SignAta;
