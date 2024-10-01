import HeaderSystem from "@/components/ui/system-header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <div>
        <HeaderSystem />
        <Link href={"/dashboard"}>
          <ArrowLeft
            className="bg-[#F0F0F0] rounded-lg m-10"
            size={40}
            color="#5DA770"
          />
        </Link>
        <div>{/* FORM PARA ATUALIZAR DADOS DO PERFIL */}</div>
      </div>
    </main>
  );
};

export default page;
