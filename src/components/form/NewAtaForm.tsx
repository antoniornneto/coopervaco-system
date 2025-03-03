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
import formatToIso, { dayjs } from "@/lib/utils";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  topics: z.string().min(1),
  approved_topics: z.string().min(1),
});

const NewAtaForm = () => {
  const { ataId } = useParams();
  const router = useRouter();

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
    setTimeout(() => {
      const { title, topics, approved_topics } = values;
      const updateAta = fetch("/api/ata", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: ataId,
          title,
          topics,
          approved_topics,
        }),
      });

      updateAta.finally(async () => {
        const data = await getParticipantsData();
        const date = dayjs(data?.ata.createdAt).format("DD/MM/YYYY");
        const emails = data.ata.participants.map(
          (participant: { email: string }) => participant.email
        );

        const newEmailBody = {
          date: date,
          title: data.ata.title,
          mails: emails
        }

        // ENVIANDO NOTIFICAÇÃO VIA E-MAIL
        // fetch("/api/send", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(newEmailBody)
        // })
      });

      toast.promise(updateAta, {
        loading: "Criando ata...",
        success: (data) => {
          router.push("/dashboard");
          return "Ata criada";
        },
        error: "Desculpe, algo deu errado.",
      });
    }, 2000);
  };

  const cancel = async () => {
    await fetch(`/api/ata/${ataId}`, {
      method: "DELETE",
    });

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="w-[90%] my-10">
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
              <Button
                className="bg-[#5DA770] w-40 h-12 text-2xl rounded-3xl hover:bg-[#5DA770]/80"
                type="submit"
              >
                Salvar
              </Button>
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
    </div>
  );
};

export default NewAtaForm;
