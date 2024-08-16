import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
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

export default function LoginForm() {
  return (
    <div className="w-fit">
      <CardHeader>
        <CardTitle className="text-4xl">Login - Sistema de Atas</CardTitle>
        <CardDescription>Faça login para continuar</CardDescription>
      </CardHeader>
      <form className="space-y-4" action={AuthAcctions.login}>
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex justify-between">
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
    </div>
  );
}
