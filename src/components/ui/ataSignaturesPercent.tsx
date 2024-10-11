import { db } from "@/lib/db";
import { ParticipantProp } from "@/types/types";

const PercentSignatures = async ({ ataId }: { ataId: string }) => {
  const ata = await db.ata.findUnique({
    where: {
      id: ataId,
    },
  });

  const idArrays = ata?.participants;
  const convertString = JSON.stringify(idArrays);
  const participants: ParticipantProp[] = JSON.parse(convertString);

  const signaturesNumbers = participants.filter(
    (participant) => participant.sign === true
  ).length;

  const participantsNumbers: number = participants.length;

  const numberInt = signaturesNumbers / participantsNumbers;
  const percent = numberInt * 100;
  return <div>{<span>{Math.round(percent)}%</span>}</div>;
};

export default PercentSignatures;
