import { dayjs } from "@/lib/utils";
import DeleteButton from "./ui/deleteButton";
import { db } from "@/lib/db";
import ViewButton from "./ui/viewButton";
import EditButton from "./ui/editButton";
import DownloadButton from "./ui/downloadButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignAta from "./ui/signAta";
import { AtasDataProps, ParticipantProp } from "@/types/types";
import PercentSignatures from "./ui/ataSignaturesPercent";

const AtasList = async () => {
  const session = await getServerSession(authOptions);
  const ataData: AtasDataProps = await db.ata.findMany();

  let ataWithUser: string[] = [];
  ataData.some((ata) => {
    const exists = ata.participants.some(
      (participant: ParticipantProp) => participant.name === session?.user.name
    );
    if (exists) {
      ataWithUser.push(ata.id);
    }
  });

  return (
    <div className="py-10">
      <div className="border-x-2">
        {ataData.map((ata) => (
          <div
            key={ata.id}
            className="flex border-y-[1px] justify-center flex-wrap items-center px-4 py-3 hover:bg-[#F0FFF4] md:gap-2"
          >
            <div className="flex flex-1 gap-10">
              <p className="text-lg">
                {dayjs(ata.createdAt).format("DD/MM/YYYY")}
              </p>
              <h3 className="flex-1 text-lg">{ata.title}</h3>
            </div>
            {session?.user.role === "admin" ? (
              <div className="flex items-center gap-2 md:flex-1 md:justify-evenly">
                <PercentSignatures ataId={ata.id} />
                <EditButton ataId={ata.id} />
                <DeleteButton ataId={ata.id} />
                <ViewButton ataId={ata.id} />
                {/* Função de download desabilitada temporariamente */}
                {/* <DownloadButton /> */}
                <SignAta atas={ataWithUser} ataId={ata.id} />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <PercentSignatures ataId={ata.id} />
                {/* Função de download desabilitada temporariamente */}
                {/* <DownloadButton /> */}
                <ViewButton ataId={ata.id} />
                <SignAta atas={ataWithUser} ataId={ata.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtasList;
