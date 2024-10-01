import SignUpForm from "@/components/form/SignUpForm";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { backgroundImage, logoCooperativaY } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";

const page = () => {
  return (
    <main className="w-full">
      <title>Coopervaço - Cadastro de usuário</title>
      <Header />
      <div className="flex h-screen md:flex-col md:h-fit md:py-4 sm:h-[700px]">
        <div className="flex-1 md:hidden relative">
          <Image
            src={backgroundImage}
            width={0}
            height={0}
            alt="Imagem ilustrativa de pessoas trabalhando"
            className="h-full w-full"
          />
          <Image
            src={logoCooperativaY}
            width={0}
            height={0}
            alt="logo da cooperativa"
            className="w-[400px] absolute top-[35%] left-[25%] lg:w-[300px] lg:left-[20%]"
          />
        </div>
        <div className="flex flex-1 items-center justify-center md:flex-col space-y-10">
          <Image
            src={logoCooperativaY}
            width={0}
            height={0}
            alt="logo da cooperativa"
            className="hidden md:w-72 md:block"
          />
          <div className="w-96 py-4">
            <Suspense>
              <SignUpForm />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default page;
