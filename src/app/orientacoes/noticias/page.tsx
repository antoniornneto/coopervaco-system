import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import BgImage from "@/components/ui/imageBG";
import Image from "next/image";
import Link from "next/link";
import articleImg1 from "../../../../public/assets/news1.jpg";
import articleImg2 from "../../../../public/assets/news2.jpg";

export default function PaginaDeNoticias() {
  return (
    <main>
      <title>Coopervaço - Orientações</title>
      <Header />
      <BgImage />
      <div className="flex flex-col items-center">
        {/* Initial section */}
        <section className="w-[60%] flex gap-10 py-10 flex-wrap md:flex-col md:w-[90%]">
          <div className="flex-1 space-y-4">
            <hr className="border-[#6eaa64] border-[1px] w-14" />
            <h1 className="text-4xl uppercase">
              Entrevista sobre alta da Gasolina.
            </h1>
            <h2 className="text-[#6eaa64] text-xl">
              Erasmo Lima entrevista Diário do Aço
            </h2>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <h3 className="font-bold text-lg">O QUE É EMPREENDEDORISMO</h3>
            <p className="text-sm text-justify">
              Uma alternativa apontada pelo economista para baixar o preço do
              petróleo, e consequentemente o valor da gasolina, seria estimular
              a queda do dólar aumentando a taxa Selic, que está atualmente em
              2,75%. “Quando o governo reduz o índice da Selic ao ano, isso
              acarreta na alta do dólar. Por exemplo, se hoje a taxa estivesse a
              4,5%, os investimentos que foram migrados para o exterior, devido
              à valorização do dólar, estariam aplicados em investimentos em
              nosso país, o que estimularia o mercado, consequentemente, faria o
              dólar cair. Portanto, se o governo aumentasse um pouco a taxa
              Selic, colaboraria para o câmbio cair, ajustando o preço final da
              gasolina para o consumidor”, explicou.
            </p>
          </div>
        </section>
        {/* News section */}
        <section className="w-full bg-[#f3f3f6] flex justify-center">
          <div className="w-[60%] flex gap-4 py-10 md:flex-col md:w-[90%]">
            <div className="flex-1 space-y-10">
              <Image
                src={articleImg1}
                width={0}
                height={0}
                alt="Foto do Erasmo Felizardo Lima, vice-presidente da Coopeinf e pós-graduado em Gestão Estratégica de Marketing."
              />
              <hr className="border-[#6eaa64] border-[1px] w-20" />
              <div className="flex flex-col gap-5">
                <h3 className="font-bold uppercase">Planejar suas finanças</h3>
                <p className="text-justify">
                  Com a chegada do novo ano, muitas pessoas dão início à
                  tentativa de mudanças de hábitos. Na lista de pretensões esta,
                  para muitos, a vontade de se livrar das dívidas. O controle
                  das finanças pessoais, entretanto, requer gastos com a compra
                  somente dos produtos e serviços de fato relevantes e o corte
                  de despesas desnecessárias.
                </p>
                <p className="text-justify">
                  O alerta é feito pelo vice-presidente da Cooperativa de
                  Trabalho dos Profissionais de Instituições Financeiras do Vale
                  do Aço de Minas Gerais e Adjacências (Coopervaco), Erasmo
                  Felizardo Lima, especialista em Gestão Estratégica de
                  Marketing. Ele reitera que o controle de gastos é o caminho
                  indicado para uma boa saúde financeira.
                </p>
                <Link
                  className="underline text-[#6eaa64]"
                  href={
                    "https://www.diariodoaco.com.br/noticia/0055656-profissional-alerta-para-necessidade--do-planejamento-financeiro-em-2018"
                  }
                  target="_blank"
                >
                  Notícia Completa
                </Link>
              </div>
            </div>
            <div className="flex-1 space-y-10">
              <Image
                src={articleImg2}
                width={0}
                height={0}
                alt="Foto do Erasmo Felizardo Lima, vice-presidente da Coopeinf e pós-graduado em Gestão Estratégica de Marketing."
              />
              <hr className="border-[#6eaa64] border-[1px] w-20" />
              <div className="flex flex-col gap-5">
                <h3 className="font-bold uppercase">
                  CAIXA AMPLIARÁ HORÁRIO DE ATENDIMENTO
                </h3>
                <p className="text-justify">
                  O governo federal divulgou, nessa terça-feira (14), o
                  calendário para o saque das contas inativas do FGTS. Cerca de
                  30 milhões de trabalhadores terão direito ao benefício, com
                  previsão de que sejam injetados R$ 34 bilhões na economia
                  brasileira. Os saques das contas inativas de FGTS começarão no
                  dia 10 de março, mas o trabalhador já pode se informar sobre o
                  direito ao dinheiro.
                </p>
                <p className="text-justify">
                  O presidente da Caixa Econômica Federal, Gilberto Occi,
                  informou, ao anunciar o calendário de saque, que as agências
                  do banco vão abrir com duas horas de antecedência a partir
                  desta quarta-feira (15), para tirar as dúvidas dos
                  trabalhadores sobre os saques do FGTS das contas inativas.
                </p>
                <Link
                  className="underline text-[#6eaa64]"
                  href={
                    "https://www.diariodoaco.com.br/noticia/0048093-caixa-ampliara-horario-para-atender-saques-do-fgts"
                  }
                  target="_blank"
                >
                  Notícia Completa
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Other news section */}
        <section className="w-[60%] flex gap-14 justify-center py-20 flex-wrap md:flex-col md:w-[90%]">
          <h1 className="text-4xl">Outras entrevistas</h1>
          <div className="flex text-left gap-10 md:flex-col">
            <div className="flex-1 space-y-5">
              <hr className="border-[#6eaa64] border-[1px] w-20" />
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">
                  Alta do Dólar que impede queda de preço dos alimentos
                </h3>
                <p className="text-justify">
                  Uma ida ao supermercado atualmente pode deixar qualquer
                  consumidor impressionado com o preço dos alimentos nas
                  prateleiras, que subiu de forma assustadora nos últimos meses.
                </p>
                <p className="text-justify">
                  Conforme o{" "}
                  <strong>
                    Instituto Brasileiro de Geografia e Estatística (IBGE)
                  </strong>
                  , o preço dos alimentos subiu mais de 14% desde o ano passado.
                  Os preços do óleo de soja tiveram um aumento de 103,79% e do
                  arroz, de 76,01%, no acumulado de 2020. Diante disso, os
                  consumidores aguardam ansiosamente pela queda de preços para
                  aliviar seu bolso, porém, isso pode demorar a acontecer.
                </p>
                <Link
                  className="underline text-[#6eaa64]"
                  href={
                    "https://www.diariodoaco.com.br/noticia/0088242-alta-do-dolar-impede-queda-de-preco-dos-alimentos-aponta-economista"
                  }
                  target="_blank"
                >
                  Notícia Completa
                </Link>
              </div>
            </div>
            <div className="flex-1 space-y-5">
              <hr className="border-[#6eaa64] border-[1px] w-20" />
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">Escolha melhor linha de crédito</h3>
                <p className="text-justify">
                  Quando você contrata um cartão de crédito, é comum a
                  administradora oferecer-lhe cartão adicional, o que muito
                  facilita o dia-a-dia das famílias quando utilizados
                  adequadamente. Nestes casos, é importante que se faça o
                  controle individual de cada usuário, para que não haja uso
                  excessivo desta modalidade de linha de crédito.
                </p>
                <p className="text-justify">
                  Outra observação importante: procure sempre liquidar o valor
                  total da sua fatura. Na eventualidade de recursos
                  insuficientes para liquidar o total geral da fatura, procure
                  outra linha de crédito com taxas inferiores as utilizadas nos
                  cartões e limites disponíveis em conta-corrente. O uso do
                  cheque especial, também deve ser evitado. Esta linha de
                  crédito é tão elevada, quanto as praticadas nos cartões.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
