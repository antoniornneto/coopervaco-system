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
  const percent = Math.round(numberInt * 100);

  return (
    <div>
      <p className={`${percent === 100 ? "bg-[#8CFF8A] rounded-lg p-1" : ""}`}>
        {percent}%
      </p>
    </div>
  );
};

export default PercentSignatures;
