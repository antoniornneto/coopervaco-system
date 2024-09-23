import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { User } from "@prisma/client";
import * as z from "zod";

// Schema de validação
const userSchema = z.object({
  name: z.string(),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatório")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  cpf: z.string(),
});

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const cpf = params.get("cpf") as string;

  const existingUser = await db.user.findUnique({
    where: {
      cpf,
    },
  });

  const cpfVazio = existingUser?.cpf === null ? true : false;

  if (!cpfVazio) {
    return NextResponse.json(
      { message: "Usuário já possui um cadastro" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: existingUser }, { status: 201 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cpf, name, email, password } = userSchema.parse(body);
    const hashPassword = await hash(password, 10);

    const newUser = await db.employee.update({
      where: {
        cpf,
      },
      data: {
        user: {
          update: {
            name,
            email,
            role: "user",
            password: hashPassword,
          },
        },
      },
    });

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    const { password: newUserPassword, ...userWithOutPassword } = user as User;

    return NextResponse.json(
      {
        user: userWithOutPassword,
        message: "Conta de usuário criada com sucesso",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Algo deu errado",
        error,
      },
      { status: 500 }
    );
  }
}
