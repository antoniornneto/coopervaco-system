import Header from "@/components/ui/header";
import LoginForm from "@/modules/auth/components/login-form";
import Image from "next/image";
import { logoCooperativa, backgroundImage } from "@/lib/utils";

export default function LoginPage() {
  return (
    <main className="flex flex-col h-screen">
      <title>Coopervaço - Login</title>
      <Header />
      <div className="flex flex-1 md:flex-col">
        <div className="flex-1 md:hidden">
          <Image
            className="h-full w-full"
            src={backgroundImage}
            width={0}
            height={0}
            alt="Imagem ilustrativa de pessoas trabalhando"
          />
        </div>
        <div className="flex flex-1 items-center justify-center md:flex-col space-y-4">
          <Image
            src={logoCooperativa}
            width={0}
            height={0}
            alt="logo da cooperativa"
            className="hidden md:w-72 md:block"
          />
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
