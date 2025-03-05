"use client";
import { ParticipantProp } from "@/types/types";
import { Button } from "./button";
import { toast } from "sonner";

const SignInButton = ({
  ataId,
  sessionUserName,
}: {
  ataId: string;
  sessionUserName: string;
}) => {
  const handleSign = async (ataId: string) => {
    const reqAta = await fetch(`/api/ata/${ataId}`);
    const data = await reqAta.json();
    const idArrays = data.ata?.participants;
    const convertString = JSON.stringify(idArrays);
    const participants: ParticipantProp[] = JSON.parse(convertString);

    participants.forEach((participant) => {
      if (participant.name === sessionUserName) {
        participant.sign = true;
      }
    });

    const reqUpdateAta = await fetch(`/api/ata/${ataId}}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: ataId,
        participants,
      }),
    });

    const resUpdateAta = await reqUpdateAta.json().then((res) => res);
    toast.loading("Só um momento");
    setTimeout(() => {
      if (reqUpdateAta.ok) {
        toast.success(`${resUpdateAta.message}`);
        location.reload();
      } else {
        toast.error("Aconteceu algo inesperado");
      }
    }, 2000);
  };

  return (
    <Button
      onClick={(e) => handleSign(ataId)}
      title="Clique para assinar"
      className="w-28 rounded-full px-8 bg-[#5DA770] hover:bg-[#5DA770]/80"
    >
      Assinar ata
    </Button>
  );
};

export default SignInButton;
