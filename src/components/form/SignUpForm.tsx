"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast as toastWarning } from "@/hooks/use-toast";
import { toast } from "sonner";
import LoadingButton from "../ui/loadingButton";

interface EmployeeProps {
  cpf: string | undefined;
  name: string | undefined;
  inscription: string | undefined;
  position: string | undefined;
}

const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, "O campo de email é obrigatório")
      .email("Email inválido"),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

const SignUpForm = () => {
  const cpfParams = useSearchParams().get("cpf") as string;
  // const inscriptionParams = useSearchParams().get("inscription");
  const nameParams = useSearchParams().get("name");
  const [action, setAction] = useState(false);
  const [employee, setEmployee] = useState<EmployeeProps>({
    cpf: undefined,
    name: undefined,
    position: undefined,
    inscription: undefined,
  });
  useEffect(() => {
    const response = fetch(
      // `/api/employee?cpf=${cpfParams}`
      `/api/employee?cpf=${cpfParams}&name=${nameParams}`
      // `/api/employee?cpf=${cpfParams}&inscription=${inscriptionParams}&name=${nameParams}`
    )
      .then((res) => res.json())
      .then((data) => setEmployee(data.existingEmployee));
  },
   []
  //  [cpfParams, inscriptionParams, nameParams]
);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cpf: employee.cpf,
        name: employee.name,
        inscription: employee.inscription,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      toast.success("Usuário criado! Aguarde enquanto te redirecionamos...");
      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
    } else {
      toastWarning({
        title: "Error",
        description: "Registro de usuário falhou",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p>
          Verifique os seus dados abaixo e insira um e-mail e senha para criar o
          seu usário de login na plataforma:
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5"
        >
          <div className="space-y-2">
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <Input defaultValue={employee.cpf} />
            </FormItem>
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <Input defaultValue={employee.name} />
            </FormItem>
            <FormItem>
              <FormLabel>Função</FormLabel>
              <Input defaultValue={employee.position} />
            </FormItem>
            <FormItem>
              <FormLabel>Matrícula</FormLabel>
              <Input defaultValue={employee.inscription} />
            </FormItem>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@coopervaco.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Insira sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repita sua senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira a senha novamente"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              {action ? (
                <LoadingButton width="w-full" />
              ) : (
                <Button
                  className="w-full bg-[#5DA770] hover:bg-[#5DA770]/80"
                  type="submit"
                >
                  Cadastrar
                </Button>
              )}
            </div>
            <Link
              className="flex-1 text-white flex justify-center items-center rounded-md w-full p-2 bg-[#5DA770] hover:bg-[#5DA770]/80"
              href={"/sign-in"}
            >
              Voltar
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
