import { dayjs } from "@/lib/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface HeaderAtaProps {
  date: {
    createdAt: Date;
    updateAt: Date;
  };
  children?: React.ReactNode;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const HeaderAta = ({ date, children }: HeaderAtaProps) => {
  const createdDataUtc = date.createdAt;
  const createdBrazilDate = dayjs(createdDataUtc)
    .tz("America/Sao_Paulo")
    .locale("pt-br");
  const formateCreateddDate = createdBrazilDate.format("D [de] MMMM, YYYY");
  const formatedCreatedHour = createdBrazilDate.format("HH:mm");

  const updatedDataUtc = date.updateAt;
  const updatedBrazilDate = dayjs(updatedDataUtc)
    .tz("America/Sao_Paulo")
    .locale("pt-br");
  const formatedUpdateDate = updatedBrazilDate.format("DD/MM/YYYY");
  const formatedHour = updatedBrazilDate.format("HH:mm");

  return (
    <div className="bg-[#F0F0F0] flex justify-center items-center mix-h-44 py-4">
      <div className="w-[90%] flex items-center gap-4">
        <div className="flex-1 flex items-end flex-wrap gap-10 md:gap-5 md:flex-col md:items-start">
          <h1 className="text-5xl md:flex-1 md:text-4xl">Ata de Reunião</h1>
          <div className="flex gap-10 items-center text-lg md:flex-1 md:gap-4 md:flex-col md:items-start">
            <p>{`${formateCreateddDate}, ${formatedCreatedHour}`}</p>
            <div className="text-sm font-bold">
              <p>
                Última atualização: {formatedUpdateDate}, {formatedHour}
              </p>
            </div>
          </div>
        </div>
        {children}
        <Button className="bg-[#D8FFE2] rounded-lg p-2 text-[#5DA770] font-bold w-fit flex gap-2 hover:text-[#D8FFE2] hover:bg-[#5DA770]">
          <Link href={"/dashboard"} className="flex items-center gap-2">
            <ArrowLeft size={30} />
            <p className="md:hidden">Voltar</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderAta;
