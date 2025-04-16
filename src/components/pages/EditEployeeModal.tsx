import { X, Loader2, Save } from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; // Changed to import from your UI components
import { FetchAPI, formatedFormUserData } from "@/lib/utils";

interface ModalProps {
  closeModal: () => void;
  id: string;
}

interface UserProps {
  cpf?: string;
  name?: string;
  role?: string;
  signature?: string;
  inscription?: string;
  email?: string;
}

const FormSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido"),
  name: z.coerce.string().min(10, "Preencha com o nome completo"),
  role: z.coerce.string(),
  signature: z.coerce.string(),
  inscription: z.coerce
    .string()
    .min(1, "Campo obrigatório")
    .max(4, "Preencha com no máximo 4 digitos"),
  email: z.coerce.string().min(1, "Campo obrigatório"),
});

export function EditEmployeeModal({ closeModal, id }: ModalProps) {
  const [action, setAction] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
      name: "",
      role: "",
      signature: "",
      inscription: "",
      email: "",
    },
  });

  useEffect(() => {
    const getUser = async (id: string) => {
      const res = await fetch(`/api/user/${id}`);
      const data = await res.json();

      setAction(true);
      setUser(data);
      form.reset(data);
    };

    getUser(id);
  }, [id]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const callAPIRequest = await FetchAPI({
      path: "/api/user",
      method: "PUT",
      data: {
        id: id,
        cpf: values.cpf,
        name: values.name.toUpperCase(),
        role: values.role,
        inscription: values.inscription,
        email: values.email,
      },
    });

    if (!callAPIRequest.ok) {
      setLoading(false);
    }

    setLoading(false);
    location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/60 w-screen h-screen flex justify-center items-center z-10">
      <div className="bg-white w-80 rounded-lg p-5 flex flex-col min-w-[400px]">
        <button className="self-end" onClick={closeModal}>
          <X />
        </button>
        {!action ? (
          <div className="flex justify-center gap-2">
            Carregando <Loader2 className="animate-spin" size={20} />
          </div>
        ) : (
          <Form {...form}>
            <div className="mt-4">Altere os dados no formulário abaixo:</div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {["cpf", "name", "role", "signature", "inscription", "email"].map(
                (field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={
                      field as
                        | "cpf"
                        | "name"
                        | "role"
                        | "signature"
                        | "inscription"
                        | "email"
                    }
                    render={({ field }) =>
                      field.name === "role" ? (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-bold pt-4">
                            Tipo da Conta
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="admin">
                                Administrador
                              </SelectItem>
                              <SelectItem value="user">Comum</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      ) : (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-bold pt-4">
                            {field.name === "name"
                              ? "Nome Completo"
                              : field.name === "email"
                              ? "Email"
                              : field.name === "inscription"
                              ? "Matrícula"
                              : field.name === "cpf"
                              ? "CPF"
                              : "Assinatura"}
                          </FormLabel>
                          <FormControl>
                            {field.name === "signature" ? (
                              field.value ? (
                                <p className="bg-green-200 text-green-900 py-2 px-4 rounded-full w-fit">
                                  Criada
                                </p>
                              ) : (
                                <p className="bg-red-200 text-red-900 py-2 px-4 rounded-full w-fit">
                                  Pendente
                                </p>
                              )
                            ) : (
                              <Input
                                className={`${
                                  field.name === "email" ? "" : "uppercase"
                                }`}
                                type={field.name === "email" ? "email" : "text"}
                                {...field}
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }
                  />
                )
              )}
              <div className="mt-8">
                {loading ? (
                  <Button
                    type="submit"
                    className="bg-[#5DA770] text-white hover:text-white flex gap-2 w-full hover:bg-[#5DA770]/80"
                    variant={"outline"}
                  >
                    Carregando <Loader2 className="animate-spin" size={20} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#5DA770] text-white hover:text-white flex gap-2 w-full hover:bg-[#5DA770]/80"
                    variant={"outline"}
                  >
                    Atualizar <Save size={20} />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
