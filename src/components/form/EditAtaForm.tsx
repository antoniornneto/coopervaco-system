"use client";
import { Button } from "../ui/button";
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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Participants from "../ui/participants";
import { AtaDataProps, UserProp, UsersDataProps } from "@/types/types";
import LoadingButton from "../ui/loadingButton";
import React, { useEffect, useState } from "react";
import { FetchAPI } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserCheck } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

const FormSchema = z.object({
  id: z.coerce.string(),
  title: z.coerce.string().min(1, "Campo obrigatório"),
  topics: z.coerce.string().min(1, "Campo obrigatório"),
  approved_topics: z.coerce.string().min(1, "Campo obrigatório"),
});

type FormValues = z.infer<typeof FormSchema>;

const fieldConfig = [
  { name: "title", label: "Título da ata", type: "text" },
  { name: "topics", label: "Pautas", type: "textarea" },
  { name: "approved_topics", label: "Discussões aprovadas", type: "textarea" },
];

const EditAtaForm = ({ ata }: { ata: AtaDataProps }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingParticipants, setIsUpdatingParticipants] = useState(false);
  const [usersList, setUsersList] = useState<UsersDataProps[]>([]);
  const [participants, setParticipants] = useState<UserProp>(
    ata?.participants || []
  );
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsersList(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Erro ao carregar usuários. Tente novamente.");
      }
    };

    fetchUsers();
  }, []);

  const handleParticipantToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const [id, inscription, name, email] = value.split("/");

    setParticipants((prevParticipants) => {
      // Create a new array to avoid mutating state directly
      const updatedParticipants = [...prevParticipants];

      if (checked) {
        // Add user to participants if not already present
        if (!updatedParticipants.some((p) => p.id === id)) {
          updatedParticipants.push({
            id,
            name,
            inscription,
            sign: false,
            email,
          });
        }
      } else {
        // Remove user from participants
        const index = updatedParticipants.findIndex((p) => p.id === id);
        if (index !== -1) {
          updatedParticipants.splice(index, 1);
        }
      }

      return updatedParticipants;
    });
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: ata?.id || "",
      title: ata?.title || "",
      topics: ata?.topics || "",
      approved_topics: ata?.approved_topics || "",
    },
  });

  useEffect(() => {
    form.reset({
      id: ata?.id || "",
      title: ata?.title || "",
      topics: ata?.topics || "",
      approved_topics: ata?.approved_topics || "",
    });
  }, [ata, form]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    // Atualizando
    const data = {
      title: values.title,
      topics: values.topics,
      approved_topics: values.approved_topics,
      participants: participants,
    };

    const callAPIRequest = await FetchAPI({
      data,
      method: "PUT",
      path: `/api/ata/${ata?.id}`,
    });

    if (!callAPIRequest.ok) {
      setIsSubmitting(false);
    }

    router.push(`/dashboard/view-ata/${ata?.id}`);
    router.refresh();
  };

  return (
    <div className="flex flex-col w-full p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5"
        >
          <div className="space-y-10">
            {fieldConfig.map(({ name, label, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof FormValues}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-5">
                    <FormLabel className="text-4xl">{label}</FormLabel>
                    <FormControl>
                      {type === "text" ? (
                        <input
                          {...field}
                          className="bg-[#F4F4F7] rounded-xl p-4"
                          placeholder={label}
                        />
                      ) : (
                        <textarea
                          {...field}
                          rows={10}
                          className="bg-[#F4F4F7] rounded-xl p-4"
                          placeholder={label}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="flex gap-2">
              <h1 className="text-4xl">Participantes da reunião</h1>
              <Dialog>
                <DialogTrigger>
                  <Button type="button" variant={"outline"} className="">
                    <UserCheck />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="space-y-4">
                    <DialogTitle>Selecione o(s) participante(s)</DialogTitle>
                    <DialogDescription>
                      <div className="overflow-y-auto max-h-[400px]">
                        {usersList
                          .slice()
                          .sort((a, b) =>
                            (a.name || "").localeCompare(b.name || "")
                          )
                          .map((user) => {
                            const isSelected = participants.some(
                              (participant) => participant.id === user.id
                            );

                            return (
                              <div
                                key={user.id}
                                className="flex justify-between border-[1px] p-4"
                              >
                                <label
                                  htmlFor={`user-${user.id}`}
                                  className="flex gap-8 cursor-pointer"
                                >
                                  <p className="w-28 md:w-20">
                                    Mat.: {user.inscription}
                                  </p>
                                  <p className="flex-1">{user.name}</p>
                                </label>
                                <input
                                  type="checkbox"
                                  className="w-4 cursor-pointer"
                                  onChange={handleParticipantToggle}
                                  name={`user-${user.id}`}
                                  id={`user-${user.id}`}
                                  checked={isSelected}
                                  value={`${user.id}/${user.inscription}/${user.name}/${user.email}`}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild></DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Participants participants={participants} />
          </div>

          <div className="flex items-center gap-5 md:flex-col">
            <div className="flex items-center">
              {isSubmitting ? (
                <LoadingButton
                  text="text-2xl"
                  rounded="rounded-full"
                  width="w-60"
                  heigth="h-12"
                />
              ) : (
                <Button
                  className="bg-[#5DA770] w-60 h-12 text-2xl rounded-3xl hover:bg-[#5DA770]/80"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Salvar alterações
                </Button>
              )}
            </div>
            <Button
              className="bg-[#5DA770] w-40 h-12 text-2xl rounded-3xl hover:bg-[#5DA770]/80"
              type="button"
              onClick={() => router.push("/dashboard")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditAtaForm;
