import { Button, buttonVariants } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthAcctions from "../actions/auth-actions";

export default function SignUpForm() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <CardHeader className="w-fit flex md:items-center space-y-3">
        <CardTitle className="md:text-wrap px-2 text-4xl sm:text-2xl">
          Cadastro - Sistema de Atas
        </CardTitle>
        <CardDescription className="md:text-wrap px-2">
          Preencha os campos abaixo para criar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex-1 flex flex-col items-center">
        <form
          className="space-y-6 w-full flex flex-col items-center sm:w-72"
          action={AuthAcctions.createAccount}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome e Sobrenome</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col flex-1 space-y-1.5">
                <Label htmlFor="registration">Matrícula</Label>
                <Input
                  id="text"
                  name="registration"
                  type="registration"
                  required
                />
              </div>
              <div className="flex flex-col flex-1 space-y-1.5">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="text" name="cpf" type="cpf" required />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
          <CardFooter className="flex justify-between sm:flex-col">
            <Button
              className="bg-dark_green hover:text-dark_green hover:font-bold hover:border-dark_green text-white"
              type="submit"
              variant="outline"
            >
              Criar conta
            </Button>
            <Link href="/ata" className={buttonVariants({ variant: "link" })}>
              Já tenho conta
            </Link>
          </CardFooter>
        </form>
      </CardContent>
    </div>
  );
}
