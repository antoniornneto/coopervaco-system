"use client";

import { useForm, UseFormReturn } from "react-hook-form";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import LoadingButton from "../ui/loadingButton";
import InputMask from "react-input-mask";
import { FetchAPI, formatedFormUserData } from "@/lib/utils";
import { useRouter } from "next/navigation";

type OnSubmitFormProps = {
  isLoading: boolean;
  form: UseFormReturn<
    {
      name: string;
      cpf: string;
      inscription: string;
      email: string;
      position: string;
    },
    any,
    undefined
  >;
  onSubmitForm: (values: any) => void;
};

const NewEmployeeForm = ({
  onSubmitForm,
  form,
  isLoading,
}: OnSubmitFormProps) => {
  return (
    <div className="text-start space-y-4">
      <h1 className="text-lg uppercase font-bold">Adicionar Novo Cooperado:</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="w-full space-y-5"
        >
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="José Pinheiro da Silva"
                      {...field}
                      className="uppercase"
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
                  <FormLabel>Matrícula:</FormLabel>
                  <FormControl>
                    <Input max={4} placeholder="94" {...field} />
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
                  <FormLabel>E-mail:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@mail.com"
                      {...field}
                      className="lowercase"
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
                  <FormLabel>Função:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Presidente Diretor"
                      {...field}
                      className="uppercase"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            {isLoading ? (
              <LoadingButton width="w-full" />
            ) : (
              <Button
                className="w-full bg-[#5DA770] hover:bg-[#5DA770]/80"
                type="submit"
              >
                Salvar
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewEmployeeForm;
