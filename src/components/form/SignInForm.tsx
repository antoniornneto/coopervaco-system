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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import LoadingButton from "../ui/loadingButton";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Preencha o campo antes de continuar")
    .email("Email inválido"),
  password: z
    .string()
    .min(1, "Preencha o campo antes de continuar")
    .min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

const SignInForm = () => {
  const [action, setAction] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);
    setTimeout(() => {
      const signInData = signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      toast.promise(signInData, {
        loading: "Checando credenciais...",
        success: (data) => {
          router.push("/dashboard");
          return `Login realizado`;
        },
        error: `${signInData.then((error) => error)}`,
      });
    }, 2000);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="joao@coopervaco.com" {...field} />
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
                  <FormLabel className="font-bold">Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Insira a senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            {action ? (
              <LoadingButton width="w-full" />
            ) : (
              <Button
                className="w-full bg-[#5DA770] hover:bg-[#5DA770]/80"
                type="submit"
              >
                Entrar
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
