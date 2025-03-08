import { ParticipantProp, UserProp } from "@/types/types";
import { useEffect, useState } from "react";

const Participants = ({ participants }: { participants: UserProp }) => {
  return (
    <div className=" space-y-5">
      <div>
        {participants?.map((participant) => (
          <div
            key={participant?.id}
            className="flex border-[1px] w-full p-4 text-xl"
          >
            <label
              htmlFor={`${participant?.name}`}
              className="flex flex-1 gap-5 items-center"
            >
              <p className="w-28">Mat.: {participant?.inscription}</p>
              <p className="flex-1">{participant.name}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
