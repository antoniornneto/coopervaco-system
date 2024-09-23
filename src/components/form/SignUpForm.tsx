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
import { Employee } from "@prisma/client";
import { dayjs } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface EmployeeProps {
  cpf: string | undefined;
  name: string | undefined;
  inscription: string | undefined;
  function: string | undefined;
  birthday: Date | undefined;
}

const FormSchema = z
  .object({
    cpf: z.string(),
    name: z.string(),
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
  const inscriptionParams = useSearchParams().get("inscription");
  const nameParams = useSearchParams().get("name");
  const [employee, setEmployee] = useState<EmployeeProps>({
    name: undefined,
    cpf: undefined,
    birthday: undefined,
    function: undefined,
    inscription: undefined,
  });
  useEffect(() => {
    const response = fetch(
      `/api/employee?cpf=${cpfParams}&inscription=${inscriptionParams}&name=${nameParams}`
    )
      .then((res) => res.json())
      .then((data) => setEmployee(data.existingEmployee));
  }, [cpfParams, inscriptionParams, nameParams]);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: employee.cpf,
      name: employee.name,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cpf: employee.cpf,
        name: employee.name,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/sign-in");
    } else {
      toast({
        title: "Error",
        description: "Registro de usuário falhou",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <Input defaultValue={employee.cpf} />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <Input defaultValue={employee.name} />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Matrícula</FormLabel>
            <Input defaultValue={employee.inscription} />
          </FormItem>
          <FormItem>
            <FormLabel>Função</FormLabel>
            <Input defaultValue={employee.function} />
          </FormItem>
          <FormItem>
            <FormLabel>Data de aniversário</FormLabel>
            <Input
              defaultValue={dayjs(employee.birthday).format("DD/MM/YYYY")}
            />
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
        <div className="flex gap-4">
          <Button
            className="flex-1 w-full mt-6 bg-[#5DA770] hover:bg-[#5DA770]/80"
            type="submit"
          >
            Cadastrar
          </Button>
          <Link
            className="flex-1 text-white flex justify-center items-center rounded-md w-full mt-6 bg-[#5DA770] hover:bg-[#5DA770]/80"
            href={"/sign-in"}
          >
            Voltar
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
