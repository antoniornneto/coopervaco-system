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

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  topics: z.string().min(1),
  approved_topics: z.string().min(1),
});

const NewAtaForm = () => {
  const { ataId } = useParams();
  const router = useRouter();

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

    router.push("/dashboard");
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
          </div>
          <div>
            <Button
              className="flex-1 mt-6 bg-[#5DA770] hover:bg-[#5DA770]/80"
              type="submit"
            >
              Criar ata
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewAtaForm;
