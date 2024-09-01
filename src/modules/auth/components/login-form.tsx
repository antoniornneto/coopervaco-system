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
import AuthActions from "../actions/auth-actions";

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <CardHeader className="w-fit flex md:items-center space-y-3">
        <CardTitle className="md:text-wrap px-2 text-4xl sm:text-2xl">
          Login - Sistema de Atas
        </CardTitle>
        <CardDescription className="md:text-wrap px-2">
          Faça login para continuar
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center">
        <form
          className="space-y-6 w-96 md:w-72 flex flex-col items-center"
          action={AuthActions.login}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
          <CardFooter className="flex justify-between sm:flex-col">
            <Button
              className="bg-dark_green hover:text-dark_green hover:font-bold hover:border-dark_green text-white transition duration-200 ease-out"
              type="submit"
              variant="outline"
            >
              Entrar
            </Button>
            <Link
              href="/ata/cadastro"
              className={buttonVariants({ variant: "link" })}
            >
              Criar Conta
            </Link>
          </CardFooter>
        </form>
      </CardContent>
    </div>
  );
}
