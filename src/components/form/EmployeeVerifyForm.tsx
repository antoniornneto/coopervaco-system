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
import InputMask from "react-input-mask";

const FormSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido"),
  name: z.string().toUpperCase(),
  // inscription: z.coerce.number()
});

function getNumberWithLeadingZero(number: number) {
  let numberToString = number.toString();
  if (numberToString <= "9999") {
    numberToString = ("0000" + numberToString).slice(-4);
  }
  return numberToString;
}

const EmployeeVerify = () => {
  const [action, setAction] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
      name: "",
      // inscription: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);
    const { 
      // inscription, 
      name 
    } = values;
    const cpfSemFormatacao = values.cpf.replace(/\D/g, "");
    // const inscriptionFormated = getNumberWithLeadingZero(inscription)

    const getEmployee = await fetch(
      `/api/employee?cpf=${cpfSemFormatacao}&name=${name}`
    );

    if (getEmployee.ok) {
      const getUser = await fetch(`/api/user?cpf=${cpfSemFormatacao}`);
      if (getUser.ok) {
        setAction(false)
        toast.success(
          "Funcionário encontrado. Aguarde enquanto te redirecionamos..."
        );
        setTimeout(() => {
          router.push(
            `/sign-up?cpf=${cpfSemFormatacao}&name=${name}`
          );
        }, 1000);
      } else {
        setAction(false)
        toast.error("Funcionário já possui um cadastro.")
      }
    } else {
      setAction(false)
      toast.error("Funcionário não encontrado. Verifique as informações inseridas ou entre em contato com um administrador.")
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
                    {/* <Input type="text" placeholder="99999999999" {...field}/> */}
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
                      className="uppercase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="inscription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Matrícula</FormLabel>
                  <FormControl>
                    <Input placeholder="43" type="number" {...field} />
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
