import { db } from "@/lib/db";
import { dayjs } from "@/lib/utils";
import { Download, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const AtasList = async () => {
  const session = await getServerSession(authOptions);
  const atas = await db.ata.findMany();

  return (
    <div className="py-10">
      <div className="border-x-2">
        {atas.map((ata) => (
          <div
            key={ata.id}
            className="flex border-y-[1px] items-center px-4 py-2 hover:bg-[#F0FFF4]"
          >
            <div className="flex flex-1 gap-10">
              <p className="text-lg">
                {dayjs(ata.createdAt).format("DD/MM/YYYY")}
              </p>
              <h3 className="text-lg">{ata.title}</h3>
            </div>
            <div className="flex items-center gap-4">
              {session?.user.role === "admin" ? (
                <>
                  <span>80%</span>
                  <Pencil size={20} />
                  <Trash2 size={20} />
                  <Download size={20} />
                  <Eye size={20} />
                  <Button className="w-36 rounded-full px-8 bg-[#5DA770] hover:bg-[#5DA770]/80">
                    Assinar ata
                  </Button>
                </>
              ) : (
                <>
                  <span>80%</span>
                  <Eye size={20} />
                  <Button className="w-36 rounded-full px-8 bg-[#5DA770] hover:bg-[#5DA770]/80">
                    Assinar ata
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtasList;
