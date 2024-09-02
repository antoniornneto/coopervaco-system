import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import AuthService from "../services/auth-service";
import { db } from "@/lib/prisma";

const prisma = db;

async function createAccount(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const registration = formData.get("registration") as string;
  const cpf = formData.get("cpf") as string;

  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      admin: false,
      cpf,
      registration,
    },
  });

  redirect("/ata");
}

async function login(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    console.log("Error");
    redirect("/ata");
  }

  const isMatch = await bcrypt.compare(password, user?.password);

  if (!isMatch) {
    console.log("Usuário ou senha inválidos");
  }

  await AuthService.createSessionToken({
    sub: user.id,
    name: user.name,
    email: user.email,
  });

  redirect("/coopervaco-system");
}

const AuthActions = {
  createAccount,
  login,
};

export default AuthActions;
