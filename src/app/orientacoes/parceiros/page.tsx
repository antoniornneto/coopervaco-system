import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import BgImage from "@/components/ui/imageBG";
import Image from "next/image";
import Link from "next/link";

//Import de imagens de parceiros
import cest from "../../../../public/assets/parceiros/cest.png";
import fadipa from "../../../../public/assets/parceiros/fadipa.png";
import fortune from "../../../../public/assets/parceiros/fortune.jpg";

const partners = [cest, fadipa, fortune];

export default function PaginaDeParceiros() {
  return (
    <main>
      <title>Coopervaço - Parceiros</title>
      <Header />
      <BgImage />
      <div className="flex flex-col items-center">
        {/* Initial section */}
        <section className="w-[60%] flex gap-10 justify-center py-20 flex-wrap md:flex-col md:w-[90%]">
          <div className="flex-1 space-y-4">
            <hr className="border-[#6eaa64] border-[1px] w-14" />
            <h1 className="text-4xl uppercase">Parceiros Coopervaço</h1>
            <h2 className="text-[#6eaa64] text-xl">
              Oferecemos orientações que podem facilitar a administração das
              suas finanças.
            </h2>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <h3 className="font-bold text-lg">NOSSOS PARCEIROS</h3>
            <p className="text-sm text-justify">
              Uma boa gestão exige planejamento, controle e capacidade de tomar
              decisões com base nas necessidades de sua empresa.
            </p>
          </div>
        </section>
        <section className="w-[60%] flex gap-10 justify-center py-20 flex-wrap md:flex-col md:w-[90%]">
          <div className="flex flex-wrap gap-10">
            {partners.map((partner, index) => (
              <Image
                key={index}
                src={partner}
                alt=""
                width={0}
                height={0}
                className="w-80"
              />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
