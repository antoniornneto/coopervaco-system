import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import BgImage from "@/components/ui/imageBG";
import Link from "next/link";

export default function PaginaDeConvenios() {
  return (
    <main>
      <title>Coopervaço - Convênios</title>
      <Header />
      <BgImage />
      {/* Initial section */}
      <div className="flex justify-center items-start">
        <section className="w-[60%] flex gap-10 justify-center py-20 flex-wrap md:flex-col md:w-[90%]">
          <div className="flex-1 space-y-4">
            <hr className="border-[#6eaa64] border-[1px] w-14" />
            <h1 className="text-4xl uppercase">Convênios Coopervaço</h1>
            <h2 className="text-[#6eaa64] text-xl">
              As entidades interessadas poderão fazer contatos em nossos canais
              de comunicação:
            </h2>
            <div>
              <p>Email: contato@copeinf.com.br</p>
              <p>Site: coopeinf.com.br</p>
              <p>Telefones: 031 3668-2498 </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <h3 className="font-bold text-lg">Nossos Convênios</h3>
            <p className="text-sm text-justify">
              Conforme estabelecido no estatuto vigente, a Coopervaço está
              amparada legalmente, para celebrar convênios com entidades
              especializadas em áreas educacionais, instituições públicas,
              entidades privadas, objetivando a disseminação da educação
              financeira da coletividade.
            </p>
            <p className="text-sm text-justify">
              Poderemos ainda firmar convênios com empresas comerciais,
              consultórios médicos, academias de ginásticas, dentistas,
              advogados e outros ramos de segmentos, a fim de obter descontos e
              vantagens para classe bancária.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
