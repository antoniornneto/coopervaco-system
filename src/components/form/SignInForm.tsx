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
import { toast as toastWarning } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

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
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toastWarning({
        title: "Error",
        description: "Usuário ou senha inválidos",
        variant: "destructive",
      });
    } else {
      toast.success("Aguarde enquanto te redirecionamos...");
      setTimeout(() => {
        router.refresh();
        router.push("/dashboard");
      }, 700);
    }
  };

  return (
    <div>
      <Toaster position="top-left" richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
          <Button
            className="w-full mt-6 bg-[#5DA770] hover:bg-[#5DA770]/80"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
