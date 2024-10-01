import AtasList from "../atas-list";
import HeaderSystem from "../ui/system-header";
import Link from "next/link";

const linkButtonStyle = `bg-[#5DA770] px-4 py-2 rounded-lg text-white hover:bg-[#5DA770]/80`;

const AdminPage = async () => {
  return (
    <div>
      <HeaderSystem />
      {/* topo da página */}
      <div>
        <div className="bg-[#F0F0F0] w-full flex justify-center">
          <div className="w-[90%] h-32 flex items-center gap-10">
            <h1 className="text-4xl">Atas de Reuniões</h1>
            <select className="border-2 border-zinc-300 bg-transparent rounded-lg px-4 text-lg">
              <option value="2024">2024</option>
            </select>
            <Link href={"/dashboard/create-ata"} className={linkButtonStyle}>
              Criar Ata
            </Link>
            <Link
              href={"/dashboard/manage-employee"}
              className={linkButtonStyle}
            >
              Gerenciar funcionários
            </Link>
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
