import { X, Loader2, Check } from "lucide-react";
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
import { useState } from "react";
import { UsersDataProps } from "@/types/types";

interface ModalProps {
  closeModal: () => void;
  id: string;
}

const FormSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido"),
  name: z.coerce.string().min(10, "Preencha com o nome completo"),
  inscription: z.coerce
    .string()
    .min(1, "Campo obrigatório")
    .max(4, "Preencha com no máximo 4 digitos"),
  email: z.coerce.string().min(1, "Campo obrigatório"),
  position: z.coerce.string(),
});

export function EditEmployeeModal({ closeModal, id }: ModalProps) {
  const [action, setAction] = useState(false);
  console.log(id);
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     cpf: employee?.cpf || "",
  //     email: employee?.email || "",
  //     inscription: employee?.inscription || "",
  //     name: employee?.name || "",
  //     position: employee?.position || "",
  //   },
  // });

  // const onSubmit = async (values: z.infer<typeof FormSchema>) => {
  //   setAction(true);

  //   // await fetch(`/api/edit-item/${employee?.id}`, {
  //   //   method: "PUT",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify({
  //   //     cpf: employee?.cpf,
  //   //     email: employee?.email,
  //   //     inscription: employee?.inscription,
  //   //     name: employee?.name,
  //   //     position: employee?.position,
  //   //   }),
  //   // });

  //   setAction(false);
  //   location.reload();
  // };

  return (
    <div className="fixed inset-0 bg-black/60 w-screen h-screen flex justify-center items-center z-10">
      <div className="bg-white w-80 rounded-lg p-5 flex flex-col">
        <button className="self-end" onClick={closeModal}>
          <X />
        </button>
        <div>{id}</div>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <h1>Adicione um novo item ao cardápio.</h1>
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Categoria</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                    <FormLabel className="font-bold">Nome</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                    <FormLabel className="font-bold">Descrição</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                    <FormLabel className="font-bold">Preço</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                    <FormLabel className="font-bold">Quantidade</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-5" type="submit">
                {action ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Check />
                )}
              </Button>
            </div>
          </form>
        </Form> */}
      </div>
    </div>
  );
}
