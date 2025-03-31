import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import BgImage from "@/components/ui/imageBG";

export default function PaginaDeEquipe() {
  return (
    <main>
      <title>Coopervaço - Equipe</title>
      <Header />
      <BgImage />
      <div className="flex flex-col items-center">
        {/* Initial section */}
        <div className="w-[60%] flex gap-10 items-center py-14 flex-wrap md:flex-col md:[90%]">
          <div className="flex-1 space-y-4">
            <hr className="border-[#6eaa64] border-[1px] w-14" />
            <h1 className="text-4xl uppercase">Equipe Coopervaço</h1>
            <h2 className="text-[#6eaa64] text-xl">
              Oferecemos orientações que podem facilitar a administração das
              suas finanças.
            </h2>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <h3 className="font-bold text-lg">Nossa Equipe</h3>
            <ul className="list-disc">
              <li>Conselho de Administração</li>
              <li>Conselho Fiscal</li>
              <li>Cooperados</li>
              <li>Associados</li>
            </ul>
          </div>
        </div>
        {/* Team section */}
        <div className="w-[60%] flex gap-10 py-20 flex-col md:[90%]">
          <h3 className="font-bold text-lg uppercase">
            Conselho de administração / Conselho Fiscal / Cooperados /
            Associados
          </h3>
          <h4>
            Nova Composição do Conselho de Administração/Quadriênio 2023/2026.
          </h4>
          <div>
            <p>
              <strong>Diretor Presidente: </strong>
              Bárbara Karoline Mafort Gomes
            </p>
            <p>
              <strong>Vice Presidente: </strong>
              Fábio Deodoro de Souza
            </p>
            <p>
              <strong>
                Diretor de Certificações Bancárias e Educação Financeira:{" "}
              </strong>
              Glauco de Lima Cruz
            </p>
            <p>
              <strong>Diretor Adjunto de Cetificação Bancária: </strong>
              Natália Cecília Silva Martins Almeida
            </p>
            <p>
              <strong>
                Diretora de Coordenação Cooperativista e Eventos do Dia C:{" "}
              </strong>
              Edwania Martins Lopes Fonseca
            </p>
            <p>
              <strong>Diretora Administrativa: </strong>
              Solange Rodrigues de Almeida Andrade
            </p>
            <p>
              <strong>Diretora de Convênios e Benefícios: </strong>
              Sirlene Lopes dos Santos
            </p>
            <p>
              <strong>Diretor Financeiro: </strong>
              Lucas Araújo
            </p>
            <p>
              <strong>Diretora Secretária: </strong>
              Caren Cristina Martins Silva
            </p>
          </div>
          <h4>
            Composição da Diretoria do Conselho Fiscal Mandato 2024/2026 para o
            Mandato de 2024 conforme 12.690/2012 e Lei 5.762 /1971:
          </h4>
          <div>
            <h4 className="font-bold">Diretores do Conselho Fiscal: </h4>
            <p>Edmilson Neves de Souza</p>
            <p>Cláudio Roberto de Oliveira Silva</p>
            <p>Werlen Carlos Lopes Silva</p>
            <p>Alessandra Ribeiro Lima</p>
            <p>José Maria Pereira Chagas</p>
            <p>Evelyn Eymard Mesquita Vieira</p>
          </div>
          <div className="flex justify-between gap-10 md:flex-col">
            <div>
              <h4 className="font-bold uppercase">Membros Efetivos:</h4>
              <p>Edimilson Neves de Souza</p>
              <p>Cláudio Roberto de Oliveira Silva</p>
              <p>Werlen Carlos Lopes Silva</p>
              {/* <p>Eberton Tiago de Brito Mendes</p> */}
              {/* <p>Fabiana Cláudia D. Nunes</p> */}
            </div>
            <div>
              <h4 className="font-bold uppercase">Membros Suplentes:</h4>
              <p>Alessandra Ribeiro Lima</p>
              <p>José Maria Pereira Chagas</p>
              <p>Evelyn Eymard Mesquita Vieira</p>
              {/* <p>Eberton Tiago de Brito Mendes</p> */}
              {/* <p>Fabiana Cláudia D. Nunes</p> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
