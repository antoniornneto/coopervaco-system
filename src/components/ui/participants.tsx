"use client";
import { ParticipantProp } from "@/types/types";

const Participants = ({
  participantList,
}: {
  participantList: ParticipantProp;
}) => {
  const idArrays = participantList;
  const convertString = JSON.stringify(idArrays);
  const participants: ParticipantProp[] = JSON.parse(convertString);
  return (
    <div className=" space-y-5">
      <h1 className="text-2xl">Participantes da reunião</h1>
      <div>
        {participants.map((participant) => (
          <div
            key={participant.inscription}
            className="flex border-[1px] w-full p-4 text-xl"
          >
            <label
              htmlFor={`${participant.name}`}
              className="flex flex-1 gap-5 items-center"
            >
              <p className="w-28">Mat.: {participant.inscription}</p>
              <p className="flex-1">{participant.name}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
