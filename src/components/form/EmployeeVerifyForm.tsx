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
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido"),
});

const EmployeeVerify = () => {
  const [action, setAction] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);
    const { cpf } = values;

    const callAPIRequest = await FetchAPI({
      method: "GET",
      path: `/api/employee?cpf=${cpf}`
    });

    if(callAPIRequest.ok) {
      router.push(`/sign-up?cpf=${cpf}`)
    }
    
    if(!callAPIRequest.ok) {
      setAction(false);
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
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="000.000.000-00"
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
            {/* <FormField
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
            /> */}
            {/* <FormField
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
            /> */}
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
