"use client";
import { UserProp } from "@/types/types";

const Participants = ({ participants }: { participants: UserProp }) => {
  return (
    <div className="w-[90%] space-y-5">
      <h1 className="text-2xl">Participantes da reunião</h1>
      <div>
        {participants.map((participant) => (
          <div
            key={participant.inscription}
            className="flex border-[1px] p-4 text-xl"
          >
            <label
              htmlFor={`${participant.name}`}
              className="flex flex-1 gap-10"
            >
              <p>Mat.: {participant.inscription}</p>
              <p>{participant.name}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
