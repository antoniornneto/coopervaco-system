import AtasList from "../atas-list";
import { Button } from "../ui/button";
import HeaderSystem from "../ui/system-header";
import Link from "next/link";

const AdminPage = async () => {
  return (
    <div>
      <HeaderSystem />
      {/* topo da página */}
      <div>
        <div className="bg-[#F0F0F0] w-full flex justify-center">
          <div className="w-[90%] h-32 flex items-center gap-8">
            <h1 className="text-4xl">Atas de Reuniões</h1>
            <select className="border-2 border-zinc-300 bg-transparent rounded-lg px-4 text-lg">
              <option value="2024">2024</option>
            </select>
            <div className="flex flex-1 flex-wrap gap-2">
              <Button className="bg-button_primary hover:bg-button_primary/70 md:flex-1">
                <Link href={"/dashboard/create-ata"}>Criar Ata</Link>
              </Button>
              <Button className="bg-button_primary hover:bg-button_primary/70 md:flex-1">
                <Link className="text-wrap" href={"/dashboard/manage-employee"}>
                  Gerenciar funcionários
                </Link>
              </Button>
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
