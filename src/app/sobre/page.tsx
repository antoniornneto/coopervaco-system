import Header from "@/components/ui/header";
import BgImage from "@/components/ui/imageBG";

export default function SobrePage() {
  return (
    <main>
      <title>Coopervaço - Sobre</title>
      <Header />
      <BgImage />
      <div className="flex flex-col w-screen items-center">
        {/* About */}
        <div className="w-[60%] flex gap-2 justify-center py-10">
          <div className="flex-1 space-y-4">
            <hr className="border-[#6eaa64] border-[1px] w-14" />
            <h1 className="text-4xl">Sobre a Coopervaço</h1>
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
      </div>
    </main>
  );
}
