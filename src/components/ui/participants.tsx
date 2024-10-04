"use client";

import { useEffect, useState } from "react";
import { UserProp } from "../users-list";
import { ParticipantProp } from "@/app/dashboard/create-ata/[ataId]/page";

const Participants = ({ id }: { id: string }) => {
  const [participants, setParticipants] = useState<Array<UserProp>>([]);

  useEffect(() => {
    const getAta = fetch(`/api/ata/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data.ata.participants);
      });
  }, []);

  const participantsJSON = participants;
  const convertJSONToString = JSON.stringify(participantsJSON);
  const ataParticipants: ParticipantProp[] = JSON.parse(convertJSONToString);
  return (
    <div className="w-[90%]">
      <h1 className="text-2xl">Participantes da reunião</h1>
      <div>
        {ataParticipants.map((participant) => (
          <div
            key={participant.inscription}
            className="flex border-[1px] p-4 text-xl gap-"
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
