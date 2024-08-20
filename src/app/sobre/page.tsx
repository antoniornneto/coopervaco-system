import Header from "@/components/ui/header";
import BgImage from "@/components/ui/imageBG";
import Image from "next/image";
import financialImg from "../../../public/assets/financeiro.png";
import coordenation from "../../../public/assets/coordenacao.png";
import Footer from "@/components/ui/footer";

export default function SobrePage() {
  return (
    <main>
      <title>Coopervaço - Sobre</title>
      <Header />
      <BgImage />
      <div className="flex flex-col h-screen justify-center items-center md:h-fit">
        {/* About section */}
        <div className="w-[60%] flex gap-4 justify-center py-10 flex-wrap md:flex-col md:[90%]">
          <div className="flex-1 space-y-4">
            <hr className="border-[#6eaa64] border-[1px] w-14" />
            <h1 className="text-4xl uppercase">Sobre a Coopervaço</h1>
            <h2 className="text-[#6eaa64]">
              Oferecemos orientações que podem facilitar a administração das
              suas finanças.
            </h2>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="uppercase font-bold text-lg">Nosso Programa</h3>
            <p className="text-left text-sm">
              Cooperativa de trabalho em educação financeira dos profissionais
              das instituições bancárias do valo do aço de Minas Gerais e
              Adjacências LTDA.
            </p>
            <p className="text-left text-sm">
              Coopervaço está localizada na região metropolitana do vale do aço,
              em Ipatinga- MG. Tem como raio de atuação, as cidades
              circunvizinhas de Ipatinga e seu objetivo principal é orientar a
              comunidade bancaria quanto a melhor forma de utilizar os recursos
              financeiros.
            </p>
          </div>
        </div>
        {/* Activities section */}
        <div className="w-[60%] flex flex-col justify-center py-10 gap-14 md:[90%]">
          <div className="flex flex-col items-center gap-3">
            <h1 className="uppercase font-bold">Atividades</h1>
            <hr className="w-10 border-[1px]" />
          </div>
          <div className="flex items-center gap-20 md:flex-col">
            <Image
              src={financialImg}
              width={0}
              height={0}
              alt="Ícone de uma lâmpada com um cifrão dentro com fundo verde"
              className="w-24 h-24"
            />
            <div className="flex-1 space-y-4">
              <h3 className="font-bold">EDUCAÇÃO FINANCEIRA</h3>
              <p>
                A cooperativa, com base na colaboração recíproca a que se propõe
                seus cooperados, tem por objeto social a atividades em educação
                financeira.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-20 md:flex-col">
            <Image
              src={coordenation}
              width={0}
              height={0}
              alt="Ícone de uma lâmpada com um cifrão dentro com fundo verde"
              className="w-24 h-24"
            />
            <div className="flex-1 space-y-4">
              <h3 className="font-bold">COORDENAÇÃO </h3>
              <p>
                Realizar trabalhos de voltados para Coordenação de certificações
                bancarias e Educação Financeiras da categoria no vale do aço e
                adjacências.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
