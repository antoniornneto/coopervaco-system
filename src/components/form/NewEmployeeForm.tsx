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
import { useState } from "react";
import LoadingButton from "../ui/loadingButton";
import InputMask from "react-input-mask";
import { FetchAPI, formatedFormUserData } from "@/lib/utils";

const FormSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido"),
  name: z.coerce.string().min(10, "Preencha com o nome completo"),
  inscription: z.coerce.string().min(1),
  email: z.coerce.string(),
  position: z.coerce.string(),
});

const NewEmployeeForm = () => {
  const [action, setAction] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
      name: "",
      inscription: "",
      email: "",
      position: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);
    
    const { cpf, name, inscription, email, position } = values;

    const data = await formatedFormUserData({
      name,
      cpf,
      email,
      inscription,
      position,
    });

    const callAPIRequest = await FetchAPI({
      path: "/api/employee",
      method: "POST",
      data,
    });

    if(callAPIRequest.ok) {
      location.reload()
    }
    

    if(!callAPIRequest.ok) {
      setAction(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="José Pinheiro da Silva"
                    {...field}
                    className="uppercase"
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
                <FormLabel>Matrícula:</FormLabel>
                <FormControl>
                  <Input placeholder="94" {...field} />
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
                <FormLabel>E-mail:</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@mail.com"
                    {...field}
                    className="lowercase"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Função:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Presidente Diretor"
                    {...field}
                    className="uppercase"
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
              Cadastrar funcionário
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default NewEmployeeForm;
