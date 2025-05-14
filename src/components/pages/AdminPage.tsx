import { db } from "@/lib/db";
import AtasList from "../atas-list";
import { Button } from "../ui/button";
import SignatureAlert from "../ui/signatureAlert";
import HeaderSystem from "../ui/system-header";
import Link from "next/link";
import { AtasDataProps } from "@/types/types";
import { dayjs } from "@/lib/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { FilePlus2 } from "lucide-react";

dayjs.extend(utc);
dayjs.extend(timezone);

const AdminPage = async ({ id }: { id: string | undefined }) => {
  const ataData: AtasDataProps = await db.ata.findMany();
  const years: string[] = [];
  ataData.map((ata) => years.push(dayjs(ata.createdAt).format("YYYY")));
  const uniqueYears = [...new Set(years)];

  return (
    <div>
      <HeaderSystem />
      {/* topo da página */}
      <div>
        <div className="bg-[#F0F0F0] flex flex-col items-center py-5">
          <div className="w-[90%] flex flex-col">
            <SignatureAlert id={id} />
            <div className="flex justify-between items-end py-5 gap-4 md:flex-col md:h-fit md:py-2 md:items-start">
              <div className="text-[#606060] max-w-[26rem]">
                <h1 className="text-4xl font-bold md:text-3xl">
                  Atas de Reuniões
                </h1>
                <p>
                  A cada reunião realizada o administrador da reunião deixará a
                  ata disponível para você visualizar e assinar.{" "}
                </p>
              </div>
              <Button className="bg-button_primary space-x-2 hover:bg-button_primary/70 md:flex-1">
                <FilePlus2 />
                <Link href={"/dashboard/create-ata"}>Criar Ata</Link>
              </Button>
              {/* <select className="border-2 border-zinc-300 bg-transparent rounded-lg px-4 text-lg">
              {uniqueYears.map((year) => (
                <option key={`${year}`} value={`${year}`}>
                  {year}
                </option>
              ))}
            </select> */}
              {/* <div className="w-[24rem]">
              
            </div>
            <div className="flex flex-1 flex-wrap gap-2">
              
              <Button className="bg-button_primary hover:bg-button_primary/70 md:flex-1">
                <Link className="text-wrap" href={"/dashboard/manage-employee"}>
                  Gerenciar Cooperados
                </Link>
              </Button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* lista de atas */}
      <div className="w-full flex justify-center">
        <div className="w-[90%]">
          <AtasList />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
