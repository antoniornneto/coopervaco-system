import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import BgImage from "@/components/ui/imageBG";
import Image from "next/image";

// import de imagens
import fazerOBem from "../../../public/assets/fazer-o-bem.jpg";
import valioso from "../../../public/assets/ensinamento-valioso.jpg";
import solidariedade from "../../../public/assets/solidariedade.jpg";
import Carousel from "@/components/ui/carousel";

export default function PaginaDeEventos() {
  return (
    <main>
      <title>Coopervaço - Eventos Dia C</title>
      <Header />
      <BgImage />
      <div className="flex flex-col items-center">
        {/* Initial section */}
        <div className="w-[60%] flex gap-10 items-center py-10 flex-wrap md:flex-col md:[90%]">
          <div className="flex-1 space-y-4">
            <hr className="border-[#6eaa64] border-[1px] w-14" />
            <h1 className="text-4xl uppercase">Eventos do Dia C</h1>
            <h2 className="text-[#6eaa64] text-xl">
              Oferecemos orientações que podem facilitar a administração das
              suas finanças.
            </h2>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <h3 className="font-bold text-lg">Nosso Evento</h3>
            <p className="text-sm">
              Evento cooperativa de trabalho dos profissionais de Instituições
              financeiras do vale do aço de Minas Gerais e adjacências em CENA
              2018 em parceria com UNIMED Vale do Aço, Sicoob , Consul e
              Usiminas, que cedeu o espaço do Teatro Usiminas, localizado no
              Shopping Ipatinga , onde o ingresso foi substituído por 2KG de
              alimentos não perecíveis.
            </p>
          </div>
        </div>
        {/* Carousel section */}
        <div className="w-[60%] flex justify-center items-center py-10 flex-wrap flex-col md:[90%]">
          <h1 className="font-semibold">Evento do Dia C - 2018</h1>
          <p>Por um mundo mais sustentável</p>
        </div>
        {/* carousel */}
        <Carousel />
        {/* Pics section */}
        <div className="w-[60%] flex justify-center py-20 md:[90%] ">
          <div className="flex justify-center items-center gap-4 lg:flex-col flex-1">
            <div className="flex flex-col justify-center items-center flex-1">
              <h3 className="font-semibold">Evento do Dia C - 2019</h3>
              <p>Fazer o Bem faz Bem</p>
              <Image
                src={fazerOBem}
                width={0}
                height={0}
                alt="Pessoas reunidas em volta de fraldas adquiridas para doação"
                className="w-80 h-80"
              />
            </div>
            <div className="flex flex-col justify-center items-center flex-1">
              <h3 className="font-semibold">Evento do Dia C - 2019</h3>
              <p>Fazer o Bem faz Bem</p>
              <Image
                src={valioso}
                width={0}
                height={0}
                alt="Pessoas sendo premiadas no evento COOPEINF"
                className="w-80 h-80"
              />
            </div>
            <div className="flex flex-col justify-center items-center flex-1">
              <h3 className="font-semibold">Evento do Dia C - 2019</h3>
              <p>Fazer o Bem faz Bem</p>
              <Image
                src={solidariedade}
                width={0}
                height={0}
                alt="Pessoas reunidas usando máscara em volta de alimentaos adquiridos para doação"
                className="w-80 h-80"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
