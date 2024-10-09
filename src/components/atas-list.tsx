import { dayjs } from "@/lib/utils";
import { Button } from "./ui/button";
import DeleteButton from "./ui/deleteButton";
import { db } from "@/lib/db";
import ViewButton from "./ui/viewButton";
import EditButton from "./ui/editButton";
import DownloadButton from "./ui/downloadButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const AtasList = async () => {
  const session = await getServerSession(authOptions);
  const ataData = await db.ata.findMany();

  return (
    <div className="py-10">
      <div className="border-x-2">
        {ataData.map((ata) => (
          <div
            key={ata.id}
            className="flex border-y-[1px] items-center px-4 py-3 hover:bg-[#F0FFF4]"
          >
            <div className="flex flex-1 gap-10">
              <p className="text-lg">
                {dayjs(ata.createdAt).format("DD/MM/YYYY")}
              </p>
              <h3 className="text-lg">{ata.title}</h3>
            </div>
            {session?.user.role === "admin" ? (
              <div className="flex items-center gap-2">
                <span>80%</span>
                <EditButton ataId={ata.id} />
                <DeleteButton ataId={ata.id} />
                <DownloadButton />
                <ViewButton ataId={ata.id} />
                <Button className="w-28 rounded-full px-8 bg-[#5DA770] hover:bg-[#5DA770]/80">
                  Assinar ata
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>80%</span>
                <DownloadButton />
                <ViewButton ataId={ata.id} />
                <Button className="w-28 rounded-full px-8 bg-[#5DA770] hover:bg-[#5DA770]/80">
                  Assinar ata
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtasList;
