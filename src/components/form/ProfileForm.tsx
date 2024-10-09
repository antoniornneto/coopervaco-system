"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import LoadingButton from "../ui/loadingButton";
import { Button } from "../ui/button";
import { useState } from "react";
import { SessionUserProps, EmployeeDataProps } from "@/types/types";
import dayjs from "dayjs";

const FormSchema = z.object({
  cpf: z.string(),
  name: z.string(),
  inscription: z.string(),
  birthday: z.string(),
  position: z.string(),
  email: z.string().email(),
});

const ProfileForm = ({
  userSession,
  employeeData,
}: {
  userSession: SessionUserProps;
  employeeData: EmployeeDataProps;
}) => {
  const [action, setAction] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: employeeData?.cpf,
      name: employeeData?.name,
      inscription: employeeData?.inscription,
      position: employeeData?.position,
      email: userSession?.email,
      birthday: dayjs(employeeData?.birthday).format("DD/MM/YYYY"),
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    fetch(`/api/employee`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cpf: values.cpf,
        name: values.name,
        inscription: values.inscription,
        birthday: values.birthday,
        position: values.position,
        email: values.email,
      }),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[450px] space-y-5"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">CPF</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    defaultValue={employeeData?.cpf}
                    {...field}
                  />
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
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    defaultValue={userSession?.email}
                    {...field}
                  />
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
                    defaultValue={employeeData?.name}
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
                  <Input
                    defaultValue={employeeData?.inscription}
                    type="text"
                    {...field}
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
                <FormLabel className="font-bold">Função</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={employeeData?.position}
                    type="text"
                    {...field}
                  />
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
                <FormLabel className="font-bold">Data de Nascimento</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={dayjs(employeeData?.birthday).format(
                      "DD/MM/YYYY"
                    )}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center w-full">
          <div className="">
            {action ? (
              <LoadingButton width="w-full" />
            ) : (
              <Button
                className="bg-[#5DA770] hover:bg-[#5DA770]/80"
                type="submit"
              >
                Enviar dados
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
