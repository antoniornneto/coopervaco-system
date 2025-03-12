"use client";

import { useCallback, useEffect, useState } from "react";
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
import { Loader2, Plus, Trash, UserCheck } from "lucide-react";
import participants from "../ui/participants";
import usersList from "../users-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { FetchAPI } from "@/lib/utils";
import { toast } from "sonner";

export const ManageEmployee = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listEmployees, setListEmployees] = useState<UsersDataProps[]>();
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    const response = await fetch("/api/get-all-users");
    const employee = await response.json();
    setListEmployees(employee);
  }, []);

  const HandleDeleteEmployee = async (id: string) => {
    setIsLoading(true);

    const callAPIToCheckADMUser = await FetchAPI({
      path: `/api/employee/${id}`,
      method: "GET",
    });

    if (callAPIToCheckADMUser.data.role) {
      const confirmDelete = window.prompt(
        "Esse usuário é um administrador, tem certeza que deseja prosseguir? Digite SIM ou NÃO."
      ) as string;

      if (
        confirmDelete?.toLowerCase() === "não" ||
        confirmDelete?.toLowerCase() === "nao"
      ) {
        toast.info("Usuário mantido.");
        return setIsLoading(false);
      } else {
        await FetchAPI({
          path: `/api/employee/${id}`,
          method: "DELETE",
        });
      }
    }

    await fetchEmployees();
    setIsLoading(false);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchEmployees()]);
      setIsLoading(false);
    };

    loadData();
  }, [fetchEmployees]);

  const tableHeadContent = [
    {
      title: "Cpf",
      key: "cpf",
    },
    {
      title: "Nome",
      key: "name",
    },
    {
      title: "Tipo de Usuário",
      key: "role",
    },
    {
      title: "Assinatura",
      key: "signature",
    },
    {
      title: "Matrícula",
      key: "inscription",
    },
    {
      title: "E-mail",
      key: "email",
    },
    {
      title: "Ações",
      key: "actions",
    },
  ];

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
          <Dialog>
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
                <NewEmployeeForm />
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {isLoading ? (
        <div className="w-[90%] mt-8 flex items-center gap-2 justify-center text-zinc-400">
          <Loader2 className="animate-spin" size={20} />
        </div>
      ) : (
        <Table>
          <TableCaption>Lista ativa dos cooperados.</TableCaption>
          <TableHeader>
            <TableRow>
              {tableHeadContent.map((field) => (
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
              ?.slice()
              .sort((a, b) => (a?.name || "").localeCompare(b?.name || ""))
              .map((employee) => (
                <TableRow key={`cooperado-${employee.id}`}>
                  <TableCell className="text-center">{employee.cpf}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>
                    <p
                      className={`text-center rounded-xl ${
                        employee.role === "user"
                          ? "bg-blue-200 text-blue-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {employee.role === "user" ? "COMUM" : "ADMINISTRADOR"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p
                      className={`text-center rounded-xl ${
                        !employee.signature
                          ? "bg-red-200 text-red-700"
                          : "bg-green-200 text-green-700"
                      }`}
                    >
                      {employee.signature ? "Criada" : "Pendente"}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    {employee.inscription}
                  </TableCell>
                  <TableCell>
                    <p
                      className={`text-center rounded-xl ${
                        !employee.email && "bg-red-200 text-red-700"
                      }`}
                    >
                      {employee.email ? employee.email : "Pendente"}
                    </p>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <Button
                      onClick={(e) => HandleDeleteEmployee(employee.id)}
                      type="button"
                      variant={"outline"}
                    >
                      <Trash size={15} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};
