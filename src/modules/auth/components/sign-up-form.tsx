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
    <div>
      <CardHeader>
        <CardTitle>Coopervaço - Atas</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para criar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-3" action={AuthAcctions.createAccount}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" />
            </div>
          </div>
          <CardFooter className="flex justify-between">
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
