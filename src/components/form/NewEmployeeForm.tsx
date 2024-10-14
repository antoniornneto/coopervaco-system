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
import { toast } from "sonner";
import { useState } from "react";
import LoadingButton from "../ui/loadingButton";

const FormSchema = z.object({
  cpf: z.string().min(11, "Preencha o campo corretamente"),
  name: z.string().min(10, "Preencha com o nome completo"),
  inscription: z
    .string()
    .min(4, "Preencha com no mínimo 4 caracteres")
    .max(4, "Preencha com no máximo 4 caracteres"),
  birthday: z.string(),
  position: z.string().min(6, "Preencha o campo corretamente"),
});

const NewEmployeeForm = () => {
  const [action, setAction] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
      name: "",
      inscription: "",
      birthday: "",
      position: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);
    const createEmployee = await fetch("/api/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cpf: values.cpf,
        name: values.name,
        inscription: values.inscription,
        birhtday: values.birthday,
        position: values.position,
      }),
    });

    const responseJSON = await createEmployee.json().then((res) => res);

    if (!createEmployee.ok) {
      toastWarning({
        title: "Error",
        description: `${JSON.stringify(responseJSON.message)}`,
        variant: "destructive",
      });
    } else {
      toast.success(`${JSON.stringify(responseJSON.message)}`);
      setTimeout(() => {
        location.reload();
      }, 2000);
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
                <FormLabel>CPF:</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 99999999999" {...field} />
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
                  <Input placeholder="Ex: José Pinheiro da Silva" {...field} />
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
                  <Input placeholder="Ex: 0094" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de nascimento:</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
                  <Input placeholder="Ex: Presidente Diretor" {...field} />
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
