"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserCheck } from "lucide-react";

import { Button } from "../ui/button";
import LoadingButton from "../ui/loadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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

import { AtaDataProps, UserProp, UsersDataProps } from "@/types/types";

// Form validation schema
const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Campo obrigatório"),
  topics: z.string().min(1, "Campo obrigatório"),
  approved_topics: z.string().min(1, "Campo obrigatório"),
});

type FormValues = z.infer<typeof FormSchema>;

const NewAtaForm = () => {
  const { ataId } = useParams();
  const router = useRouter();
  
  // State management
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isUpdatingParticipants, setIsUpdatingParticipants] = useState(false);
  const [usersList, setUsersList] = useState<UsersDataProps[]>([]);
  const [ata, setAta] = useState<AtaDataProps | null>(null);
  const [participants, setParticipants] = useState<UserProp>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: ataId as string,
      title: "",
      topics: "",
      approved_topics: "",
    },
  });

  // Fetch users data
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/user", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      const data = await response.json();
      setUsersList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Erro ao carregar usuários. Tente novamente.");
    }
  }, []);

  // Fetch ATA data
  const fetchAta = useCallback(async () => {
    if (!ataId) return;
    
    try {
      const response = await fetch(`/api/ata/${ataId}`, {
        cache: "no-store",
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ata: ${response.statusText}`);
      }
      
      const data = await response.json();
      setAta(data);
      setParticipants(data.participants || []);
      
      // Pre-fill form with existing data
      form.reset({
        id: ataId as string,
        title: data.title || "",
        topics: data.topics || "",
        approved_topics: data.approved_topics || "",
      });
    } catch (error) {
      console.error("Error fetching ata:", error);
      toast.error("Erro ao carregar dados da ata. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [ataId, form]);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchUsers(), fetchAta()]);
      setIsLoading(false);
    };
    
    loadData();
  }, [fetchUsers, fetchAta]);

  // Handler for participant selection
  const handleParticipantToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const [id, inscription, name, email] = value.split("/");

    setParticipants((prevParticipants) => {
      if (checked) {
        // Add user if not already present
        if (!prevParticipants.some((p) => p.id === id)) {
          return [...prevParticipants, {
            id,
            name,
            inscription,
            sign: false,
            email,
          }];
        }
      } else {
        // Remove user from participants
        return prevParticipants.filter((p) => p.id !== id);
      }
      
      return prevParticipants;
    });
  }, []);

  // Submit form handler
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const { title, topics, approved_topics } = values;
      
      const updatePromise = fetch(`/api/ata/${ataId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: ataId,
          title: title.toUpperCase(),
          topics,
          approved_topics,
          participants,
        }),
      });

      toast.promise(updatePromise, {
        loading: "Salvando ata...",
        success: () => {
          router.push("/dashboard");
          router.refresh();
          return "Ata salva com sucesso";
        },
        error: "Desculpe, algo deu errado ao salvar a ata.",
      });

      // Uncomment this code when ready to implement email sending
      /*
      updatePromise.then(async (response) => {
        if (response.ok) {
          const date = ata?.createdAt ? dayjs(ata.createdAt).format("DD/MM/YYYY") : dayjs().format("DD/MM/YYYY");
          const emails = participants.map(participant => participant.email);

          await fetch("/api/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              date,
              title: values.title,
              mails: emails,
            })
          });
        }
      });
      */
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao salvar a ata. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel form handler
  const handleCancel = async () => {
    try {
      const deletePromise = fetch(`/api/ata/${ataId}`, {
        method: "DELETE",
      });

      toast.promise(deletePromise, {
        loading: "Cancelando...",
        success: () => {
          router.push("/dashboard");
          router.refresh();
          return "Ata cancelada";
        },
        error: "Erro ao cancelar a ata.",
      });
    } catch (error) {
      console.error("Error canceling:", error);
      toast.error("Erro ao cancelar a ata.");
    }
  };

  if (isLoading) {
    return <div className="w-[90%] mt-8 flex justify-center">Carregando...</div>;
  }

  return (
    <div className="w-[90%] mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-10">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5">
                  <FormLabel className="text-4xl">Título da ata</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      className="bg-[#F4F4F7] rounded-xl p-4 text-black w-full uppercase"
                      placeholder="Insira o título da ata"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Topics Field */}
            <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5">
                  <FormLabel className="text-4xl">Pautas</FormLabel>
                  <FormControl>
                    <textarea
                      rows={10}
                      className="bg-[#F4F4F7] rounded-xl p-4 text-black w-full"
                      placeholder="Insira a(s) pauta(s)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Approved Topics Field */}
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
                      className="bg-[#F4F4F7] rounded-xl p-4 text-black w-full"
                      placeholder="Acrescente as discussões que foram realizadas e aprovadas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Form Actions */}
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
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>

      {/* Participants Section */}
      <div className="w-full my-8 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl">Participantes da reunião</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
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
                  <Button type="button">
                    Salvar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Participants List */}
        <div className="text-black">
          {participants.length === 0 ? (
            <p className="text-gray-500 p-4 border-[1px]">Nenhum participante selecionado</p>
          ) : (
            participants.map((user) => (
              <div key={user.id} className="flex border-[1px] w-full p-4 text-xl">
                <div className="flex flex-1 gap-5 items-center">
                  <p className="w-28">Mat.: {user.inscription}</p>
                  <p className="flex-1">{user.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAtaForm;