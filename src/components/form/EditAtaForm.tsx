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
import { toast as toastWarning } from "@/hooks/use-toast";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { Ata } from "@prisma/client";
import { ParticipantProp } from "@/app/dashboard/create-ata/[ataId]/page";
import { UserProp } from "../users-list";
import Participants from "../ui/participants";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  topics: z.string().min(1),
  approved_topics: z.string().min(1),
});

const EditAtaForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const [ata, setAta] = useState<Ata>();

  useEffect(() => {
    const getAta = fetch(`/api/ata/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAta(data.ata);
      });
  }, []);

  const defautlValueTitle = ata?.title as string;
  const defautlValueTopics = ata?.topics as string;
  const defautlValueApprovedTopics = ata?.approved_topics as string;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: id as string,
      title: ata?.title as string,
      topics: ata?.topics as string,
      approved_topics: ata?.approved_topics as string,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { title, topics, approved_topics } = values;
    const reqUpdate = await fetch(`/api/ata/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        topics,
        approved_topics,
      }),
    });

    const responseJSON = await reqUpdate.json().then((res) => res);

    if (!reqUpdate.ok) {
      toastWarning({
        title: "Error",
        description: `${JSON.stringify(responseJSON.message)}`,
        variant: "destructive",
      });
    } else {
      toast.success(`${JSON.stringify(responseJSON.message)}`);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  };

  const cancel = async () => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="w-[90%] my-10">
      <Toaster position="top-left" richColors />
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
                      className="bg-[#F4F4F7] rounded-xl p-4"
                      placeholder="Insira o título da ata"
                      defaultValue={defautlValueTitle}
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
                      className="bg-[#F4F4F7] rounded-xl p-4"
                      placeholder="Insira a(s) pauta(s)"
                      defaultValue={defautlValueTopics}
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
                      className="bg-[#F4F4F7] rounded-xl p-4"
                      placeholder="Acrescente as discussões que foram realizadas e aprovadas"
                      defaultValue={defautlValueApprovedTopics}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Participants id={id} />
          </div>
          <div className="space-x-5">
            <Button
              className="bg-[#5DA770] w-40 h-12 mt-6 text-2xl rounded-3xl hover:bg-[#5DA770]/80"
              type="submit"
            >
              Salvar
            </Button>
            <Button
              className="bg-[#5DA770] w-40 h-12 mt-6 text-2xl rounded-3xl hover:bg-[#5DA770]/80"
              type="button"
              onClick={cancel}
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
