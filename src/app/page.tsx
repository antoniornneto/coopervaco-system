import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import Link from "next/link";
import erasmoImg from "../../public/assets/erasmo.jpg";
import articleImg1 from "../../public/assets/article1.png";
import articleImg2 from "../../public/assets/article2.png";
import newsletter from "../../public/assets/newsletter.png";
import BgImage from "@/components/ui/imageBG";

const pStyle = "text-center text-sm md:text-wrap";

export default function Home() {
  return (
    <main>
      <title>Coopervaço - Home</title>
      <Header />
      <BgImage />
      <div>
        {/* Mission section */}
        <section className="flex justify-center">
          <div className="w-[60%] text-center py-10 space-y-10 md:w-[90%] lg:w-[85%]">
            <h2 className="text-xl">
              Ainda não conhece a importância das nossas orientações
              financeiras?
            </h2>
            <div className="flex justify-center text-center gap-10 md:flex-col">
              <div className="flex-1 flex flex-col gap-4">
                <h1 className="font-bold">MISSÃO</h1>
                <p className={pStyle}>
                  Contribuir com a comunidade bancária com as melhores práticas
                  de educação financeira e uso consciente do dinheiro.
                </p>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <h1 className="font-bold">A COOPERVAÇO</h1>
                <p className={pStyle}>
                  A Coopervaço é uma Cooperativa de trabalho em educação
                  financeira dos profissionais das instituições bancárias do
                  vale do aço de Minas Gerais e Adjacências LTDA.
                </p>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <h1 className="font-bold">VISÃO</h1>
                <p className={pStyle}>
                  Ser uma organização geradora de valores e reconhecida por
                  contribuir para o equilíbrio financeiro da categoria bancária.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Numbers section */}
        <section className="flex justify-center bg-[#f4f4f7]">
          <div className="w-[60%] flex py-20 gap-4 md:w-[90%] md:flex-col lg:w-[85%]">
            <div className="flex-1">
              <Image
                src={erasmoImg}
                width={0}
                height={0}
                alt="Foto de funcionário da Coopervaço trabalhando em um notebook."
                className=""
              />
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="font-semibold text-[#434343]">
                Entenda os números e comece a mudar a realidade
              </h2>
              <p className="text-justify text-sm">
                A cooperativa, com base na colaboração recíproca a que se propõe
                seus cooperados, tem por objeto social a prestação de serviços
                de educação financeira a categoria bancária, sem fins
                lucrativos.
              </p>
              <p className="text-justify text-sm">
                Para atingir estes objetivos, poderá promover palestras para
                categoria bancária com intuito de aprimorá-los para a
                certificação AMBIMA/CEA, dentre outras.
              </p>
              <div>
                <Link
                  className="text-[#37ab68] hover:underline"
                  href={"/contato"}
                >
                  Entre em contato
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Articles section */}
        <section className="flex justify-center">
          <div className="w-[60%] text-center py-14 gap-10 flex md:flex-col md:w-[90%] lg:w-[85%]">
            <article className="flex flex-1 gap-5 sm:flex-col">
              <div className="flex flex-col flex-1 text-left gap-4">
                <h1 className="text-[#172d31] font-bold text-lg">
                  PLANEJAR SUAS FINANÇAS
                </h1>
                <p className="text-sm flex-1">
                  Com a chegada do novo ano, muitas pessoas dão início à
                  tentativa de mudanças de hábitos. Na lista de pretensões esta,
                  para muitos, a vontade de se livrar das dívidas. O controle
                  das finanças pessoais, entretanto, requer gastos com a compra
                  somente dos produtos...
                </p>
              </div>
              <div className="flex flex-col flex-1 justify-center items-center gap-4 text-white">
                <Image
                  src={articleImg1}
                  width={0}
                  height={0}
                  alt="Foto de funcionário da Coopervaço trabalhando em um notebook."
                  className="w-52"
                />
                <Link
                  className="bg-[#002c3a] px-8 py-2 rounded-lg hover:bg-[#002c3a]/60"
                  href={"/orientacoes"}
                >
                  Ler mais
                </Link>
              </div>
            </article>
            <article className="flex flex-1 gap-5 sm:flex-col">
              <div className="flex flex-col flex-1 text-left gap-4">
                <h1 className="text-[#172d31] font-bold text-lg">
                  CAIXA AMPLIARA HORÁRIO DE ATENDIMENTO
                </h1>
                <p className="text-sm flex-1">
                  O governo federal divulgou, nessa terça-feira (14), o
                  calendário para o saque das contas inativas do FGTS. Cerca de
                  30 milhões de trabalhadores terão direito ao benefício, com
                  previsão de que...
                </p>
              </div>
              <div className="flex flex-col flex-1 justify-center items-center gap-4 text-white">
                <Image
                  src={articleImg2}
                  width={0}
                  height={0}
                  alt="Foto de funcionário da Coopervaço trabalhando em um notebook."
                  className="w-52"
                />
                <Link
                  className="bg-[#002c3a] px-8 py-2 rounded-lg hover:bg-[#002c3a]/60"
                  href={"/orientacoes"}
                >
                  Ler mais
                </Link>
              </div>
            </article>
          </div>
        </section>
        {/* Newsletter section */}
        <section className="bg-[#37ab68] flex justify-center">
          <div className="w-[60%] text-center py-20 flex gap-10 md:w-[90%] md:flex-col lg:w-[85%]">
            <div className="flex flex-1 gap-2 justify-center items-center">
              <Image
                src={newsletter}
                width={0}
                height={0}
                alt="Foto de funcionário da Coopervaço trabalhando em um notebook."
                className="h-20 w-40"
              />
              <p className="text-left text-white">
                Assine nossa newsletter e receba conteúdo exclusivo sobre gestão
                financeira e empreendedorismo no seu email.
              </p>
            </div>
            <form
              action=""
              className="flex flex-col gap-4 flex-1 justify-center items-end"
            >
              <div className="flex flex-col gap-2 sm:w-full">
                <input
                  className="w-80 rounded-lg p-2 sm:w-auto"
                  placeholder="Nome"
                  type="text"
                />
                <input
                  className="w-80 rounded-lg p-2 sm:w-auto"
                  placeholder="E-mail"
                  type="email"
                />
              </div>
              <input
                className="bg-[#002c3a] rounded-xl w-44 py-2 text-white hover:bg-[#002c3a]/75 cursor-pointer sm:w-full"
                type="submit"
                value="Cadastrar"
              />
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
