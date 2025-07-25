"use client";

import { useEffect, useState } from "react";
import NewEmployeeForm from "../form/NewEmployeeForm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersDataProps } from "@/types/types";
import { KeyRound, Loader2, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { FetchAPI, formatedFormUserData } from "@/lib/utils";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditEmployeeButton } from "../edit-employee-button";

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

// Table columns configuration - moved outside component to prevent recreation on renders
const TABLE_HEAD_CONTENT = [
  { title: "Cpf", key: "cpf" },
  { title: "Nome", key: "name" },
  { title: "Tipo de Usuário", key: "role" },
  { title: "Assinatura", key: "signature" },
  { title: "Matrícula", key: "inscription" },
  { title: "E-mail", key: "email" },
  { title: "Ações", key: "actions" },
];

export const ManageEmployee = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listEmployees, setListEmployees] = useState<UsersDataProps[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user");
        const employees: UsersDataProps[] = await response.json();
        setListEmployees(employees);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

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

  useEffect(() => {
    if (isDialogOpen) {
      form.reset({
        cpf: "",
        name: "",
        inscription: "",
        email: "",
        position: "",
      });
    }
  }, [isDialogOpen, form]);

  const onSubmitForm = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

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

    if (!callAPIRequest.ok) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsDialogOpen(false);
    location.reload();
  };

  const handleDeleteEmployee = async (id: string) => {
    setIsLoading(true);

    const response = await fetch(`/api/user/${id}`);
    const data = await response.json();

    if (data.role === "admin") {
      const confirmDelete = window.confirm(
        "Esse usuário é um administrador, tem certeza que deseja prosseguir?"
      );

      if (!confirmDelete) {
        toast.info("Usuário mantido.");
        return;
      }
    }

    const deleteResponse = await FetchAPI({
      path: `/api/user/${id}`,
      method: "DELETE",
    });

    if (deleteResponse.ok) {
      setListEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }

    location.reload();
  };

  const resetPassword = async (id: string) => {
    const data = {
      id,
      isReset: true,
      password: "coopervaco2025",
    };

    const callAPIRequest = await FetchAPI({
      path: `/api/user`,
      method: "PUT",
      data,
    });

    if (!callAPIRequest.ok) {
      setIsLoading(false);
    }
  };

  // Status display helpers
  const getRoleDisplay = (role: string | null) => ({
    label: role === "user" ? "COMUM" : "ADMINISTRADOR",
    className: `text-center rounded-xl ${
      role === "user"
        ? "bg-blue-200 m-auto w-fit py-1 px-2 text-blue-700"
        : "bg-yellow-200 m-auto w-fit py-1 px-2 text-yellow-700"
    }`,
  });

  const getSignatureDisplay = (signature: string | null) => ({
    label: signature ? "Criada" : "Pendente",
    className: `text-center rounded-xl ${
      !signature
        ? "bg-red-200 m-auto w-fit py-1 px-2 text-red-700"
        : "bg-green-200 m-auto w-fit py-1 px-2 text-green-700"
    }`,
  });

  const getEmailDisplay = (email: string | null) => ({
    label: email ? email : "Pendente",
    className: `text-center m-auto w-fit py-1 px-2 rounded-xl ${
      !email && "bg-red-200 m-auto w-fit py-1 px-2 text-red-700"
    }`,
  });

  return (
    <section>
      <div className="flex flex-col justify-center my-4">
        <div className="flex gap-4 justify-between">
          <div>
            <h1 className="text-3xl">Lista de Cooperados:</h1>
            <p className="text-sm text-zinc-400">
              Favor se atentar quanto aos campos em branco, eles são necessários
              para o correto funcionamento do sistema.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className="flex justify-center gap-2 bg-[#5DA770] hover:bg-[#5DA770]/80 text-white hover:text-white"
              >
                Adicionar <Plus size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg px-20">
              <DialogHeader className="space-y-4">
                <NewEmployeeForm
                  onSubmitForm={onSubmitForm}
                  isLoading={isLoading}
                />
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {isLoading && listEmployees.length === 0 ? (
        <div className="w-full mt-8 flex items-center gap-2 justify-center text-zinc-400">
          <Loader2 className="animate-spin" size={20} />
        </div>
      ) : (
        <Table>
          <TableCaption>Lista ativa dos cooperados.</TableCaption>
          <TableHeader>
            <TableRow>
              {TABLE_HEAD_CONTENT.map((field) => (
                <TableHead
                  key={field.key}
                  className={`font-bold text-center ${
                    field.title === "Cpf" ? "uppercase" : ""
                  }`}
                >
                  {field.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {listEmployees
              .sort((a, b) => (a?.name || "").localeCompare(b?.name || ""))
              .map((employee) => {
                const roleDisplay = getRoleDisplay(employee.role);
                const signatureDisplay = getSignatureDisplay(
                  employee.signature
                );
                const emailDisplay = getEmailDisplay(employee.email);

                return (
                  <TableRow key={`cooperado-${employee.id}`}>
                    <TableCell className="text-center">
                      {employee.cpf}
                    </TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>
                      <p className={roleDisplay.className}>
                        {roleDisplay.label}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className={signatureDisplay.className}>
                        {signatureDisplay.label}
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      {employee.inscription}
                    </TableCell>
                    <TableCell>
                      <p className={emailDisplay.className}>
                        {emailDisplay.label}
                      </p>
                    </TableCell>
                    <TableCell className="flex justify-center gap-4">
                      {isLoading ? (
                        <>
                          <Button
                            onClick={() => handleDeleteEmployee(employee.id)}
                            type="button"
                            variant={"outline"}
                            disabled={isLoading}
                          >
                            <Loader2 className="animate-spin" size={20} />
                          </Button>
                          <Button
                            onClick={() => handleDeleteEmployee(employee.id)}
                            type="button"
                            variant={"outline"}
                            disabled={isLoading}
                          >
                            <Loader2 className="animate-spin" size={20} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <EditEmployeeButton
                            id={employee.id}
                            isLoading={isLoading}
                          />
                          <Button
                            onClick={() => handleDeleteEmployee(employee.id)}
                            type="button"
                            variant={"outline"}
                            disabled={isLoading}
                            title="Excluir Cooperado"
                          >
                            <Trash size={15} />
                          </Button>
                          <Button
                            onClick={() => resetPassword(employee.id)}
                            type="button"
                            variant={"outline"}
                            disabled={isLoading}
                            title="Resetar Senha"
                          >
                            <KeyRound size={15} />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </section>
  );
};
