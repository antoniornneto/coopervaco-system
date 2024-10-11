import { db } from "@/lib/db";
import { Button } from "./button";
import DisableButtonAta from "./disableButtonAta";
import { ParticipantProp } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignInButton from "./signInButton";

const SignAta = async ({ ataId, atas }: { ataId: string; atas: string[] }) => {
  const session = await getServerSession(authOptions);
  const ata = await db.ata.findUnique({
    where: {
      id: ataId,
    },
  });

  const idArrays = ata?.participants;
  const convertString = JSON.stringify(idArrays);
  const participants: ParticipantProp[] = JSON.parse(convertString);

  const isSigned = participants.some(
    (participant) =>
      participant.sign === true && participant.name === session?.user.name
  );

  return (
    <div>
      {atas.includes(ataId) ? (
        isSigned ? (
          <DisableButtonAta text="Assinado" />
        ) : (
          <SignInButton
            ataId={ataId}
            sessionUserName={`${session?.user.name}`}
          />
        )
      ) : (
        <DisableButtonAta text="Assinar ata" />
      )}
    </div>
  );
};

export default SignAta;
