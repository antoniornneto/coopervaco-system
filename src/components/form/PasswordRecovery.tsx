"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import LoadingButton from "../ui/loadingButton";
import InputMask from "react-input-mask";
import { FetchAPI } from "@/lib/utils";

const FormSchema = z.object({
  cpf: z.coerce
    .string()
    .min(14, "CPF inválido")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido"),
  email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
});

const PasswordRecovery = () => {
  const [action, setAction] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);
    const { cpf, email } = values;

    const callAPIRequest = await FetchAPI({
      method: "GET",
      path: `/api/employee?cpf=${cpf}`,
    });

    if (callAPIRequest.ok) {
      router.push(`/sign-up?cpf=${cpf}`);
    }

    if (!callAPIRequest.ok) {
      setAction(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p>Para verificarmos sua identidade, confirme alguns dados pessoais:</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="CPF"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {(inputProps) => <Input {...inputProps} />}
                    </InputMask>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="E-MAIL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 md:flex-col">
            <div className="flex-1">
              {action ? (
                <LoadingButton width="w-full" />
              ) : (
                <Button
                  className="w-full bg-[#5DA770] hover:bg-[#5DA770]/80"
                  type="submit"
                >
                  Verificar
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

export default PasswordRecovery;
