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
import { toast as toastWarning } from "@/hooks/use-toast";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import LoadingButton from "../ui/loadingButton";

const FormSchema = z.object({
  cpf: z.string(),
  name: z.string(),
  inscription: z.string(),
});

const EmployeeVerify = () => {
  const [action, setAction] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
      name: "",
      inscription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);
    const { cpf, inscription, name } = values;
    const getEmployee = await fetch(
      `/api/employee?cpf=${cpf}&inscription=${inscription}&name=${name}`
    );

    if (getEmployee.ok) {
      const getUser = await fetch(`/api/user?cpf=${cpf}`);
      if (getUser.ok) {
        toast.success(
          "Funcionário encontrado. Aguarde enquanto te redirecionamos..."
        );
        setTimeout(() => {
          router.push(
            `/sign-up?cpf=${cpf}&inscription=${inscription}&name=${name}`
          );
        }, 1000);
      } else {
        toastWarning({
          title: "ATENÇÃO",
          description: "Funcionário já possui um cadastro",
          style: { backgroundColor: "#f5dd42" },
        });
      }
    } else {
      toastWarning({
        title: "ERRO",
        description: "Funcionário não encontrado",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p>
          Preencha os campos abaixo para verificarmos se você faz parte da
          cooperativa Coopervaço.
        </p>
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
                  <FormLabel className="font-bold">CPF</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="99999999999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="João Silveira Campos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inscription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Matrícula</FormLabel>
                  <FormControl>
                    <Input placeholder="0043" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              {action ? (
                <LoadingButton width="w-full" />
              ) : (
                <Button
                  className="w-full bg-[#5DA770] hover:bg-[#5DA770]/80"
                  type="submit"
                >
                  Enviar dados
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

export default EmployeeVerify;
