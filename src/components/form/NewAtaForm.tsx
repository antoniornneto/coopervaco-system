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
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { dayjs } from "@/lib/utils";
import { useEffect, useState } from "react";
import LoadingButton from "../ui/loadingButton";
import { AtaDataProps, UserProp, UsersDataProps } from "@/types/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UserCheck } from "lucide-react";

const FormSchema = z.object({
  id: z.coerce.string(),
  title: z.coerce.string().min(1, "Campo obrigatório"),
  topics: z.coerce.string().min(1, "Campo obrigatório"),
  approved_topics: z.coerce.string().min(1, "Campo obrigatório"),
});

const NewAtaForm = () => {
  const { ataId } = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingParticipants, setIsUpdatingParticipants] = useState(false);
  const [usersList, setUsersList] = useState<UsersDataProps[]>([]);
  const [ata, setAta] = useState<AtaDataProps>();
  const [participants, setParticipants] = useState<UserProp>([]);

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
    const fetchAtas = async () => {
      try {
        const response = await fetch(`/api/ata/${ataId}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setAta(data);
        setParticipants(data.participants);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Erro ao carregar usuários. Tente novamente.");
      }
    };

    fetchUsers();
    fetchAtas();
  }, []);

  const updateParticipants = async () => {
    setIsUpdatingParticipants(true);
  };

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

  const getParticipantsData = async () => {
    const req = await fetch(`/api/ata/${ataId}`);
    const res = await req.json();
    return res;
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: ataId as string,
      title: "",
      topics: "",
      approved_topics: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    const { title, topics, approved_topics } = values;
    const updateAta = fetch(`/api/ata/${ataId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: ataId,
        title,
        topics,
        approved_topics,
        participants,
      }),
    });

    // função de envio de email, ela é executada ao final da requisição de atualização acima
    // updateAta.finally(async () => {
    //   const data = await getParticipantsData();
    //   const date = dayjs(ata?.createdAt).format("DD/MM/YYYY");
    //   const emails = ata?.participants.map(
    //     (participant: { email: string }) => participant.email
    //   );

    //   const newEmailBody = {
    //     date: date,
    //     title: ata?.title,
    //     mails: emails,
    //   };

    //   fetch("/api/send", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(newEmailBody)
    //   })
    // });

    toast.promise(updateAta, {
      loading: "Criando ata...",
      success: () => {
        router.push("/dashboard");
        router.refresh();
        return "Ata criada";
      },
      error: "Desculpe, algo deu errado.",
    });
  };

  const cancel = async () => {
    await fetch(`/api/ata/${ataId}`, {
      method: "DELETE",
    });

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="w-[90%] mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5">
                  <FormLabel className="text-4xl">Título da ata</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      className="bg-[#F4F4F7] rounded-xl p-4 text-black"
                      placeholder="Insira o título da ata"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5">
                  <FormLabel className="text-4xl">Pautas</FormLabel>
                  <FormControl>
                    <textarea
                      rows={10}
                      className="bg-[#F4F4F7] rounded-xl p-4 text-black"
                      placeholder="Insira a(s) pauta(s)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="approved_topics"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5">
                  <FormLabel className="text-4xl">
                    Discussões aprovadas
                  </FormLabel>
                  <FormControl>
                    <textarea
                      rows={10}
                      className="bg-[#F4F4F7] rounded-xl p-4 text-black"
                      placeholder="Acrescente as discussões que foram realizadas e aprovadas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center space-x-5 mt-6">
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
                  Salvar
                </Button>
              )}
            </div>
            <Button
              className="bg-[#5DA770] w-40 h-12 text-2xl rounded-3xl hover:bg-[#5DA770]/80"
              type="button"
              onClick={cancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
      <div className="w-[90%] my-8 flex flex-col gap-4">
        <div className="flex gap-2">
          <h2 className="text-2xl">Participantes da reunião</h2>
          <Dialog>
            <DialogTrigger>
              <Button type="button" variant={"outline"} className="">
                <UserCheck />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Selecione o(s) funcionário(s)</DialogTitle>
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
                          <div key={user.id} className="flex border-[1px] p-4">
                            <label
                              htmlFor={`user-${user.id}`}
                              className="flex flex-1 gap-5 items-center cursor-pointer"
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
                <DialogClose asChild>
                  <Button
                    onClick={updateParticipants}
                    type="button"
                    disabled={isUpdatingParticipants}
                  >
                    {isUpdatingParticipants ? "Salvando..." : "Salvar"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="text-black">
          {participants.map((user) => (
            <div key={user.id} className="flex border-[1px] w-full p-4 text-xl">
              <label
                htmlFor={`${user.name}`}
                className="flex flex-1 gap-5 items-center"
              >
                <p className="w-28">Mat.: {user.inscription}</p>
                <p className="flex-1">{user.name}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewAtaForm;
