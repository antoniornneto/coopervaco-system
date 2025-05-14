import { dayjs } from "@/lib/utils";
import DeleteButton from "./ui/deleteButton";
import { db } from "@/lib/db";
import ViewButton from "./ui/viewButton";
import EditButton from "./ui/editButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignAta from "./ui/signAta";
import { AtasDataProps, ParticipantProp } from "@/types/types";
import PercentSignatures from "./ui/ataSignaturesPercent";
import DropdownAtaSettings from "./ui/DropdownAtaSettings";

const AtasList = async () => {
  const session = await getServerSession(authOptions);
  const ataData: AtasDataProps = await db.ata.findMany();

  let ataWithUser: string[] = [];
  ataData.some((ata) => {
    const exists = ata.participants.some(
      (participant: ParticipantProp) => participant.id === session?.user.userId
    );
    if (exists) {
      ataWithUser.push(ata.id);
    }
  });

  const years: string[] = [];
  ataData.map((ata) => years.push(dayjs(ata.createdAt).format("YYYY")));
  const uniqueYears = [...new Set(years)];

  return (
    <div className="py-10">
      <select className="border-2 border-zinc-300 bg-transparent rounded-lg px-4 text-lg">
        {uniqueYears.map((year) => (
          <option key={`${year}`} value={`${year}`}>
            {year}
          </option>
        ))}
      </select>
      <div className="border-x-2 mt-5">
        {ataData.map((ata) => (
          <div
            key={ata.id}
            className="flex border-y-[1px] justify-center flex-wrap items-center px-4 py-3 hover:bg-[#F0FFF4] md:flex-col md:items-start md:gap-2"
          >
            <div className="flex flex-1 gap-10 md:flex-col md:gap-2">
              <p className="font-bold text-lg md:text-sm">
                {dayjs(ata.createdAt).format("DD/MM/YYYY")}
              </p>
              <h3 className="flex-1 text-lg md:text-sm">{ata.title}</h3>
            </div>
            <hr className="hidden md:flex w-full h-[1px] bg-gray-200" />
            <div className="md:hidden">
              {session?.user.role === "admin" ? (
                <div className="flex items-center gap-2 md:flex-1 md:justify-evenly">
                  <PercentSignatures ataId={ata.id} />
                  <DropdownAtaSettings id={ata.id} />
                  <SignAta atas={ataWithUser} ataId={ata.id} />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PercentSignatures ataId={ata.id} />
                  <ViewButton ataId={ata.id} />
                  <SignAta atas={ataWithUser} ataId={ata.id} />
                </div>
              )}
            </div>
            <div className="hidden md:flex md:self-end">
              {session?.user.role === "admin" ? (
                <div className="flex items-center gap-2 md:flex-1 md:justify-evenly">
                  <PercentSignatures ataId={ata.id} />
                  <DropdownAtaSettings id={ata.id} />
                  <SignAta atas={ataWithUser} ataId={ata.id} />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PercentSignatures ataId={ata.id} />
                  <ViewButton ataId={ata.id} />
                  <SignAta atas={ataWithUser} ataId={ata.id} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtasList;
