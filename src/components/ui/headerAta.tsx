import { dayjs } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";

const HeaderAta = ({ date }: { date: Date }) => {
  return (
    <div className="bg-[#F0F0F0] flex justify-center items-center h-44">
      <div className="w-[90%] flex items-center">
        <div className="flex-1 flex items-end flex-wrap gap-10 md:gap-5 md:justify-center md:items-center">
          <h1 className="text-5xl md:flex-1 md:text-4xl">Ata de Reunião</h1>
          <div className="flex gap-10 md:flex-1 md:justify-between md:gap-4">
            <span>
              Data: <strong>{dayjs(date).format("DD/MM/YYYY")}</strong>
            </span>
            <span>
              Horário: <strong>{dayjs(date).format("HH:MM")}</strong>
            </span>
          </div>
        </div>
        <Link href={"/dashboard"}>
          <X
            className="bg-[#D8FFE2] rounded-lg m-10"
            size={50}
            color="#5DA770"
          />
        </Link>
      </div>
    </div>
  );
};

export default HeaderAta;
