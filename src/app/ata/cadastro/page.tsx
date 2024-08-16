import Header from "@/components/ui/header";
import SignUpForm from "@/modules/auth/components/sign-up-form";
import Image from "next/image";
import {
  logoCooperativaX,
  logoCooperativaY,
  backgroundImage,
} from "@/lib/utils";
import Footer from "@/components/ui/footer";

export default function SignUpPage() {
  return (
    <main className="flex flex-col">
      <title>Coopervaço - Login</title>
      <Header />
      <div className="flex h-screen md:flex-col sm:h-[700px]">
        <div className="flex-1 md:hidden relative">
          <Image
            className="h-full w-full"
            src={backgroundImage}
            width={0}
            height={0}
            alt="Imagem ilustrativa de pessoas trabalhando"
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
          <SignUpForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
