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
import { toast } from "sonner";
import Participants from "../ui/participants";
import { AtaDataProps } from "@/types/types";
import LoadingButton from "../ui/loadingButton";
import { useState } from "react";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  topics: z.string().min(1),
  approved_topics: z.string().min(1),
});

const EditAtaForm = ({ ata }: { ata: AtaDataProps }) => {
  const [action, setAction] = useState(false);
  const router = useRouter();
  router.refresh();
  const ataId = ata?.id as string;
  const ataTitle = ata?.title as string;
  const ataTopics = ata?.topics as string;
  const ataApprovedTopics = ata?.approved_topics as string;
  const ataParticipants = ata?.participants;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: ataId,
      title: ataTitle,
      topics: ataTopics,
      approved_topics: ataApprovedTopics,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);
    const { title, topics, approved_topics } = values;
    const reqUpdate = await fetch(`/api/ata/${ata?.id}`, {
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
      }, 700);
    }
  };

  const cancel = () => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="w-[90%] my-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5"
        >
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
                      defaultValue={ataTitle}
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
                      defaultValue={ataTopics}
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
                      defaultValue={ataApprovedTopics}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Participants participantList={ataParticipants} />
          </div>
          <div className="flex items-center gap-5 md:flex-col">
            <div className="flex items-center">
              {action ? (
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
                >
                  Salvar alterações
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
    </div>
  );
};

export default EditAtaForm;
