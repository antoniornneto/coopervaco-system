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
              <li>Conselho de administração / Cargos Executivos</li>
              <li>Conselho Fiscal</li>
              <li>Suplentes</li>
            </ul>
          </div>
        </div>
        {/* Team section */}
        <div className="w-[60%] flex gap-10 py-20 flex-col md:[90%]">
          <h3 className="font-bold text-lg">
            CONSELHO DE ADMINISTRAÇÃO / CARGOS EXECUTIVOS
          </h3>
          <h4>
            Nova Composição do Conselho de Administração/Quadriênio 2023/2026.
          </h4>
          <div>
            <p>
              <strong>Diretor Presidente: </strong>
              Felippe Gurgel Araújo Cota
            </p>
            <p>
              <strong>Vice Presidente: </strong>
              Fábio Deodoro de Souza
            </p>
            <p>
              <strong>Diretor de Certificações Bancárias: </strong>
              Ana Paula Guabiroba Mourão Furtado
            </p>
            <p>
              <strong>Diretor Adjunto de Cetificação Bancária: </strong>
              Werlen Carlos Lopes Silva
            </p>
            <p>
              <strong>Diretora de Coordenação Cooperativista: </strong>
              Edwania Martins Lopes Fonseca
            </p>
            <p>
              <strong>Diretora Administrativa: </strong>
              Solange Rodrigues de Almeida Andrade
            </p>
            <p>
              <strong>Diretora de Convênios e Benefícios: </strong>
              Bárbara Karoline Mafort Gomes
            </p>
            <p>
              <strong>Diretor Financeiro: </strong>
              Marlison Drumond de Almeida
            </p>
            <p>
              <strong>Diretora Secretária: </strong>
              Natália Cecília Silva Martins Almeida Nova
            </p>
          </div>
          <h4>
            Composição do Conselho Fiscal para o Mandato de Janeiro a Dezembro
            de 2023. Um ano conf.Lei 12.690/2012.
          </h4>
          <div>
            <h4 className="font-bold">Diretores do Conselho Fiscal: </h4>
            <p>Edmilson Neves de Souza</p>
            <p>Cláudio Roberto de Oliveira Silva</p>
            <p>Fabiana Cláudia Antunes Nunes</p>
            <p>Elaine Gonçalves da Silva Drummond</p>
            <p>José Márcio Pereira Barbosa</p>
            <p>Eberton Tiago de Brito Mendes</p>
          </div>
          <br />
          <div className="flex justify-between gap-10 md:flex-col">
            <div>
              <h4 className="font-bold uppercase">Conselheiro Fiscal</h4>
              <p className="font-semibold">Membros efetivos</p>
              <p>Cláudio Roberto de Oliveira Silva</p>
              <p>Edmilson Neves de Souza</p>
              <p>Elaine Gonçalves da Silva Drumond</p>
            </div>
            <div>
              <h4 className="font-bold uppercase">Suplentes</h4>
              <p>José Márcio Pereira Barbosa</p>
              <p>Eberton Tiago de Brito Mendes</p>
              <p>Fabiana Cláudia D. Nunes</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
