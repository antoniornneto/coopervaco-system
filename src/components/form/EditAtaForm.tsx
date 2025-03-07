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
import { AtaDataProps } from "@/types/types";
import LoadingButton from "../ui/loadingButton";
import { useEffect, useState } from "react";
import { FetchAPI } from "@/lib/utils";

const FormSchema = z.object({
  id: z.coerce.string(),
  title: z.coerce.string().min(1, "Campo obrigatório"),
  topics: z.coerce.string().min(1, "Campo obrigatório"),
  approved_topics: z.coerce.string().min(1, "Campo obrigatório"),
});

const EditAtaForm = ({ ata }: { ata: AtaDataProps }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
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

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    const data = {
      title: values.title,
      topics: values.topics,
      approved_topics: values.approved_topics,
    };

    const callAPIRequest = await FetchAPI({
      data,
      method: "PUT",
      path: `/api/ata/${ata?.id}`,
    });

    if (!callAPIRequest.ok) {
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      router.replace("/dashboard");
    }
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Participants participantList={ata?.participants} />
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
