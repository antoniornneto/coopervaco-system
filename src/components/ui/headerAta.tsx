import { dayjs } from "@/lib/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface HeaderAtaProps {
  date: Date;
  children?: React.ReactNode;
}

dayjs.extend(utc)
dayjs.extend(timezone)

const HeaderAta = ({ date, children }: HeaderAtaProps) => {
  const dataUtc = date
  const brazilDate = dayjs(dataUtc).tz("America/Sao_Paulo").locale("pt-br")
  const formatedDate = brazilDate.format("D [de] MMMM, YYYY")
  const formatedHour = brazilDate.format("HH:mm")

  return (
    <div className="bg-[#F0F0F0] flex justify-center items-center h-44">
      <div className="w-[90%] flex items-center">
        <div className="flex-1 flex items-end flex-wrap gap-10 md:gap-5 md:justify-center md:items-center">
          <h1 className="text-5xl md:flex-1 md:text-4xl">Ata de Reunião</h1>
          <div className="flex gap-10 text-lg md:flex-1 md:justify-between md:gap-4">
            <p>
              {`${formatedDate}, ${formatedHour}`}
            </p>
          </div>
        </div>
        {children}
        <Button className="bg-[#D8FFE2] rounded-lg p-2 text-[#5DA770] font-bold w-fit ml-3 hover:text-[#D8FFE2] hover:bg-[#5DA770] fill-[#D8FFE2] hover:fill-[#5DA770]">
          <Link href={"/dashboard"} className="flex gap-2">
          <ArrowLeft size={20} />
            {/* <X  size={20} className="fill-[#5DA770] hover:fill-[#D8FFE2]"/> */}
            Voltar
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderAta;
