"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import LoadingButton from "../ui/loadingButton";
import { Button } from "../ui/button";
import { useState } from "react";
import { SessionUserProps, EmployeeDataProps } from "@/types/types";
import { toast } from "sonner";
import SignatureCanvas from "react-signature-canvas";
import Image from "next/image";
import { FetchAPI, formatedFormUserData } from "@/lib/utils";
import InputMask from "react-input-mask";

const FormSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido"),
  name: z.coerce.string(),
  inscription: z.coerce.string().min(1),
  position: z.coerce.string(),
  email: z.coerce.string().email(),
});
type employeeData = {
  id: string;
  cpf: string;
  name: string;
  inscription: string;
  position: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
} | null

const ProfileForm = ({
  userSession,
  employeeData,
}: {
  userSession: SessionUserProps;
  employeeData:employeeData;
}) => {
  const [action, setAction] = useState(false);
  const [modal, setModal] = useState(false);
  // const [file, setFile] = useState<any>();
  const [sign, setSign] = useState<SignatureCanvas | null>();
  const [url, setUrl] = useState<any>("/");

  const handleGenerateSignature = () => {
    setModal(true);
    setUrl(sign?.getTrimmedCanvas().toDataURL("image/png"));
  };

  const clearSignaturePad = () => {
    sign?.clear();
  };

  const handleModal = () => {
    sign?.clear();
    setUrl("/");
    setModal(false);
  };

  const handleSignatureUpload = async () => {
    const req = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userSession?.userId,
        signature: url,
      }),
    });
    const resJSON = await req.json().then((res) => res);

    if (!req.ok) {
      toast.error(`${resJSON.message}`);
    }

    toast.success(`${resJSON.message}`);
    setModal(false);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: employeeData?.cpf,
      name: employeeData?.name,
      inscription: employeeData?.inscription,
      position: employeeData?.position!,
      email: userSession?.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setAction(true);

    const { name, cpf, email, inscription, position } = values;

    const data = await formatedFormUserData({
      name,
      cpf,
      email,
      inscription,
      position,
    });

    const callAPIRequest = await FetchAPI({
      path: "/api/employee",
      method: "PUT",
      data,
    });

    if (!callAPIRequest.ok) {
      setAction(false);
    }
  };

  return (
    <div className="w-[450px] md:w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">CPF</FormLabel>
                  <FormControl>
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="000.000.000-00"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {(inputProps) => <Input {...inputProps} />}
                    </InputMask>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      defaultValue={userSession?.email}
                      className="lowercase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      defaultValue={employeeData?.name}
                      className="uppercase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inscription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Matrícula</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={employeeData?.inscription}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Função</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={employeeData?.position!}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Data de Nascimento
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={dayjs(employeeData?.birthday).format(
                        "DD/MM/YYYY"
                      )}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="font-bold text-sm flex flex-col gap-2">
              <p>Assinatura:</p>
              <div className="space-y-4">
                <div className="border-[1px] border-slate-200 rounded-lg">
                  <SignatureCanvas
                    ref={(data) => setSign(data)}
                    canvasProps={{
                      width: 500,
                      height: 200,
                      className: "sigCanvas md:w-full",
                    }}
                  />
                </div>
                <div className="flex gap-5">
                  <Button type="button" onClick={handleGenerateSignature}>
                    Gerar
                  </Button>
                  <Button type="button" onClick={clearSignaturePad}>
                    Limpar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {modal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="w-96 rounded-lg bg-white p-5 flex flex-col gap-10">
                <div>
                  <h3 className="font-semibold text-lg">Assinatura</h3>
                  <p className="text-sm text-[#49454F]">
                    Deseja confirmar que essa é a sua assinatura digital?
                  </p>
                </div>
                <div className="self-center">
                  {url === "/" ? null : (
                    <Image
                      src={url}
                      alt="signature"
                      width={0}
                      height={0}
                      className="w-40"
                    />
                  )}
                </div>
                <div className="flex gap-5">
                  <Button
                    className="flex-1"
                    type="button"
                    onClick={handleSignatureUpload}
                  >
                    Confirmar
                  </Button>
                  <Button
                    className="flex-1"
                    type="button"
                    onClick={handleModal}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center w-full mt-5">
            <div className="">
              {action ? (
                <LoadingButton width="w-full" />
              ) : (
                <Button
                  className="bg-[#5DA770] hover:bg-[#5DA770]/80"
                  type="submit"
                >
                  Salvar alterações
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
