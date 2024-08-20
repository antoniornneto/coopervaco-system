import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import BgImage from "@/components/ui/imageBG";
import Image from "next/image";
import Link from "next/link";

export default function PaginaDeContato() {
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
            <h1 className="text-4xl uppercase">Fale Conosco</h1>
            <h1 className="text-4xl uppercase">(31) 3668-2498</h1>
            <h2 className="text-[#6eaa64] text-xl">
              Ligue agora ou deixe uma mensagem. Queremos saber mais sobre o seu
              negócio.
            </h2>
          </div>
          <form action="" className="flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col">
              <label htmlFor="name">Nome: </label>
              <input
                className="w-full rounded-lg p-2 border-zinc-500 border-[1px] sm:w-auto"
                placeholder="Maria da Silva"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="tel">Telefone: </label>
              <input
                className="w-full rounded-lg p-2 border-zinc-500 border-[1px] sm:w-auto"
                placeholder="(31) 9 9999-9999"
                type="number"
                name="tel"
                id="tel"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="email">E-mail: </label>
              <input
                className="w-full rounded-lg p-2 border-zinc-500 border-[1px] sm:w-auto"
                placeholder="mariasilva@email.com"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="message">Mensagem: </label>
              <textarea
                name="message"
                id="message"
                className="w-full rounded-lg p-2 border-zinc-500 border-[1px] sm:w-auto"
                placeholder="Digite sua mensagem"
                rows={5}
              ></textarea>
            </div>
            <input
              className="bg-[#002c3a] rounded-xl w-44 py-2 text-white hover:bg-[#002c3a]/75 cursor-pointer sm:w-full"
              type="submit"
              value="Enviar Mensagem"
            />
          </form>
        </section>
        <section className="w-full py-14">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.815152348207!2d-42.5720279!3d-19.506587000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa555150bc70dbb%3A0x5fbfccb84e191ccf!2sAv.%20Castelo%20Branco%2C%20632%20-%20Horto%2C%20Ipatinga%20-%20MG%2C%2035160-294!5e0!3m2!1spt-BR!2sbr!4v1724177769015!5m2!1spt-BR!2sbr"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[400px]"
          ></iframe>
        </section>
      </div>
      <Footer />
    </main>
  );
}
