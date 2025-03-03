"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingButton from "../ui/loadingButton";
import { FetchAPI, formatedData } from "@/lib/utils";

interface EmployeeProps {
  cpf?: string;
  name?: string;
  inscription?: string;
  position?: string;
  email?: string;
}

const FormSchema = z
  .object({
    cpf: z
        .string()
        .min(14, "CPF inválido")
        .max(14, "CPF inválido")
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido"),
    name: z.string().min(1, "O nome é obrigatório"),
    position: z.string().min(1, "A função é obrigatória"),
    inscription: z.string().min(1, "A matrícula é obrigatória"),
    email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

const SignUpForm = () => {
  const cpfParams = useSearchParams().get("cpf") || "";
  const [action, setAction] = useState(false);
  const [employee, setEmployee] = useState<EmployeeProps | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      position: "",
      inscription: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const getEmployee = async () => {
      const res = await fetch(`/api/employee?cpf=${cpfParams}`);
      const data = await res.json();

      setEmployee(data.data);
      form.reset(data.data); // Atualiza os valores do formulário diretamente
    };

    if (cpfParams) getEmployee();
  }, [cpfParams, form]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);

    const data = await formatedData({
      cpf: employee?.cpf,
      name: values.name,
      position: values.position,
      inscription: values.inscription,
      email: values.email,
      password: values.password,
    });

    const callAPIRequest = await FetchAPI({
      path: "/api/user",
      method: "POST",
      data,
    });

    if(callAPIRequest.ok) {
      router.push(`/sign-in`)
    }
    
    if(!callAPIRequest.ok) {
      setAction(false);
    }
  };

  return (
    <div className="space-y-4 max-w-[450px]">
      <p>
        Verifique os seus dados abaixo e cadastre uma senha para criar o
        seu usuário de login na plataforma:
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5 mt-0"
        >
          {["cpf", "name", "position", "inscription", "email"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as "cpf" | "name" | "position" | "inscription" | "email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    {field.name === "name"? "Nome Completo" : field.name === "position" ? "Função" : field.name === "inscription" ? "Matrícula" : field.name === "cpf" ? "CPF" : "Email"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={
                        `${field.name === "name" || field.name === "position"
                          ? `uppercase`
                          : `lowercase`}`
                      }
                      disabled={field.name=== "cpf"? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {["password", "confirmPassword"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as "password" | "confirmPassword"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {field.name === "password" ? "Senha" : "Repita sua senha"}
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex items-center gap-4 md:flex-col">
            <div className="flex-1 md:w-full">
              {action ? (
                <LoadingButton width="w-full" />
              ) : (
                <Button
                  className="bg-[#5DA770] w-full hover:bg-[#5DA770]/80"
                  type="submit"
                >
                  Cadastrar
                </Button>
              )}
            </div>
            <Link
              href="/sign-in"
              className="flex-1 text-white flex justify-center items-center rounded-md w-full p-2 bg-[#5DA770] hover:bg-[#5DA770]/80"
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
