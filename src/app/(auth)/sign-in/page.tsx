import Header from "@/components/ui/header";
import Image from "next/image";
import { logoCooperativaY, backgroundImage } from "@/lib/utils";
import Footer from "@/components/ui/footer";
import SignInForm from "@/components/form/SignInForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col">
      <title>Coopervaço - Login</title>
      <Header />
      <div className="flex h-screen md:flex-col sm:h-[700px]">
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
          <div className="px-4 max-w-96">
            <SignInForm />
            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold mt-10">
                É seu primeiro acesso?
              </h1>
              <div className="flex flex-col gap-4">
                <p className="text-gray-400">Então cadastre-se aqui:</p>
                <Link
                  className="border-[1px] border-[#5DA770] text-[#5DA770] h-14 rounded-lg flex items-center justify-center hover:bg-[#5DA770] hover:text-white hover:border-white transition-all ease-in-out duration-500"
                  href={"./employeeverify"}
                >
                  Cadastrar-me
                </Link>
                <p className="text-gray-400 text-sm">
                  Por motivos de segurança, precisamos verificar se você é um
                  funcionário da Coopervaço.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
